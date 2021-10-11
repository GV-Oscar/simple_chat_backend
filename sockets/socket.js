const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');


//console.log(bands);

// Servidor escuchando las conexiones de clientes
io.on('connection', client => {
    console.log('Cliente conectado');

    // console.log(client.handshake.headers);
    //console.log(client.handshake.headers['x-token']);
    const token = client.handshake.headers['x-token'];
    const [tokenValido, uid] = comprobarJWT(token)
    //console.log(tokenValido, uid);

    // Comprobar cliente autenticado
    if (!tokenValido) {
        // usuario no autenticado, desconectar.
        return client.disconnect();
    }

    // Establecer cliente conectado y autenticado
    const usuarioDB = usuarioConectado(uid);

    // Ingresar cliente a una sala en particular
    client.join(uid);

    // Escuchar del cliente evento: mensaje-personal
    client.on('mensaje-personal', async (payload) => {
        // TODO: guardar mensaje en la bdd.
        const mensaje = await grabarMensaje(payload)

        // enviar mensaje a un canal especifico.
        io.to(payload.para).emit('mensaje-personal', payload);
    });




    /// Escucha cuando un cliente se desconecta.
    client.on('disconnect', () => {
        //console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    /*
     // Emitir listado de bandas activas a todo cliente que se conecte.
     client.emit('active-bands', bands.getBands());
 
     
     
     */


});