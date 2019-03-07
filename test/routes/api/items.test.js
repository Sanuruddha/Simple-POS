const request = require('supertest');
const app = require('../../../server');

describe('/items', function() {
    describe('GET /api/items', function () {
        let token = null;
        before(function (done) {
            request(app)
                .post('/api/users/authenticate')
                .send({username: 'sanu', password: '123'})
                .end(function (err, res) {
                    token = res.body.token;
                    done();
                });
        });
        it('respond with json containing a list of all items', function (done) {
            request(app)
                .get('/api/items')
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('POST /api/items', function () {
        let token = null;
        before(function (done) {
            request(app)
                .post('/api/users/authenticate')
                .send({username: 'sanu', password: '123'})
                .end(function (err, res) {
                    token = res.body.token;
                    done();
                });
        });
        it('respond with json containing a list of all items', function (done) {
            request(app)
                .post('/api/items')
                .send({
                        name: 'item' + Math.floor((Math.random() * 1000) + 1),
                        description: 'test description',
                        price: Math.random() * 1000
                    }
                )
                .set('Accept', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
});