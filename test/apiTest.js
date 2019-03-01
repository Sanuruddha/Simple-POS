const request = require('supertest');
const server = require('../server');

describe('GET /users', function() {
    it('respond with json containing a list of all users', function(done) {
        request(server)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});