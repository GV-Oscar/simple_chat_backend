const { validationResult } = require("express-validator");

const validarCampos = (request, response, next) => {

    // obtener errores del check de express
    const errores = validationResult(request);
    //console.log(errores);

    if (!errores.isEmpty()) {
        return response.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();

}

module.exports = {validarCampos}