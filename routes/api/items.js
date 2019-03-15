const express = require('express');
const router = express.Router();
const passport = require('passport');

const Item = require('../../models/Item');

//route GET api/items
//desc Get All items
//access Public

router.get('/',
    passport.authenticate('jwt', {session: false}), (req, res) => {
    Item.find((err, items) => {
        // if (err) return res.status(500).json({errors: ['Internal server error']});
        return res.json(items);
    });
});

router.get('/:id',
    passport.authenticate('jwt', {session: false}), (req, res) => {
    Item.findById(req.params.id, (err, item) => {
        // if (err) return res.status(500).json({errors: ['Internal server error']});
        if (!item) return res.status(400).json({errors: ['Item does not exist']});
        return res.json(item);
    });
});

//route POST api/items
//desc Create one item
//access Public

router.post('/',
    passport.authenticate('jwt', {session: false}), (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });
    newItem.save((err, item) => {
        // if (err) return res.status(500).json({errors: ['Internal server error']});
        res.json(item);
    });
});

router.delete('/:id',
    passport.authenticate('jwt', {session: false}), (req, res) => {
    Item.findById(req.params.id, (err, item) => {
        if (err) return res.status(500).json({errors: ['Internal server error']});
        if (!item) return res.status(400).json({errors: ['Item does not exist']});
        item.remove((err, response) => {
            // if (err) return res.status(500).json({errors: ['Internal server error']});
            return res.json(response);
        });
    });
});

router.put('/:id',
    passport.authenticate('jwt', {session: false}), (req, res) => {
    Item.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, item) => {
        // if (err) return res.status(500).json({errors: ['Internal server error']});
        if (!item) return res.status(400).json({errors: ['Item does not exist']});
        return res.json(item);
    });
});
module.exports = router;