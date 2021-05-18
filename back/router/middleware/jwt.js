// Import module
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    console.log('middleware: ')
    const token = jwt.verify(req.params.token, process.env.JWT_PRIVATE_KEY)

    console.log(token)

    if (token) next()
    else res.json({ message: 'Nous avons un problème avec votre token !' })
}