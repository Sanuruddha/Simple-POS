const prepare = require('mocha-prepare');
const mongoUnit = require('mongo-unit');
const process = require('process');

prepare(done => mongoUnit.start()
    .then(testMongoUrl => {
        process.env.MONGO_URI = testMongoUrl;
        done();
    }).catch(err => console.log('helper', err)));

// prepare(async done => {
//     const mongod = new MongoMemoryServer();
//     process.env.MONGO_URI = await mongod.getConnectionString();
//     console.log(process.env.MONGO_URI);
//     done();
// });