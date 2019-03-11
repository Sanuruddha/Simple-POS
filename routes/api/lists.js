const express = require('express');
const router = express.Router();
const passport = require('passport');
const List = require('../../models/List');
const mongoose = require('mongoose');


//desc Get All Lists of User

router.get('/:id',
    passport.authenticate('jwt',
        {session: false}),
    (req, res) => {
    console.log('authenticated');
    List.find({user: req.params.id}).then(
        lists => {
            res.json(lists)
        }
    ).catch(err => console.log(err));
});

//desc Get All Lists of all users

router.get('/all',
    passport.authenticate('jwt',
        {session: false}),
    (req, res) => {
        List.find().then(
            lists => {
                res.json(lists)
            }
        );
    });

//desc Get list by list id

router.get('/:id',
    passport.authenticate('jwt',
        {session: false}),
    (req, res) => {
    List.findById(req.params.id).populate('Item')
        .then(list => {
            res.json(list)
        });
});

//desc Create list for user

router.post('/',
    passport.authenticate('jwt',
    {session: false}),
    (req, res) => {
    const list = {};
    if (req.body.name) list.name = req.body.name;
    if (req.body.status) list.status = req.body.status;
    list.user = req.user.id;
    if (req.body.items) list.items = req.body.items;
    const newList = new List(list);
    newList.save()
        .then(
            list => {
                res.json(list);
            }
        );
});

//desc Delete list by id

router.delete('/:id',
    passport.authenticate('jwt',
    {session: false}),
    (req, res) => {
    List.findOneAndDelete({_id: req.params.id, user: req.user.id}, (err, list) => {
        if (err) {
            res.json({error: err});
        } else {
            res.json(list);
        }
    });
});


//desc Add item to list

router.put('/:id/:itemId',
    passport.authenticate('jwt',
        {session: false}),
    (req, res) => {
        List.findOne({ _id: req.params.id, user: req.user.id}).then(
            list => {
                if (!list) {
                    res.status(404).json({error: "List not found"});
                } else {
                    const index = list.items.map(item=> item.id.toString()).indexOf(req.params.itemId);
                    if (index > -1) {
                        list.items[index].count ++;
                        list.save().then(
                            list => {
                                res.json(list.items);
                            }
                        ).catch(err=>console.log(err));
                    } else {
                        const item = {
                            id: req.params.itemId,
                            count: 1
                        };
                        list.items.push(item);
                        list.save().then(
                            list => {
                                res.json(list.items);
                            }
                        ).catch(err=>console.log(err));
                    }
                }
            }
        ).catch(err => console.log(err));
    });


//desc Delete item from list

router.delete('/:id/:itemId',
    passport.authenticate('jwt',
        {session: false}),
    (req, res) => {
        List.findById(req.params.id).then(
            list => {
                if (!list) {
                    res.status(404).json({error: 'List not found'});
                } else {
                    const index = list.items.map(item => item.id.toString()).indexOf(req.params.itemId);
                    if (index > -1) {
                        list.items[index].count --;
                        if ( list.items[index].count === 0)
                            list.items.splice(index, 1);
                        res.json(list.items);
                    } else {
                        res.status(404).json({error: 'Item not in list'});
                    }
                    list.save();
                }
            }
        ).catch(err => console.log(err));

    });

//desc update list

router.put('/',
    passport.authenticate('jwt',
        {session: false}),
    (req, res) => {
    List.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, list) => {
        // Handle any possible database errors
        if (err) return res.status(500).send(err);
        return res.json(list);
    }).then().catch(err => res.status(404).json({success: false}));
});

module.exports = router;
