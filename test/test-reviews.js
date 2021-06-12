const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, Review} = require('../app');
const should = chai.should();

const sampleReview = {
    "title": "Super Sweet Review",
    "movie-title": "La La Land",
    "description": "A great review of a lovely movie."
}

chai.use(chaiHttp);

describe('Reviews', () => {

    after(() => {
        Review.deleteMany({title: 'Super Sweet Review'}).exec((err, reviews) => {
            console.log(reviews)
            reviews.remove();
        })
    });
    // TEST INDEX
    it('should index ALL reviews on / GET', (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
    });
    // TEST NEW
    it('should display new form on /reviews/new GET', (done) => {
        chai.request(app)
        .get('/reviews/new')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html
            done();
        });
    });
    
    // TEST CREATE
    //TEST SHOW
    it('should display new form on /reviews/<id> GET', (done) => {
        let review = new Review(sampleReview);
        review.save((err, data) => {
        chai.request(app)
        .get(`/reviews/${data._id}`)
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.html
            done();
        });
    })
    });
    // TEST TAMPILAN EDIT
    it('should edit a SINGLE review on /reviews/<id>/edit GET', (done) => {
        let review = new Review(sampleReview);
        review.save((err, data) => {
            chai.request(app)
            .get(`/reviews/${data._id}/edit`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });
    });
    // TEST UPDATE
    it('should update a SINGLE review on /reviews/<id> PUT', (done) => {
        let review = new Review(sampleReview);
        review.save((err, data) => {
            chai.request(app)
            .put(`/reviews/${data._id}?_method=PUT`)
            .send({'title': 'Updating the title'})
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });
    });
    // TEST DELETE
    it('should delete a SINGLE review on /reviews/<id> DELETE', (done) => {
        let review = new Review(sampleReview);
        review.save((err, data) => {
            chai.request(app)
            .delete(`/reviews/${data._id}?_method=DELETE`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });
    });
});