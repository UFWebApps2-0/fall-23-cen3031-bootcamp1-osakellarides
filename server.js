var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  // if GET request is sent for /listings, display data 
   if (request.method == 'GET' && parsedUrl.pathname == '/listings') {
      response.writeHead(200);
      response.end(JSON.stringify(listingData))
   } else { // else, show error 
      response.writeHead(404);
      response.end('Bad gateway error - path');
   }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  //Check for errors
  if (err) {
    throw err; 
  }
  
   //Save the data in the listingData variable already defined
  listingData = JSON.parse(data)

  //Creates the server
  server = http.createServer(requestHandler)
  
  //Start the server
  server.listen(port, function() {
    console.log('Server listening on: http://localhost:' + port);
  })

});
