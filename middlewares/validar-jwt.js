const jwt = require('jsonwebtoken')


const validarJWT = (request, response, next) => {

    // Leer token
    const token = request.header('x-token');
    if (!token) {
        return response.status(401).json({
            ok: false,
            msg: 'Token requerido en la petición'
        });
    }

    try {

        // Validar token
        const { uid } = jwt.verify(token, process.env.JWT_PKEY);
        request.uid = uid;
        // console.log(token);

        next();

    } catch (error) {
        return response.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

}

module.exports = {
    validarJWT
}