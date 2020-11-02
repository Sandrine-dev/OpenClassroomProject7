const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModels = require('../models');

module.exports = {
    register: function(req, res) {

        var email = req.body.email;
        var nom = req.body.nom;
        var prenom = req.body.prenom;
        var poste = req.body.poste;
        var password = req.body.password;
        var photoUrl = req.body.photo_url;
        var photoAlt = req.body.photo_alt;

        if (email == null || username == null || password == null) {
            return res.status(400).json({ 'error' : ' missing parameters'});
        } 

        modules.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        .then(function(userFound) {
            if (!userFound) {

                bcrypt.hash(password, 5, function (err, bcryptedPassword ){
                    var newUser = models.User.create({
                        email: email,
                        nom: nom,
                        prenom: prenom,
                        poste: poste,
                        photoUrl: photoUrl,
                        photoAlt: PhotoAlt
                    })
                    .then(function(nexUser) {
                        return res.status(201).json({
                            'userId': newUser.id
                        })
                    })
                    .catch(function(err) {
                        return res.status(500).json ({ 'error': 'cannot add user'});
                    })
                })

            } else {
                return res.status(409).json({ 'error': 'Utilisateur déjà existant'});
            }

        })
        .catch (function(err) {
            return res.status(500).json({ 'error': 'Impossible de vérifer l\'utilisateurs'});
        });
        

    },
    login: function(req, res) {
        
    }
};




/*signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new Users({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    Users.findOne({ email: req.body.email })
    .then( user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non tourvé!'});
        }
        bcrypt.compare( req.body.password, user.password)
        .then(valid => {
            if (!valid){
                return res.status(401).json({ error: 'Mot de passe incorrect!'});
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn: '12h'}
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};*/