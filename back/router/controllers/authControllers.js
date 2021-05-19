// Import de module
const jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt');

// simulation de la db
// Elle sera remise à 0 à chaque fois que vous redémarrer le projet
const database = []
// On export database pour pouvoir le récupérer dans d'autre fichier (userController par exemple)
exports.database = database

// On check si on est connecter à l'api depuis le front
exports.checkAPI = (req, res) => {
    // Si il y a pas de token
    if (!req.body.token) return res.status(200).json({ success: true, message: 'Vous êtes connecté avec l\'API !' })
    // On renvoi la reponse
    else return res.status(200).json({ success: true, message: 'Vous êtes connecté avec l\'API avec un Token !' })
}

// Ici on check la session (token) de l'utilisateur
exports.checkSession = (req, res) => {
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
    else return res.status(200).json({ success: true, session: token, message: 'Vous êtes bien connecter !' })
}

// Controller de connexion (login)
exports.login = (req, res) => {
    // err || pas error le log sera toujours effectuer
    console.log('Login: ', req.body)

    // Ici on tcheck si on reçoit bien nos data
    if (!req.body.name || !req.body.password) return res.status(200).json({ message: 'Un problème est survenu !' })
    else {
        // On définit user
        let user;
        // On définit notre [] à envoyer en front
        let dbFront = [];

        // Ici on vient récupéré l' {} qui comporte le name reçu
        database.forEach(i => { if (req.body.name === i.name) user = i })

        // Si il n'a pas trouver de user alors il n'y aura pas de user.name
        if (!user) return res.status(200).json({ message: 'Le nom d\'utilisateur n\'exsiste pas !' })
        else {
            bcrypt.compare(req.body.password, user.password, (err, same) => {
                if (err) throw new Error(err)
                // Si les mot de passe ne corresponde pas (compare)
                else if (!same) return res.status(200).json({ message: 'Le mot de passe ne correspont pas !' })
                else {
                    // Ici on définit les info à entrée dans le token
                    const token = jwt.sign({
                        email: user.email,
                        name: user.name,
                        isVerified: true
                        // Ici on signe notre token avec notre clef privée
                    }, process.env.JWT_PRIVATE_KEY, {
                        // On définit le temps de validité de notre token
                        expiresIn: '2h'
                    })
                    // Ici on définit la session à envoyer en front (donnée non sensible)
                    const session = {
                        name: user.name,
                        email: user.email
                    }
                    // Ici on viens recreer notre [] pour l'envoyer en front
                    database.forEach(i => {
                        // on définit notre {}
                        const completed = { id: i.id, name: i.name, email: i.email }
                        // On envoi notre {} dans notre [] dbFront
                        dbFront.push(completed)
                    })
                    // On renvoi notre réponse
                    return res.status(200).json({
                        success: true,
                        message: 'Bonjour ' + user.name + ' !',
                        token, session, dbFront
                    })
                }
            })
        }

    }
}

// Controller de création de comtpe (register)
exports.register = (req, res) => {
    // err || pas error le log sera toujours effectuer
    console.log('Register: ', req.body)

    // On définit nos variables en cas d'email ou name existant
    let nameExist, emailExist;

    // on parcours notre [] et si il trouve email || name alors il définit 
    // nameExist || emailExist avec l' {} de l'user trouver
    database.forEach(i => { if (req.body.name === i.name) nameExist = i })
    database.forEach(i => { if (req.body.email === i.email) emailExist = i })

    // Ici on tcheck si on reçoit bien nos data
    if (!req.body.name || !req.body.email || (req.body.password !== req.body.passConfirm)) return res.status(200).json({ error: true, message: 'Un problème est survenu !' })
    // On tcheck si l'user est existant
    else if (nameExist) return res.status(200).json({ error: true, message: 'Le nom d\'utilisateur existe déja !' })
    else if (emailExist) return res.status(200).json({ error: true, message: 'L\'email d\'utilisateur existe déja !' })
    else {
        // On recupère le dernier élement du [] et si il y en a pas alors il défini un id par default
        let lastEl = database[database.length - 1] || { id: 0 }
        // Ici on creer l'objet de notre nouvel utilisateur
        let user = { id: lastEl.id + 1, email: req.body.email, name: req.body.name };

        // Ici on chiffre le password et on définit le hash dans notre {} user
        bcrypt.hash(req.body.password, 10, (err, encrypted) => user.password = encrypted)

        // Ajoute notre nouvel user dans le tableau 'database'
        database.push(user)

        // Et on renvoi notre réponse
        return res.status(200).json({
            success: true,
            message: 'Le formulaire à bien été soumis.'
        })
    }
}

// Controller de mot de passe oublier (lostPassword)
// Cette action sera à réaliser avec le module nodemailer
exports.lostPassword = (req, res) => {
    // err || pas error le log sera toujours effectuer
    console.log('LostPassword: ', req.body)
    if (!req.body.email) return res.status(200).json({ error: true, message: 'Un problème est survenu !' })
    else return res.status(200).json({ success: true, message: 'Le formulaire à bien été soumis.' })
}
