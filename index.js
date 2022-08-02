const express = require('express');
const path = require('path');
const { Socket } = require('socket.io');
require('dotenv').config();
//App express
const app = express();

//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket.js');

//path publico
const publicoPath = path.resolve( __dirname, 'public' );

app.use(express.static(publicoPath));

server.listen( process.env.PORT, (err) => {

    if (err) throw new Error(err);  //{ return console.log('Error Fatal');}

    console.log('Servidor Corriendo en puerto', process.env.PORT);
});