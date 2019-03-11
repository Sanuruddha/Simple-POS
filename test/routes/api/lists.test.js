const process = require('process');
const request = require('supertest');
const app = require('../../../server');
const mongoUnit = require('mongo-unit');

const testMongoUrl = process.env.MONGO_URI;

describe('/lists', () => {
    let token = null;
    const testData = require('../../testData/index');
    before(function (done) {
        request(app)
            .post('/api/users/authenticate')
            .send({username: 'sanu', password: '123'})
            .end(function (err, res) {
                token = res.body.token;
                done();
        });
        mongoUnit.initDb(testMongoUrl, testData);
    });
    after(function(done) {
        mongoUnit.drop();
        done();
    });

    it('respond with json containing a list of all lists', function (done) {
        request(app)
            .get('/api/lists')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end(function (err, res) {
                done();
            });
    });
});