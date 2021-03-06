//Imports
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwtutils');
const models = require ('../models');
const fs = require ('fs');

//const utile
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

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
        var photo = req.body.photo;

        //Verification que tous est bien tapé correctement par l'utilisateur

        if (email == null || nom == null || password == null || prenom == null) {
            return res.status(400).json({ msg : 'Paramètres manquant'});
        }

        if (nom.length >= 20 || nom.length <= 3) {
            return res.status(400).json({ msg : 'Votre nom doit contenir entre 4 et 20 caractères'});
        }

        if (prenom.length >=25 || prenom.length <=3) {
            return res.status(400).json({ msg : 'Votre prénom doit contenir entre 4 et 25 caractère'});
        }

        if (!EMAIL_REGEX.test(email)){
            return res.status(400).json({ msg : 'Votre email est invalide, il ne doit pas contenir de caractère sépciaux'});
        }

        if (!PASSWORD_REGEX.test(password) || password.length <= 5){
            return res.status(400).json({ msg : 'Votre mot de passe est invalide, il doit avoir un minimum de 6 caractère et inclure un nombre.'});
        }


        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        
        .then(function(userFound, done) {
            if (!userFound) {
                bcrypt.hash(password, 5, function (err, bcryptedPassword ){
                    var newUser = models.User.create({
                        email: email,
                        nom: nom,
                        prenom: prenom,
                        poste: poste,
                        password: bcryptedPassword,
                        photo: photo,
                        isAdmin: 0
                    })
                    .then(function(newUser) {
                        return res.status(201).json({ 'userId' : newUser.id})
                    })
                    .catch(function(err) {
                        return res.status(500).json({ msg : 'Impposble d\'ajouter l\'utilisateur'})
                    })
                });
            } else { 
                return res.status(409).json({ msg : 'utilisateur déjà existant'});
                }

        })
        .catch(function(err){
            return res.status(500).json ({ msg : 'impossible de vérifier l\'utilisateurs' + err});
        });
    },
        
    //login route
    login: function(req, res) {
        
        //Params
        var email = req.body.email;
        var password = req.body.password;

        //verrification des paramètres donné
        if (email == null || password == null) {
            return res.status(400).json({ msg : 'Paramètres manquant'})
        }


        models.User.findOne({
            where: { email: email }
        })
        .then(function(userFound) {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    if (resBycrypt) {
                        return res.status(200).json({
                            'userId' : userFound.id,
                            'token' : jwtUtils.generateTokenForUser(userFound)
                        });
                    }else {
                        return res.status(403).json({ msg : 'mot de passe invalide'});
                    }
                })

            } else {
                    return res.status(404).json ({ msg : 'L\'Utilisateur n\'est pas dans notre base de données'});
                }
            })
            .catch(function(err) {
                return res.status(500).json ({ msg : 'impossible de vérifier l\'utilisateur'})
            });
            
    },

    //accédez à la page profile
    getUserProfile: function(req, res) {

        //recupérer l'autorisation
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0)
            return res.status(400).json({ msg : 'Session expiré '});
        
        models.User.findOne({
            attributes: ['id', 'email', 'nom','prenom', 'poste', 'photo', 'isAdmin'],
            where: { id: userId }

        })
        .then(function(user) {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({ msg : 'Utilisateur introuvable!'})
            }
        })
        .catch(function(err) {
            res.status(500).json({ msg : 'Impossible d\'aller chercher l\'utilisateur'})
        });
    },
    
    updateUserProfile: function(req, res) {

        // récupéréer l'autorisation
        var headerAuth  = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
    
        // Params
        var poste = req.body.poste;
        var image = null;

        if(req.file !== undefined){
            //console.log(req.file);
            image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        }
        //console.log(image);
    
        
        models.User.findOne({
            attributes: ['id'],
            where: { id: userId }
        })
        .then(function (user) {
            if (user) {
                user.update ({
                    poste: (poste ? poste : user.poste),
                    photo: (image ? image : user.image)
                })
                .then(function (user) {
                    return res.status(201).json({ user })
                })
                .catch(function(err) {
                    return res.status(500).json ({ msg : 'Impossible d\'apporter les modifications'});
                })
            } else {
                return res.status(409).json ({ msg : 'Utilisateur non trouvé'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({ msg : 'Impossible de vérifier l\'utilisateur' + err});
        });
    },

    deleteUserProfile: function(req, res) {

        // récupéréer l'autorisation
        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);

        //Params
        var email = req.body.email;
        var password = req.body.password;

        console.log(req.body);

        console.log(email);
        console.log(password);

        if (email == null || password == null) {
            return res.status(400).json({msg: 'paramètre manquant' })
        }

        models.User.findOne({
            where: {id: userId}
        })

        .then(function(userFound) {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    if (resBycrypt) {
                        //Ajouter la suppression de tous les messages et commentaires laisser par l'utilisateur 
                        var image = userFound.photo;
                        fs.unlink(`${image}`, () => {
                            userFound.destroy()
                        })
                        return res.status(201).json({ msg : 'utilisateur supprimé'});
                    }else {
                        return res.status(403).json({ msg : 'mot de passe invalide'});
                    }
                })

            } else {
                    return res.status(404).json ({ msg : 'L\'Utilisateur n\'est pas dans notre base de données'});
                }
        })
        .catch(function(err) {
            return res.status(500).json ({ msg : 'impossible de vérifier l\'utilisateur'})
        });
    },

    getUserInfos: function (req, res) {
        
         //recupérer l'autorisation
         var headerAuth = req.headers['authorization'];
         var userId = jwtUtils.getUserId(headerAuth);
 
         if (userId < 0)
             return res.status(400).json({ msg : 'Session expiré '});
         
         models.User.findOne({
             attributes: ['id', 'email', 'nom','prenom', 'poste', 'photo'],
             where: { id: userId }
 
         })
         .then(function(user) {
             if (user) {
                 res.status(201).json(user);
             } else {
                 res.status(404).json({ msg : 'Utilisateur introuvable!'})
             }
         })
         .catch(function(err) {
             res.status(500).json({ msg : 'Impossible d\'aller chercher l\'utilisateur'})
         });

    },

}