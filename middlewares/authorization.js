const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    let { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ msg: "Unauthorized access" })
    }
    try {
        console.log(authorization);
        let [type, token] = authorization.split(" ")
        if (type === "Bearer") {
            const openToken = jwt.verify(token, process.env.SECRET)
            req.user = openToken.user
            next()
        } else {
            return res.status(401).json({ msg: "Unauthorized access" })
        }
    } catch (error) {
        res.json({ msg: "we have an error", error })
    }
}