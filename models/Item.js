const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    imgPath: {
        type: String
    },
    price: {
        type: Number
    }
});

module.exports = Item = mongoose.model('Item', ItemSchema);