/**
 * path old: /api/login
 * path new: /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { signup, signIn, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Ruta para registrarse
router.post('/signup', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('phone', 'El número celular es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], signup);


// Ruta para iniciar sesión
router.post('/signin', [
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], signIn);

// Ruta para renovar token
router.get('/renew', validarJWT, renewToken)


// Exportar archivo
module.exports = router;