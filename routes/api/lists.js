const express = require('express');
const router = express.Router();
const passport = require('passport');
const List = require('../../models/List');
const Item = require('../../models/Item');


//desc Get All Lists of User

router.get('/user/:id',
    passport.authenticate('jwt', {session: false}), (req, res) => {
    List.find({user: req.params.id}, (err, lists) => {
        if (err) return res.status(500).json({errors: ['Internal server error']});
        return res.json(lists);
    });
});

//desc Get All Lists of all users

router.get('/',
    passport.authenticate('jwt', {session: false}), (req, res) => {
    List.find((err, lists) => {
        if (err) return res.status(500).json({errors: ['Internal server error']});
        return res.json(lists);
    });
});

//desc Get list by list id

router.get('/:id',
    passport.authenticate('jwt', {session: false}), (req, res) => {
    List.findById(req.params.id, (err, list) => {
        if (err) return res.status(500).json({errors: ['Internal server error']});
        if (!list) return res.status(400).json({errors: ['List does not exist']});
        res.json(list)
    });
});

//desc Create list for user

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

//desc Delete list by id

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


//desc Add item to list

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


//desc Delete item from list

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

//desc update list

router.put('/',
    passport.authenticate('jwt', {session: false}), (req, res) => {
    List.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, list) => {
        // if (err) return res.status(500).json({errors: ['Internal server error']});
        return res.json(list);
    });
});

module.exports = router;
