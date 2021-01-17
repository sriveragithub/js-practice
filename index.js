// Modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// create express app
const app = express();

// App Config variables
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Routing
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
