const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const models = require ('../models');

module.exports = {
    signup: function(req, res) {

        var email = req.body.email;
        var nom = req.body.nom;
        var prenom = req.body.prenom;
        var poste = req.body.poste;
        var password = req.body.password;
        var photoUrl = req.body.photo_url;
        var photoAlt = req.body.photo_alt;

        if (email == null || nom == null || password == null || prenom == null) {
            return res.status(400).json({ 'error' : ' missing parameters'});
        }

        models.User.findOne({
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
                        password: bcryptedPassword,
                        photoUrl: photoUrl,
                        photoAlt: photoAlt
                    })
                    .then(function(newUser) {
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