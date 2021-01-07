const http = require('http');
const fs = require('fs');
const url = require('url');

//create a server object;
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
}).listen(8080); //the server object listens on port 8080