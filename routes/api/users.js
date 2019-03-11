const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

router.post('/', (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) res.status(500).json({
            errors: ['Internal server error']}
        );
        if (user)
            return res.status(400).json({
                errors: ['Username already exists']
            });
        const newUserObj = {};
        if (req.body.username) newUserObj.username = req.body.username;
        if (req.body.password) newUserObj.password = req.body.password;
        const newUser = new User(newUserObj);
        bcryptjs.genSalt(10, (err, salt) => {
            if (err) res.status(500).json({errors: ['Internal server error']});
            bcryptjs.hash(newUser.password , salt, (err, hash) => {
                if (err) res.status(500).json({errors: ['Internal server error']});
                newUser.password = hash;
                newUser.save((err, newUser) => {
                    if (err)
                        res.status(500).json({
                            errors: ['Internal server error']}
                            );
                    res.json(newUser);
                });
            });
        });

    });
});

router.get('/',
    passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find((err, users) => {
        if (err) res.status(500).json({errors: ['Internal server error']});
        res.json(users);
    });
});

router.delete('/:id',
    passport.authenticate('jwt',
    {session: false}), (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) res.status(500).json({errors: ['Internal server error']});
        if (!user) res.status(400).json({
            errors: ['User does not exist']
        });
        const userData = user;
        user.remove((err, res) => {
            if (err) res.status(500).json({errors: ['Internal server error']});
            if (res) res.status(200).json(userData);
        });
    });
});

router.post('/authenticate',
    (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({username: username}, (err, user) => {
        if (err) res.status(500).json({errors: ['Internal server error']});
        if (!user) res.status(400).json({errors: ['User does not exist']});
        bcryptjs.compare(password, user.password, (err, res) => {
            if (err) res.status(500).json({errors: ['Internal server error']});
            if (!res) res.status(400).json({errors: ['Incorrect password']});
            const payload = { id: user.id, username: user.username};
            jwt.sign(
                    payload,
                    keys.jwtSecret,
                    {expiresIn: 3600 * 24},
                    (err, token) => {
                        res.json({token: 'Bearer ' + token});
                    });
        });
    });
});

router.get('/current',
    passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({id: req.user.id, username: req.user.username});
});

module.exports = router;