const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

router.post('/register',
    (req, res) => {
    User.findOne({username: req.body.username})
        .then(
            user => {
                if (user) {
                    return res.status(400).json({
                        error: 'Username already exists'
                    });
                } else {
                    const user = {};
                    if (req.body.username) user.username = req.body.username;
                    if (req.body.password) user.password = req.body.password;
                    const newUser = new User(user);
                    bcryptjs.genSalt(10, (err, salt) => {
                        bcryptjs.hash(newUser.password , salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(
                                    user => {
                                        res.json(user);
                                    }
                                );
                        })
                    })
                }
            }
        )
        .catch();

});

router.get('/',
    passport.authenticate('jwt',
    {session: false}),
    (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        });
});

router.put('/:id',
    passport.authenticate('jwt',
    {session: false}),
    (req, res) => {
    User.findById(req.body.id)
        .then((user) => {
            user.update({_id: user._id},
                req.body, {upsert: false},
                function(err, raw) {
                    if (err) {
                        res.json(err);
                    }
                    res.json(raw);
                });
        })
        .catch(err => res.status(404).json({success: false}));
});

router.delete('/:id',
    passport.authenticate('jwt',
    {session: false}),
    (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            user.remove()
                    .then(() => {res.json({success: true})})
                    .catch(err => console.log(err));
            }
        )
        .catch(err => res.status(404).json({success: false}));
});

router.post('/authenticate',
    (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({username: username})
        .then(user => {
            if(!user) {
                return res.status(404).json({error: 'User not found'});
            }

            bcryptjs.compare(password, user.password)
                .then(isMatch => {
                    const payload = { id: user.id, username: user.username}
                        if (isMatch) {
                            jwt.sign(
                                payload,
                                keys.jwtSecret,
                                {expiresIn: 3600 * 24},
                                (err, token) => {
                                    res.json({token: 'Bearer ' + token});
                                });
                        } else {
                            return res.status(400).json({error: 'Incorrect password'});
                        }
                    }
                )
                .catch();
        })
        .catch();
});

router.get('/current',
    passport.authenticate('jwt',
        {session: false}),
    (req, res) => {
        res.json({
            id: req.user.id,
            username: req.user.username
        });
    });

module.exports = router;