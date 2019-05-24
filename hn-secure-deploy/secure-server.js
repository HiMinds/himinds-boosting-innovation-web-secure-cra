// Dependencies
const fs = require('fs');
const https = require('https');
const http = require('http');
const express = require('express');

// Certificate
/*
const privateKey = fs.readFileSync('./keys/privkey1.pem', 'utf8');
const certificate = fs.readFileSync('./keys/cert1.pem', 'utf8');

const options = {
	key: privateKey,
	cert: certificate,
//	ca: ca
};
*/

const app = express();
app.use(express.static(process.env.SERVE_DIRECTORY || '../hn-app/build'));
app.get('/', function(req, res) {
  return res.end('<p>This server serves up static files.</p>');
});

//const httpsServer = https.createServer(options, app);
const httpServer = http.createServer(app);

//httpsServer.listen(process.env.SERVER_PORT || 5000);
httpServer.listen(process.env.SERVER_PORT || 5000);
