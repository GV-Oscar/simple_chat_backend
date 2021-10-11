/*
    path: /api/users
 */

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getUsuarios } = require('../controllers/usuarios')

const router = Router();

// Ruta para obtener usuarios
router.get('/', validarJWT, getUsuarios)


// Exportar archivo
module.exports = router;