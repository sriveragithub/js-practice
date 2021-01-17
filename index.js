// Modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// create express app
const app = express();

// App Config variables
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Set up the database
const db = new sqlite3.Database('test.db');

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

app.get('/sqlite-test', (req, res) => {
    db.serialize(function() {
        db.all("SELECT id, name, cost FROM product", function(err, rows) {
            // Get our data
            var data = {};
            var i = 0;
            rows.forEach(function(row) {
                data[i] = { name: row.name, cost: row.cost };
                i++;
            });
            res.render('data', { data: data });
        });

    });
})

app.listen(3000, () => {
    // create_table();
    console.log(`Example app listening at http://localhost:3000`);
})

function create_table() {
    db.serialize(function() {
        db.run('CREATE TABLE product (id INT, name TEXT, cost REAL)')
        let insert = 'INSERT INTO product (id, name, cost) VALUES (?,?,?)';
        db.run(insert, [1, "Banana", 5.0]);
        db.run(insert, [2, "Kiwi", 6.5]);
        db.run(insert, [3, "Apple", 3.0]);
    })
}

// catch 404 error
