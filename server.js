const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const process = require('process');
const items = require('./routes/api/items');
const lists = require('./routes/api/lists');
const users = require('./routes/api/users');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const dbURI = process.env.MONGO_URI || require('./config/keys').mongoRemoteURI;

mongoose
    .connect(dbURI, { useNewUrlParser: true })
    .then(() => console.log("connected"))
    .catch(err => {
        throw err;
    });

app.use(express.static('public'));
app.use(passport.initialize());
require('./config/passport')(passport);

//routes
app.use('/api/users', users);
app.use('/api/items', items);
app.use('/api/lists', lists);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public', 'index.html')));
const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;