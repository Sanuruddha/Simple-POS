const request = require('supertest');
// const app = require('../../../server');
//
// describe('/users', function() {
//     describe('GET /api/users', function() {
//         let token = null;
//         before(function(done) {
//             request(app)
//                 .post('/api/users/authenticate')
//                 .send({ username: 'sanu', password: '123' })
//                 .end(function(err, res) {
//                     token = res.body.token;
//                     done();
//                 });
//         });
//         it('respond with json containing a list of all users', function(done) {
//             request(app)
//                 .get('/api/users')
//                 .set('Accept', 'application/json')
//                 .set('Authorization', token)
//                 .expect('Content-Type', /json/)
//                 .expect(200, done);
//         });
//     });
//
//     describe('POST /api/users/register', function() {
//         it('respond with json containing the newly created user', function(done) {
//             request(app)
//                 .post('/api/users/register')
//                 .set('Accept', 'application/json')
//                 .send({ username: 'test' + Math.floor((Math.random() * 1000) + 1), password: '123' })
//                 .expect('Content-Type', /json/)
//                 .expect(200, done);
//         });
//     });
//
//     describe('GET /api/users/:id', function() {
//         let token = null;
//         before(function(done) {
//             request(app)
//                 .post('/api/users/authenticate')
//                 .send({ username: 'sanu', password: '123' })
//                 .end(function(err, res) {
//                     token = res.body.token;
//                     done();
//                 });
//         });
//
//         it('respond with json containing the user to which the current auth token belongs', function(done) {
//             request(app)
//                 .get(`/api/users/current`)
//                 .set('Accept', 'application/json')
//                 .set('Authorization', token)
//                 .expect('Content-Type', /json/)
//                 .expect(200, done);
//         });
//     });
// });
