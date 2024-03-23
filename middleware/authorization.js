const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    let { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ msg: "Token no enviado" })
    }
    try {
        console.log(authorization);
        let [type, token] = authorization.split(" ")
        if (type === "Bearer") {
            const openToken = jwt.verify(token, process.env.SECRET)
            req.user = openToken.user
            next() // si todo esta bien, continua con el siguiente middleware(return true)
        } else {
            return res.status(401).json({ msg: "Estructura de token invalida" })
        }
    } catch (error) {
        res.json({ msg: "we have an error", error })
    }
}