const express = require('express');
const ejs = require('ejs');
const { Pool, Client } = require('pg')

const connectionString = 'postgresql://postgres:postgres@127.0.0.1:5432/nodedb'
const pool = new Pool({
  connectionString,
})

pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
})


const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let x = 15;
    let firstName = "Skyler";
    res.render('homepage', { 
        data : x,
        name : firstName });
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/my-biking', (req, res) => {
    res.render('my-biking');
})

app.listen(3000, () => {
    console.log('Example app listening at http://localhost:3000');
})











/*create a server object;
http.createServer(function (req, res) { //req = request, res = response

    let path = url.parse(req.url).pathname;
        
        switch (path) {
            case '/':
                fs.readFile('homepage.html', function(err, data) {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data);
                    return res.end(); //end the response
                });
                break;
            case '/about':
                fs.readFile('about.html', function(err, data) {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data);
                    return res.end(); //end the response
                });
                break;
            default:
                res.writeHead(404);
                res.write('Route not found');
                res.end();
        }
}).listen(8080); */ //the server object listens on port 8080