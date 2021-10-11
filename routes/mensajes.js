/*
    Path: /api/messages
*/

const { Router } = require('express');
const { obtenerChat } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Ruta para obtener usuarios
router.get('/:de', validarJWT, obtenerChat)


// Exportar archivo
module.exports = router;