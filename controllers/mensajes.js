const { request, response } = require("express");
const Mensaje = require('../models/mensaje');

const obtenerChat = async (req = request, res = response) => {

    try {

        // Obtene mi uid
        const miUID = req.uid;
        // Obtener uid de quien se recibe los mensajes
        const deUID = req.params.de;
        // Obtener un query parametro
        const desde = Number(req.query.desde) || 0;


        const mensajes = await Mensaje.find({
            $or: [{ de: miUID, para: deUID }, { de: deUID, para: miUID }]
        })
            .sort({ createdAt: 'desc' })
            .limit(30)
            .skip(desde);

        res.json({
            ok: true,
            //chatId: miUID + '-' + deUID,
            mensajes
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado al obtener mensajes de usuario, por favor comunicarse con el administrador'
        });
    }

}

module.exports = {
    obtenerChat
}