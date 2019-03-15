const request = require('supertest');
const app = require('../../../server');
const mongoUnit = require('mongo-unit');
const process = require('process');
const testMongoUrl = process.env.MONGO_URI;

describe('/users', function() {
    let token = null;
    let id = null;
    const testData = require('../../testData/index');
    beforeEach(function (done) {
        mongoUnit.initDb(testMongoUrl, testData).then(result => {
            request(app)
                .post('/api/users/authenticate')
                .send({username: 'sanu', password: '123'})
                .end(function (err, res) {
                    token = res.body.token;
                    request(app)
                        .get('/api/users/current')
                        .set('Authorization', token)
                        .end(function(err, res){
                            id = res.body.id;
                            done();
                        });
                });
        });
    });
    afterEach(function(done) {
        mongoUnit.drop().then(result => done());
    });

    it('POST /api/users/authenticate respond with a json containing a json web token when valid credentials are submitted', function(done) {
        request(app)
            .post('/api/users/authenticate')
            .send({username: 'sanu', password: '123'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                if (!res.body.token) throw new Error('Missing token');
            })
            .end(done);
    });

    it('POST /api/users/authenticate respond with a json containing an error when user name does not exist', function(done) {
        request(app)
            .post('/api/users/authenticate')
            .send({username: 'invalid', password: '123'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
                if (!res.body.errors) throw new Error('No errors messages');
                if (!res.body.errors.includes('User does not exist')) throw new Error('Missing correct error message');
            })
            .end(done);
    });

    it('POST /api/authenticate respond with a json containing an error when invalid password', function(done) {
        request(app)
            .post('/api/users/authenticate')
            .send({username: 'sanu', password: '1234'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
                if (!res.body.errors) throw new Error('No errors messages');
                if (!res.body.errors.includes('Incorrect password')) throw new Error('Missing correct error message');
            })
            .end(done);
    });

    // it('POST /api/authenticate respond with a json containing an error when server error',function(done) {
    //     request(app)
    //         .post('/api/users/authenticate')
    //         .send({username: 'sanu', password: '123'})
    //         .set('Accept', 'application/json')
    //         .expect('Content-Type', /json/)
    //         .expect(500)
    //         .expect((res) => {
    //             console.log(res.body);
    //             if (!res.body.errors) throw new Error('No errors messages');
    //             if (!res.body.errors.includes('Internal server erro')) throw new Error('Missing correct error message');
    //         })
    //         .end(done);
    // });

    it('GET /api/users respond with json containing a list of all users', function(done) {
        request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                if (!Array.isArray(res.body)) throw new Error('Expected array missing');
            })
            .end(done);
    });

    it('GET /api/users respond with json containing a list of all users', function(done) {
        request(app)
            .delete(`/api/users/${id}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .end(function(err, res){
                request(app)
                    .get('/api/users')
                    .set('Accept', 'application/json')
                    .set('Authorization', token)
                    .expect(401)
                    .expect((res) => {
                        if (res.text !== 'Unauthorized') throw new Error('Unauthorized text missing');
                    })
                    .end(done);
            });

    }); ////

    it('GET /api/users respond with json containing an 401 Unauthorized when used an invalid jwt', function(done) {
        request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .set('Authorization', token + 'invalidString')
            .expect(401)
            .expect((res) => {
                if (res.text !== 'Unauthorized') throw new Error('Unauthorized text missing');
            })
            .end(done);
    });

    it('POST /api/users respond with json containing the newly created user', function(done) {
        request(app)
            .post('/api/users')
            .set('Accept', 'application/json')
            .send({ username: 'test', password: '123' })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                if (res.body.username !== 'test') throw new Error('Incorrect user returned');
            })
            .end(done);
    });

    it('POST /api/users respond with an error if try to create a user with a username already exist', function(done) {
        request(app)
            .post('/api/users')
            .set('Accept', 'application/json')
            .send({ username: 'sanu', password: '123' })
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
                if (!res.body.errors) throw new Error('No errors returned');
                if (!res.body.errors.includes('Username already exists')) throw new Error('Correct error message not returned');

            })
            .end(done);
    });

    it('POST /api/users respond with an error if try to create a user with username missing', function(done) {
        request(app)
            .post('/api/users')
            .set('Accept', 'application/json')
            .send({ password: '123' })
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
                if (!res.body.errors) throw new Error('No errors returned');
                if (!res.body.errors.includes('Username or password missing')) throw new Error('Correct error message not returned');

            })
            .end(done);
    });

    it('POST /api/users respond with an error if try to create a user with password missing', function(done) {
        request(app)
            .post('/api/users')
            .set('Accept', 'application/json')
            .send({ username: 'test'})
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
                if (!res.body.errors) throw new Error('No errors returned');
                if (!res.body.errors.includes('Username or password missing')) throw new Error('Correct error message not returned');

            })
            .end(done);
    });

    it('GET /api/users/current respond with json containing the user to which the current auth token belongs', function(done) {
        request(app)
            .get(`/api/users/current`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                if (!res.body.id) throw new Error('Current user not returned');
            })
            .end(done);
    });

    it('DELETE /api/users/:id respond with json containing an error when given an wrong id', function(done) {
        this.temp = id;
        request(app)
            .delete(`/api/users/${this.temp.slice(0, -3) + 'fff'}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
                if (!res.body.errors.includes('User does not exist')) throw new Error('Missing correct error message');
            })
            .end(done);
    });

    it('DELETE /api/users/:id respond with json containing an error when given an invalid object id', function(done) {
        this.temp = id;
        request(app)
            .delete(`/api/users/${this.temp.replace(/.$/, '#')}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(500)
            .expect((res) => {
                if (!res.body.errors.includes('Internal server error')) throw new Error('Missing correct error message');
            })
            .end(done);
    });

    it('DELETE /api/users/:id respond with json containing the user that has been successfully deleted', function(done) {
        request(app)
            .delete(`/api/users/${id}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                if (!res.body._id) throw new Error('Deleted user not returned');
            })
            .end(done);
    });
});
