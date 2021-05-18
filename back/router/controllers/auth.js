// Import de module
const jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt');

// simulation de la db
// Elle sera remise à 0 à chaque fois que vous redémarrer le projet
const database = []

// Controller de connexion (login)
exports.login = (req, res) => {
    // err || pas error le log sera toujours effectuer
    console.log('Login: ', req.body)

    // Ici on tcheck si on reçoit bien nos data
    if (!req.body.name || !req.body.password) res.json({ message: 'Un problème est survenu !' })
    else {
        // On définit user
        let user;

        // Ici on vient récupéré l' {} qui comporte le name reçu
        database.forEach(i => { if (req.body.name === i.name) user = i })

        // Si il n'a pas trouver de user alors il n'y aura pas de user.name
        if (!user) res.json({ message: 'Le nom d\'utilisateur n\'exsiste pas !' })
        else {
            bcrypt.compare(req.body.password, user.password, (err, same) => {
                if (err) throw new Error(err)
                else if (!same) res.json({ message: 'Le mot de passe ne correspont pas !' })
                else {
                    const token = jwt.sign({
                        email: user.email,
                        name: user.name,
                        isVerified: true
                    }, process.env.JWT_PRIVATE_KEY, {
                        expiresIn: '2h'
                    })
                    const session = {
                        name: user.name,
                        email: user.email
                    }
                    res.json({
                        message: 'Bonjour ' + user.name + ' !',
                        token, session
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
    if (!req.body.name || !req.body.email || (req.body.password !== req.body.passConfirm)) res.json({ message: 'Un problème est survenu !' })
    // On tcheck si l'user est existant
    else if (nameExist) res.json({ message: 'Le nom d\'utilisateur existe déja !' })
    else if (emailExist) res.json({ message: 'L\'email d\'utilisateur existe déja !' })
    else {
        // On recupère le dernier élement du [] et si il y en a pas alors il défini un id par default
        let lastEl = database[database.length - 1] || { id: 0 }
        // Ici on creer l'objet de notre nouvel utilisateur
        let user = { id: lastEl.id + 1, email: req.body.email, name: req.body.name };
        // ici on définit un [] que l'on va pouvoir envoyer en front
        let dbFront = [];

        // Ici on chiffre le password et on définit le hash dans notre {} user
        bcrypt.hash(req.body.password, 10, (err, encrypted) => user.password = encrypted)

        // Ajoute notre nouvel user dans le tableau 'database'
        database.push(user)

        // Ici on viens recreer notre [] pour l'envoyer en front
        database.forEach(i => {
            // on définit notre {}
            const completed = { id: i.id, name: i.name, email: i.email }
            // On envoi notre {} dans notre [] dbFront
            dbFront.push(completed)
        })

        // Et on renvoi notre réponse
        res.json({
            message: 'Le formulaire à bien été soumis.',
            result: dbFront
        })
    }
}

// Controller de mot de passe oublier (lostPassword)
exports.lostPassword = (req, res) => {
    // err || pas error le log sera toujours effectuer
    console.log('LostPassword: ', req.body)
    if (!req.body.email) res.json({ message: 'Un problème est survenu !' })
    else res.json({ message: 'Le formulaire à bien été soumis.' })
}

exports.getListUsers = (req, res) => {
    let dbFront = [];

    // Ici on viens recreer notre [] pour l'envoyer en front
    database.forEach(i => {
        // on définit notre {}
        const completed = { id: i.id, name: i.name, email: i.email }
        // On envoi notre {} dans notre [] dbFront
        dbFront.push(completed)
    })

    res.json({ result: dbFront })
}

exports.getUser = (req, res) => {
    let user;

    database.forEach(i => {
        if (Number(req.params.id) === Number(i.id)) {
            user = { id: i.id, name: i.name, email: i.email }
        }
    })

    res.json({ result: user })
}

