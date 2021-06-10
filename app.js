const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/acme', {useNewUrlParser:true, useUnifiedTopology: true});

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));

const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String,
    description: String
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// app.get('/', (req, res) => {
//     res.render('home', {msg: 'Handlebars are Cool!'});
// })

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})


// let reviews = [
//     { title: "Great Review", movieTitle: "Batman II"},
//     { title: "Awesome Movie", movieTitle: "Dragon Ball SUpper"}
// ]

//Index
app.get('/', (req, res) => {
    Review.find()
    .then(reviews => {
        res.render('reviews-index', { reviews: reviews});
        // console.log('kalo ada data, bakal ditampilin');
    })
    .catch(err => {
        console.log(err);
    })
})

app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
})

//CREATE
// app.post('/reviews', (req, res) => {
//     console.log(req.body);

// })

// CREATE to databases
app.post('/reviews', (req, res) => {
    Review.create(req.body)
        .then((review) => {
            console.log(review);
        })
        .catch((err) => {
            console.log(err.message);
        })
})
