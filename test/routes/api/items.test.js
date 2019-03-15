const request = require('supertest');
const app = require('../../../server');
const mongoUnit = require('mongo-unit');
const process = require('process');
const testMongoUrl = process.env.MONGO_URI;

describe('/items', function() {
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
                        .get('/api/items')
                        .set('Authorization', token)
                        .end(function(err, res){
                            id = res.body[0]._id;
                            done();
                        });
                });
        });
    });
    afterEach(function(done) {
        mongoUnit.drop().then(result => done());
    });

    it('GET /api/items respond with json containing a list of all items', function(done) {
        request(app)
            .get('/api/items')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                if (!Array.isArray(res.body)) throw new Error('Expected array missing');
            })
            .end(done);
    });

    it('POST /api/items respond with json containing the newly created item', function(done) {
        request(app)
            .post('/api/items')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send({ name: 'test', description: 'testDesc', price: 0 })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                if (res.body.name !== 'test') throw new Error('Incorrect item name returned');
                if (res.body.description !== 'testDesc') throw new Error('Incorrect item description returned');
                if (res.body.price !== 0) throw new Error('Incorrect item price returned');
            })
            .end(done);
    });

    it('GET /api/items/:id respond with json containing item specified by the id', function(done) {
        request(app)
            .get(`/api/items/${id}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                if (!res.body._id) throw new Error('Specified item  not returned');
            })
            .end(done);
    });

    it('GET /api/items/:id respond with json containing an error if the specified id is not found', function(done) {
        this.temp = id;
        request(app)
            .get(`/api/items/${this.temp.slice(0, -3) + 'fff'}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
                if (!res.body.errors) throw new Error('No error messages');
                if (!res.body.errors.includes('Item does not exist')) throw new Error('Missing correct error message');
            })
            .end(done);
    });

    it('DELETE /api/items/:id respond with json containing an error when given an wrong id', function(done) {
        this.temp = id;
        request(app)
            .delete(`/api/items/${this.temp.slice(0, -3) + 'fff'}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
                if (!res.body.errors) throw new Error('No error messages');
                if (!res.body.errors.includes('Item does not exist')) throw new Error('Missing correct error message');
            })
            .end(done);
    });

    it('DELETE /api/items/:id respond with json containing an error when given an invalid object id', function(done) {
        this.temp= id;
        request(app)
            .delete(`/api/items/${this.temp.replace(/.$/,"#")}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(500)
            .expect((res) => {
                if (!res.body.errors) throw new Error('No error messages');
                if (!res.body.errors.includes('Internal server error')) throw new Error('Missing correct error message');
            })
            .end(done);
    });

    it('DELETE /api/items/:id respond with json containing the item that has been successfully deleted', function(done) {
        request(app)
            .delete(`/api/items/${id}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                if (!res.body._id) throw new Error('Deleted item not returned');
            })
            .end(done);
    });

    it('PUT /api/items/:id respond with json containing the item that has been successfully updated', function(done) {
        request(app)
            .put(`/api/items/${id}`)
            .set('Accept', 'application/json')
            .send({name: 'test1', description: 'test1Desc', price: 0})
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                if (res.body._id !== id) throw new Error('Incorrect updated item id');
                if (res.body.name !== 'test1') throw new Error('Incorrect updated item name');
                if (res.body.description !== 'test1Desc') throw new Error('Incorrect updated item description');
                if (res.body.price !== 0) throw new Error('Incorrect updated item price');
            })
            .end(done);
    });

    it('PUT /api/items/:id respond with json containing an error if incorrect id is provided', function(done) {
        this.temp = id;
        request(app)
            .put(`/api/items/${this.temp.slice(0, -3) + 'fff'}`)
            .set('Accept', 'application/json')
            .send({name: 'test1', description: 'test1Desc', price: 0})
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
                if (!res.body.errors) throw new Error('No error messages');
                if (!res.body.errors.includes('Item does not exist')) throw new Error('Missing correct error message');
            })
            .end(done);
    });
});
