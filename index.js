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

// Route for sqlite
app.get('/sqlite-test', (req, res) => {
    db.serialize(function() {
        db.all("SELECT id, name, cost FROM product", function(err, rows) {
            // Get our data
            var query_data = {};
            var i = 0;
            rows.forEach(function(row) {
                query_data[i] = { name: row.name, cost: row.cost };
                i++;
            });
            res.render('data', { query_data: query_data });
        });

    });
})


// Route for sqlite
app.get('/time-now', (req, res) => {
    db.serialize(function() {
        db.all("SELECT time('now')", function(err, rows) {
            let time = rows[0];
            res.render('sqlite-data', { query_data: time });
        });
    });
})


// Route for sqlite
app.get('/sqlite-big-test', (req, res) => {
    db.serialize(function() {
        db.all("SELECT id, fname, lname FROM customers", function(err, rows) {
            // Get our data
            var query_data = {};
            var i = 0;
            rows.forEach(function(row) {
                query_data[i] = { id: row.id, fname: row.fname, lname: row.lname };
                i++;
            });
            res.render('sqlite-big-data', { query_data: query_data });
        });

    });
})

app.listen(3000, () => {
    // Main functions
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

function create_big_table() {
    db.serialize(function() {
        // Create the table
        db.run('CREATE TABLE customers (id INT, fname TEXT, lname TEXT)')

        // Insert a million rows
        let insert = 'INSERT INTO customers (id, fname, lname) VALUES (?,?,?)';

        let first_names = ['Alice', 'Bob', 'Skyler', 'David', 'Billy', 'Jack', 'Steve', 'Michael', 'Lisa'];
        let last_names = ['Saget', 'Frick', 'Rivera', 'Messina', 'Goldman', 'Smith', 'Freeman', 'Lopez', 'Forrest'];
        for(let i = 0; i < 1000000; i++) {
            // Random number for the first name
            let random_number_1 = Math.floor((Math.random() * first_names.length));
            // Random number for the last name
            let random_number_2 = Math.floor((Math.random() * last_names.length));

            db.run(insert, [i, first_names[random_number_1], last_names[random_number_2]] );
        }
    })
}

// catch 404 error
