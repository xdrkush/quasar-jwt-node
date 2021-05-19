// Import module
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    console.log('MIDDLEWARE')
    // Si il n'y a pas de token dans la requète
    if (!req.body.token) res.status(200).json({ error: true, message: 'Vous n\'avez pas de token !' })

    // On définit token en tant que token déchiffré
    const token = jwt.verify(req.body.token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
        // Si il rencontre une erreur il renvoit une réponse
        if (err) res.status(200).json({ error: true, message: 'Votre token n\'est pas ou plus valide !', deleteStorage: true })
        // Si il n'y a pas de problème alors la fonction return le token déchiffrer
        else return decoded
    })

    // Si il ne trouve pas le token déchiffré
    if (!token) return;

    // Si il ne rencontre aucun problème alors il continu la requète jusqu'au controller
    else next()
}