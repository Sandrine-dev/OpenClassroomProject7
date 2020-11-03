const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwtutils');

const models = require ('../models');

//controllers routes
module.exports = {
    //signup route
    signup: function(req, res) {

        //Params
        var email = req.body.email;
        var nom = req.body.nom;
        var prenom = req.body.prenom;
        var poste = req.body.poste;
        var password = req.body.password;
        var photoUrl = req.body.photo_url;
        var photoAlt = req.body.photo_alt;

        if (email == null || nom == null || password == null || prenom == null) {
            return res.status(400).json({ 'error' : 'Paramètres manquant'});
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
                        return res.status(500).json ({ 'error': 'Impossible d\'ajouter cet utilisateur'});
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

    //login route
    login: function(req, res) {
        
        //Params
        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({ 'error' : 'Paramètres manquant'})
        }

        models.User.findOne({
            where: { email: email }
        })
        .then(function(userFound) {

            if(userFound){

                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    if(resBycrypt) {
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    } else {
                        return res.status(403).json({'error': 'mot de passe érroné'});
                    }
                });

            } else {
                return res.status(404).json({ 'error' : 'Utilisateurs incconue'});
            }

        })
        .catch(function(err) {
            return res.status(500).json({'error': 'Impossible de vérifier l\'utilisateur'});
        });
    }
};