const { io } = require('../index');

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');


    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
     });


    // Escuchar un evento del cliente
    client.on('mensaje', (payload) => {
        console.log(payload);

        // Emitir un evento a todos los lcientes
        io.emit('mensaje', { admin: 'Nuevo cliente conectado a las :' + payload['time']});
    });
});