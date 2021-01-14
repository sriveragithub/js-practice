const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const ejs = require('ejs');

const app = express(); // create express app
app.set('view engine', 'ejs');  // use ejs for view engine -- seems pug is popular too


app.get('/', (req, res) => {
    let x = 15;
    res.render('homepage', { data : x });
})


app.get('/about', (req, res) => {
    res.render('about');
})


app.get('/my-biking', (req, res) => {
    res.render('biking');
})

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
})


// catch 404 error
