const express = require('express');
const router = express.Router();
const passport = require('passport');

const Item = require('../../models/Item');

//route GET api/items
//desc Get All items
//access Public

router.get('/',
    passport.authenticate('jwt',
        {session: false}),
    (req, res) => {
    Item.find()
        .then(items => {
            res.json(items)
        });
});

router.get('/:id',
    passport.authenticate('jwt',
        {session: false}),
    (req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            res.json(item)
        });
});

//route POST api/items
//desc Create one item
//access Public

router.post('/',
    passport.authenticate('jwt',
        {session: false}),
    (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    newItem.save()
        .then(
            item => {
                res.json(item);
            }
        );
});

router.delete('/:id',
    passport.authenticate('jwt',
        {session: false}),
    (req, res) => {
    console.log(req.params.id);
    Item.findById(req.params.id)
        .then((item) => {
                item.remove()
                    .then(() => {res.json({success: true})})
                    .catch(err => console.log(err));
            }
        )
        .catch(err => res.status(404).json({success: false}));
});

router.put('/:id',
    passport.authenticate('jwt',
    {session: false}),
    (req, res) => {
    Item.findById(req.body.id)
        .then((item) => {
            item.update({_id: item._id},
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
module.exports = router;