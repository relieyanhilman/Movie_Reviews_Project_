const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
// const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/acme', {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});

const app = express();

//override with POST having ?_methodDELETE or ?_method=PUT
app.use(methodOverride('_method'));


app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true}));

const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String,
    description: String,
    Rating: Number
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
    Review.find().lean()
    .then(reviews => {
        res.render('reviews-index', { reviews: reviews});
        // console.log('kalo ada data, bakal ditampilin');
    })
    .catch(err => {
        console.log(err);
    })
})

// Menuju ke FORM
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {title: "New Review"});
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
            res.redirect(`/reviews/${review._id}`);
        })
        .catch((err) => {
            console.log(err.message);
        })
})

//SHOW dari databases berdasarkan id
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).lean()
    .then((review) => {
        res.render('reviews-show', {review: review })
    })
    .catch((err) => {
        console.log(err.message);
    })
})

// EDIT
app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', {review: review, title: "Edit Review"});
    }).lean()
})

//UPDATE
app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
        res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
        console.log(err.message)
    })
})

//DELETE
app.delete('/reviews/:id', (req, res) => {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id)
    .then(
        res.redirect('/')
    ).catch((err) => {
        console.log(err.message);
    })
})