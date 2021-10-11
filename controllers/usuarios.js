const { request, response } = require("express");
const Usuario = require('../models/usuario');

const getUsuarios = async (req = request, res = response) => {

    try {

        // Obtener un query parametro
        const desde = Number( req.query.desde) || 0;

        const uid = req.uid;
        const usuarios = await Usuario
            .find({ _id: { $ne: uid } })
            .sort('-online')
            .skip(desde)
            .limit(20);

        res.json({
            ok: true,
            usuarios,
            desde
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Ocurrio un error inesperado, por favor comunicarse con el administrador'
        });
    }

}

module.exports = {
    getUsuarios
}