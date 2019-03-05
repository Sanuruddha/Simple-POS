const request = require('supertest');
const app = require('../server');

//
//
// USER API
//
//
//


describe('GET /api/users', function() {
    let token = null;
    before(function(done) {
        request(app)
            .post('/api/users/authenticate')
            .send({ username: 'sanu', password: '123' })
            .end(function(err, res) {
                token = res.body.token;
                done();
            });
    });
    it('respond with json containing a list of all users', function(done) {
        request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /api/users/register', function() {
    it('respond with json containing the newly created user', function(done) {
        request(app)
            .post('/api/users/register')
            .set('Accept', 'application/json')
            .send({ username: 'test' + Math.floor((Math.random() * 1000) + 1), password: '123' })
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /api/users/:id', function() {
    let token = null;
    before(function(done) {
        request(app)
            .post('/api/users/authenticate')
            .send({ username: 'sanu', password: '123' })
            .end(function(err, res) {
                token = res.body.token;
                done();
            });
    });

    it('respond with json containing the user to which the current auth token belongs', function(done) {
        request(app)
            .get(`/api/users/current`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

// describe('DELETE /api/users/:id', function() {
//     let token = null;
//     let id = null;
//     before(function(done) {
//         request(app)
//             .post('/api/users/authenticate')
//             .send({ username: 'sanu', password: '123' })
//             .end(function(err, res) {
//                 token = res.body.token;
//                 request(app)
//                     .get('/api/users')
//                     .set('Authorization', token)
//                     .end(function(err, res) {
//                         id = res.body[0]._id;
//                         done();
//                     });
//             });
//     });
//
//     it('respond with json success message when the user deletion is successful', function(done) {
//         request(app)
//             .delete(`/api/users/${id}`)
//             .set('Accept', 'application/json')
//             .set('Authorization', token)
//             .expect('Content-Type', /json/)
//             .expect(200, done);
//     });
// });


//
//
// ITEM API
//
//
//

describe('GET /api/items', function() {
    let token = null;
    before(function(done) {
        request(app)
            .post('/api/users/authenticate')
            .send({ username: 'sanu', password: '123' })
            .end(function(err, res) {
                token = res.body.token;
                done();
            });
    });
    it('respond with json containing a list of all items', function(done) {
        request(app)
            .get('/api/items')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /api/items', function() {
    let token = null;
    before(function(done) {
        request(app)
            .post('/api/users/authenticate')
            .send({ username: 'sanu', password: '123' })
            .end(function(err, res) {
                token = res.body.token;
                done();
            });
    });
    it('respond with json containing a list of all items', function(done) {
        request(app)
            .post('/api/items')
            .send({
                name: 'item' + Math.floor((Math.random() * 1000) + 1),
                description: 'test description',
                price: Math.random() * 1000}
                )
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});