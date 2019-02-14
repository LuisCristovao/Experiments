const http = require('http');
const port=2000
function index (request, response) {
 response.writeHead(200);
 response.end('Hello, World!');
}
http.createServer(function (request, response) {

    if (request.url === '/') {
        return index(request, response);
    }
     
    if (request.url === '/foo') {
        return index(request, response);
    } 
    
    response.writeHead(404);
    response.end(http.STATUS_CODES[404]);
}).listen(port);

console.log("Listening on port: "+port);