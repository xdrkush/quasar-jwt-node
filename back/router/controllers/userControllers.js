const database = require('./authControllers').database

// Controller pour récupérer la db 'database []'
exports.getListUsers = (req, res) => {
    if (!req.body.token || database.length < 1) return res.status(200).json({ error: true, message: 'Une erreur est survenu !' })
    else {
        // On définit le [] à envoyer en front
        let dbFront = [];
        // Ici on viens recreer notre [] pour l'envoyer en front
        database.forEach(i => {
            // on définit notre {}
            const completed = { id: i.id, name: i.name, email: i.email }
            // On envoi notre {} dans notre [] dbFront
            dbFront.push(completed)
        })
        // On renvoie notre réponse
        return res.status(200).json({ success: true, result: dbFront, message: 'Nombre user: ' + database.length })
    }
}

// Controller poiur récupérer un user en particulier '/:id'
exports.getUser = (req, res) => {
    if (!req.body.token) return res.status(200).json({ error: true, message: 'Une erreur est survenu !' })
    else {
        // On definit user
        let user;
        // on recherche dans notre []
        database.forEach(i => {
            // On check si l'id passer en params de l'url est === à un id dans notre []
            if (Number(req.params.id) === Number(i.id)) user = { id: i.id, name: i.name, email: i.email }
        })
        // On revois notre réponse
        return res.status(200).json({ success: true, result: user })
    }
}