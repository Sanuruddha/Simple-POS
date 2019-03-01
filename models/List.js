const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        require: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    items: [
        {
            id: {
                type: mongoose.Schema.ObjectId,
                ref: 'Item'
            },
            count: {
                type: Number
            }
        }
        ]
});

module.exports = List = mongoose.model('List', ListSchema);