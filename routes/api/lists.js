const express = require('express');
const router = express.Router();
const passport = require('passport');
const List = require('../../models/List');
const Item = require('../../models/Item');


//route GET api/lists/user/:id
//desc Get all lists of one user by user id
//access Private

router.get('/user/:id',
    passport.authenticate('jwt', {session: false}), (req, res) => {
    List.find({user: req.params.id}, (err, lists) => {
        if (err) return res.status(500).json({errors: ['Internal server error']});
        return res.json(lists);
    });
});

//route GET api/lists
//desc Get all lists
//access Private

router.get('/',
    passport.authenticate('jwt', {session: false}), (req, res) => {
    List.find((err, lists) => {
        if (err) return res.status(500).json({errors: ['Internal server error']});
        return res.json(lists);
    });
});

//route GET api/lists
//desc Get list by id
//access Private

router.get('/:id',
    passport.authenticate('jwt', {session: false}), (req, res) => {
    List.findById(req.params.id, (err, list) => {
        if (err) return res.status(500).json({errors: ['Internal server error']});
        if (!list) return res.status(400).json({errors: ['List does not exist']});
        res.json(list)
    });
});

//route POST api/lists
//desc Create one list
//access Private

router.post('/',
    passport.authenticate('jwt', {session: false}), (req, res) => {
    const list = {};
    if (!req.body.name) return res.status(400).json({errors: ['List name is missing']});
    if (! (req.body.status === 0 || req.body.status === 1)) return res.status(400).json({errors: ['List status is missing']});
    if (!req.body.items) return res.status(400).json({errors: ['List items is missing']});
    list.user = req.user.id;
    list.status = req.body.status;
    list.name = req.body.name;
    list.items = req.body.items;
    const newList = new List(list);
    newList.save((err, list) => {
        if (err) return res.status(500).json({errors: ['Internal server error']});
        res.json(list);
    });
});

//route DELETE api/lists/:id
//desc Delete one list
//access Private

router.delete('/:id',
    passport.authenticate('jwt', {session: false}), (req, res) => {
    List.findOne({_id: req.params.id, user: req.user.id}, (err, list) => {
        if (err) return res.status(500).json({errors: ['Internal server error']});
        if (!list) return res.status(400).json({errors: ['List does not exist']});
        list.remove((err, list) => {
            res.json(list);
        });
    });
});


//route PUT api/lists/:id/:itemId
//desc Update list by id, add item to items list
//access Private

router.put('/:id/:itemId',
    passport.authenticate('jwt', {session: false}), (req, res) => {
    List.findOne({ _id: req.params.id, user: req.user.id}, (err, list) => {
        if (err) return res.status(500).json({errors: ['Internal server error']});
        if (!list) return res.status(400).json({errors: ['List does not exist']});
        Item.findOne({_id: req.params.itemId}, (err, item) => {
            if (err) return res.status(500).json({errors: ['Internal server error']});
            if (!item) return res.status(400).json({errors: ['Item does not exist']});
            const index = list.items.map(item=> item.id.toString()).indexOf(req.params.itemId);
            if (index > -1) {
                list.items[index].count ++;
                list.save((err, list) => {
                    if (err) return res.status(500).json({errors: ['Internal server error']});
                    return res.json(list.items);
                });
            } else {
                const item = { id: req.params.itemId, count: 1};
                list.items.push(item);
                list.save((err, list) => {
                    if (err) return res.status(500).json({errors: ['Internal server error']});
                    return res.json(list.items);
                });
            }
        });
    });
});


//route DELETE api/lists/:id/:itemId
//desc Delete one item from list
//access Private

router.delete('/:id/:itemId',
    passport.authenticate('jwt', {session: false}), (req, res) => {
    List.findById(req.params.id, (err, list) => {
        // if (err) return res.status(500).json({errors: ['Internal server error']});
        if (!list) return res.status(400).json({errors: 'List does not exist'});
        const index = list.items.map(item => item.id.toString()).indexOf(req.params.itemId);
        if (index > -1) {
            list.items[index].count --;
            if (list.items[index].count === 0) list.items.splice(index, 1);
        } else {
            return res.status(400).json({errors: 'Item not in list'});
        }
        list.save((err, list) => {
            // if (err) return res.status(500).json({errors: ['Internal server error']});
            return res.json(list.items);
        });
    });
});

//route PUT api/lists
//desc Update one list by id
//access Private

router.put('/',
    passport.authenticate('jwt', {session: false}), (req, res) => {
    List.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, list) => {
        // if (err) return res.status(500).json({errors: ['Internal server error']});
        return res.json(list);
    });
});

module.exports = router;
