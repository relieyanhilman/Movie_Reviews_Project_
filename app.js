const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/acme', {useNewUrlParser:true, useUnifiedTopology: true});

const app = express();

const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String
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
    })
    .catch(err => {
        console.log(err);
    })
})