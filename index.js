// Directivas de Windows para permitir nodemon
// Comando: Set-ExecutionPolicy -ExecutionPolicy Undefined -Scope CurrentUser
// https://docs.microsoft.com/es-es/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.1

const express = require('express');
const path = require('path');
require('dotenv').config();

// DB
const { dbConnection } = require('./database/config')
dbConnection();

// App de Express
const app = express();

// Lectura y parseo de Request.
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


// Mis Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/usuarios'));
app.use('/api/messages', require('./routes/mensajes'));



server.listen(process.env.PORT, (error) => {

    if (error) throw new Error(error);

    console.log('Servidor corriendo en puerto!', process.env.PORT);

});