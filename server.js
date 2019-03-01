const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const items = require('./routes/api/items');
const lists = require('./routes/api/lists');
const users = require('./routes/api/users');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db)
    .then(() => console.log("connected"))
    .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(express.static('public'))

//routes
app.use('/api/users', users);
app.use('/api/items', items);
app.use('/api/lists', lists);


const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));