const request = require('supertest');
const app = require('../../../server');
const mongoUnit = require('mongo-unit');
const process = require('process');
const testMongoUrl = process.env.MONGO_URI;

describe('/lists', function() {
    let token = null;
    let id = null;
    let listId = null;
    let itemId = null;
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
                            request(app)
                                .post('/api/lists')
                                .set('Authorization', token)
                                .send({name: 'test_list', status: 0, user: id, items: []})
                                .end(function(err, res){
                                    listId = res.body._id;
                                    request(app)
                                        .get('/api/items')
                                        .set('Authorization', token)
                                        .end(function(err, res){
                                            itemId = res.body[0]._id;
                                            done();
                                        });
                                });
                        });
                });
        });
    });
    afterEach(function(done) {
        mongoUnit.drop().then(result => done());
    });

    it('GET /api/lists respond with json containing a list of all lists', function(done) {
        request(app)
            .get('/api/lists')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                if (!Array.isArray(res.body)) throw new Error('Expected array missing');
            })
            .end(done);
    });

    it('GET /api/lists/user/:id respond with json containing a list of all lists which belong to the user specified by the id', function(done) {
        request(app)
            .get(`/api/lists/user/${id}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                if (!Array.isArray(res.body)) throw new Error('Expected array missing');
            })
            .end(done);
    });

    it('GET /api/lists/:id respond with json containing a list specified by the id', function(done) {
        request(app)
            .get(`/api/lists/${listId}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                if (!res.body._id) throw new Error('Expected list not returned');
            })
            .end(done);
    });

    it('GET /api/lists/:id respond with json containing a list specified by the id', function(done) {
        this.temp = listId;
        request(app)
            .get(`/api/lists/${this.temp.slice(0, -3)}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
                if (!res.body.errors) throw new Error('No errors returned');
                if (!res.body.errors.includes('List does not exist')) throw new Error('Correct error not returned');
            })
            .end(done);
    }); ///////

    it('POST /api/lists respond with json containing the newly created list', function(done) {
        request(app)
            .post('/api/lists')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send({ name: 'test', status: 0, items: [] })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                if (res.body.name !== 'test') throw new Error('Incorrect list name returned');
                if (res.body.status !== 0) throw new Error('Incorrect list status returned');
                if (!Array.isArray(res.body.items)) throw new Error('List items does not contain an array');
            })
            .end(done);
    });

    it('POST /api/lists respond with a json containing an error when creating a list without a name', function(done) {
        request(app)
            .post('/api/lists')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send({ status: 0, items: [] })
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
                if (!res.body.errors) throw new Error('No errors returned');
                if (!res.body.errors.includes('List name is missing')) throw new Error('Correct error not returned');
            })
            .end(done);
    });
    it('POST /api/lists respond with json containing the newly created list', function(done) {
        request(app)
            .post('/api/lists')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send({ name: 'test', items: [] })
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
                if (!res.body.errors) throw new Error('No errors returned');
                if (!res.body.errors.includes('List status is missing')) throw new Error('Correct error not returned');
            })
            .end(done);
    });
    it('POST /api/lists respond with json containing the newly created list', function(done) {
        request(app)
            .post('/api/lists')
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send({ name: 'test', status: 0})
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
                if (!res.body.errors) throw new Error('No errors returned');
                if (!res.body.errors.includes('List items is missing')) throw new Error('Correct error not returned');
            })
            .end(done);
    });

    it('DELETE /api/lists/:id respond with json containing an error when given an wrong id', function(done) {
        this.temp = listId;
        request(app)
            .delete(`/api/lists/${this.temp.slice(0, -3) + 'fff'}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
                if (!res.body.errors) throw new Error('No error messages');
                if (!res.body.errors.includes('List does not exist')) throw new Error('Missing correct error message');
            })
            .end(done);
    });

    it('DELETE /api/lists/:id respond with json containing an error when given an invalid object id', function(done) {
        this.temp= listId;
        request(app)
            .delete(`/api/lists/${this.temp.replace(/.$/,"#")}`)
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

    it('DELETE /api/lists/:id respond with json containing the list that has been successfully deleted', function(done) {
        request(app)
            .delete(`/api/lists/${listId}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                if (!res.body._id) throw new Error('Deleted list not returned');
            })
            .end(done);
    });
    it('PUT /api/lists/:id/:itemId respond with an array containing the item that has been successfully inserted', function(done) {
        request(app)
            .put(`/api/lists/${listId}/${itemId}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                if (res.body.filter(item => item.id === itemId).length !== 1) throw new Error('Item not inserted correctly');
            })
            .end(done);
    });

    it('PUT /api/lists/:id/:itemId respond with an array containing the item that has been successfully inserted', function(done) {
        request(app)
            .put(`/api/lists/${listId}/${itemId}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                await request(app)
                    .put(`/api/lists/${listId}/${itemId}`)
                    .set('Accept', 'application/json')
                    .set('Authorization', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect((res) => {
                        if (res.body.filter(item => item.id === itemId)[0].count !== 2) throw new Error('Item count not incremented correctly');
                        done();
                    });
            });
    });

    it('PUT /api/lists/:id/:itemId respond with json containing an error if incorrect id is provided', function(done) {
        this.temp= listId;
        request(app)
            .put(`/api/lists/${this.temp.slice(0, -3) + 'fff'}/${itemId}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
                if (!res.body.errors) throw new Error('No error messages');
                if (!res.body.errors.includes('List does not exist')) throw new Error('Missing correct error message');
            })
            .end(done);
    });

    it('PUT /api/lists/:id/:itemId respond with json containing an error if incorrect item id is provided', function(done) {
        this.temp= itemId;
        request(app)
            .put(`/api/lists/${listId}/${this.temp.slice(0, -3) + 'fff'}`)
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

    it('DELETE /api/lists/:id/:itemId respond with an array containing the item that has been successfully removed', function(done) {
        request(app)
            .put(`/api/lists/${listId}/${itemId}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                await request(app)
                    .put(`/api/lists/${listId}/${itemId}`)
                    .set('Accept', 'application/json')
                    .set('Authorization', token)
                    .expect((res) => {
                        if (res.body.filter(item => item.id === itemId)[0].count !== 2) throw new Error('Item count not incremented correctly');
                    });
                await request(app)
                    .delete(`/api/lists/${listId}/${itemId}`)
                    .set('Accept', 'application/json')
                    .set('Authorization', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect((res) => {
                        if (res.body.filter(item => item.id === itemId)[0].count !== 1) throw new Error('Item count not decremented correctly');
                        done();
                    });
            });
    });

    it('DELETE /api/lists/:id/:itemId respond with an array containing the item that has been successfully removed', function(done) {
        request(app)
            .put(`/api/lists/${listId}/${itemId}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                await request(app)
                    .delete(`/api/lists/${listId}/${itemId}`)
                    .set('Accept', 'application/json')
                    .set('Authorization', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect((res) => {
                        if (res.body.filter(item => item.id === itemId).length !== 0) throw new Error('Item not removed correctly');
                        done();
                    });
            });
    });

    it('DELETE /api/lists/:id/:itemId respond with an array when item is not in the list', function(done) {
        this.temp = itemId;
        request(app)
            .delete(`/api/lists/${listId}/${this.temp.slice(0, -3) + 'fff'}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
                if (!res.body.errors) throw new Error('No errors returned');
                if (!res.body.errors.includes('Item not in list')) throw new Error('No errors returned');
            })
            .end(done);
    });

    it('DELETE /api/lists/:id/:itemId respond with an error when list does not exist', function(done) {
        this.temp = listId;
        request(app)
            .delete(`/api/lists/${this.temp.slice(0, -3) + 'fff'}/${itemId}`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
                if (!res.body.errors) throw new Error('No errors returned');
                if (!res.body.errors.includes('List does not exist')) throw new Error('No errors returned');
            })
            .end(done);
    });

    it('PUT /api/lists/:id respond with json object that has been successfully updated', function(done) {
        request(app)
            .put(`/api/lists`)
            .set('Accept', 'application/json')
            .set('Authorization', token)
            .send({_id: listId, name: 'updated_test', status: 1, items: []})
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                if (res.body.name !== 'updated_test') throw new Error('List name not updated correctly');
            })
            .end(done);

    });
});
