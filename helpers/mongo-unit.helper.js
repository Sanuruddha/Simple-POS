const prepare = require('mocha-prepare');
const mongoUnit = require('mongo-unit');
const process = require('process');

prepare(done => mongoUnit.start()
    .then(testMongoUrl => {
        process.env.MONGO_URI = testMongoUrl;
        done();
    }));