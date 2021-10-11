const jwt = require('jsonwebtoken');

/// Permite generar el token para los usuarios que ingresan y registran
const generarJWT = (uid, name,) => {

    return new Promise((resolve, reject) => {


        const payload = {
            uid,
            //name
        }

        jwt.sign(payload, process.env.JWT_PKEY, {
            expiresIn: '48h'
        }, (err, token) => {

            if (err) {
                // no se pudo crear el token
                reject('No se pudo generar el JWT');
            } else {
                // enviar token
                resolve(token);
            }

        })

    });

}

const comprobarJWT = (token = '') => {

    try {

        // Validar token
        const { uid } = jwt.verify(token, process.env.JWT_PKEY);
        return [true, uid];

    } catch (error) {
        return [false, null];
    }


}

module.exports = { generarJWT, comprobarJWT }