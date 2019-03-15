const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

router.post('/', (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
        // if (err) return res.status(500).json({errors: ['Internal server error']});
        if (user) return res.status(400).json({errors: ['Username already exists']});
        const newUserObj = {};
        if (!req.body.username || !req.body.password) return res.status(400).json({errors: ['Username or password missing']});
        newUserObj.password = req.body.password;
        newUserObj.username = req.body.username;
        const newUser = new User(newUserObj);
        bcryptjs.genSalt(10, (err, salt) => {
            // if (err) return res.status(500).json({errors: ['Internal server error']});
            bcryptjs.hash(newUser.password , salt, (err, hash) => {
                // if (err) return res.status(500).json({errors: ['Internal server error']});
                newUser.password = hash;
                newUser.save((err, newUser) => {
                    // if (err) return res.status(500).json({errors: ['Internal server error']});
                    return res.json(newUser);
                });
            });
        });

    });
});

router.get('/',
    passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find((err, users) => {
        // if (err) return res.status(500).json({errors: ['Internal server error']});
        return res.json(users);
    });
});

router.delete('/:id',
    passport.authenticate('jwt',
    {session: false}), (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).json({errors: ['Internal server error']});
        if (!user) return res.status(400).json({errors: ['User does not exist']});
        user.remove((err, deleteRes) => {
            // if (err) return res.status(500).json({errors: ['Internal server error']});
            return res.status(200).json(deleteRes);
        });
    });
});

router.post('/authenticate',
    (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({username: username}, (err, user) => {
        // if (err) return res.status(500).json({errors: ['Internal server error']});
        if (!user) return res.status(400).json({errors: ['User does not exist']});
        bcryptjs.compare(password, user.password, (err, isMatch) => {
            // if (err) return res.status(500).json({errors: ['Internal server error']});
            if (!isMatch) return res.status(400).json({errors: ['Incorrect password']});
            const payload = { id: user.id, username: user.username};
            jwt.sign(
                payload,
                keys.jwtSecret,
                {expiresIn: 3600 * 24},
                (err, token) => res.json({token: 'Bearer ' + token}));
        });
    });
});

router.get('/current',
    passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({id: req.user.id, username: req.user.username});
});

module.exports = router;