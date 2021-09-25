const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
bands.addBand(new Band('Mozart'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Jbalvin'));
bands.addBand(new Band('Héroes del Silencio'));
bands.addBand(new Band('Farruko'));
bands.addBand(new Band('Ozuna'));
bands.addBand(new Band('Mark Anthony'));
bands.addBand(new Band('Hector Lavo'));
bands.addBand(new Band('Dimitry Vegas'));
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

    /// Escucha cuando un cliente vota por una banda.
    client.on('vote-band', (payload) => {
        //console.log(payload.id);
        // votar por una banda.
        bands.voteBand(payload.id);
        // Emitir evento de bandas activas a todos los clientes.
        io.emit('active-bands', bands.getBands());
    });

    // Escuchar cuando un cliente agrega una banda
    client.on('add-band', (payload) => {
        // agregar una nueva banda
        bands.addBand(new Band(payload.name));
        // emitir evento de bandas activas a todos los clientes
        io.emit('active-bands', bands.getBands());
    });

    // Escuchar cuando un cliente emite un evento para borrar una banda.
    client.on('delete-band', (payload) => {
        // borrar banda
        bands.deleteBand(payload.id);
        
        // emitir evento de bandas activas a todos los clientes
        io.emit('active-bands', bands.getBands());        
    });

    /** 
     // Escuchar un evento del cliente
    client.on('mensaje', (payload) => {
        console.log(payload);

        // Emitir un evento a todos los lcientes
        io.emit('mensaje', { admin: 'Nuevo cliente conectado a las :' + payload['time'] });
    });

    client.on('publicar', (payload) => {

        // emitir a todos
        io.emit('evento', { payload });

        // emitir a todos menos al cliente que lo emite
        //client.broadcast.emit('evento', { payload });

    });

    client.on('emitir-mensaje', (payload) => {
        console.log(payload);

        // io.emit('mensaje', payload);
        client.broadcast.emit('mensaje', payload);
    });
    */
    

});