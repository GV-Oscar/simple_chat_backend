const { io } = require('../index');


//console.log(bands);

// Servidor escuchando las conexiones de clientes
io.on('connection', client => {
    console.log('Cliente conectado');

    // Emitir listado de bandas activas a todo cliente que se conecte.
    client.emit('active-bands', bands.getBands());

    /// Escucha cuando un cliente se desconecta.
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
   

});