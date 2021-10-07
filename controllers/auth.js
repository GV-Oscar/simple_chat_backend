const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt')

// Controlador para Registro de Usuario
const signup = async (request = request, response = response) => {

    const { email, phone, password } = request.body;

    try {

        const existeEmail = await Usuario.findOne({ email: email });
        const existePhone = await Usuario.findOne({ phone: phone });

        if (existeEmail || existePhone) {
            return response.status(400).json({
                ok: false,
                msg: 'Credenciales no validas'
            })
        }

        const usuarioNew = new Usuario(request.body);
        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuarioNew.password = bcrypt.hashSync(password, salt);
        // guardar
        await usuarioNew.save();

        // Generar JWT
        const token = await generarJWT(usuarioNew.id, usuarioNew.name);


        response.json({
            ok: true,
            usuario: usuarioNew,
            token
        });


    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

// Controlador para Iniciar Sesion de Usuario
const signIn = async (request = request, response = response) => {

    // Extraer parametros
    const { email, password } = request.body;

    try {

        // Consultar usuario
        const usuarioDB = await Usuario.findOne({ email: email });

        if (!usuarioDB) {
            return response.status(400).json({
                ok: false,
                msg: 'Credenciales no validas'
            });
        }

        // Comprobar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return response.status(400).json({
                ok: false,
                msg: 'Credenciales no validas'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuarioDB.id, usuarioDB.name);

        response.json({
            ok: true,
            usuario: usuarioDB,
            token
        });


    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            mesg: 'Comunicate con soporte'
        });
    }
}

// Controlador para Renovar Token de Usuario
const renewToken = async(request = request, response = response) =>{

    response.json({
        ok:true,
        msg: request.uid
    });
}

module.exports = { signup, signIn, renewToken }