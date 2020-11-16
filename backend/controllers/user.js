//Imports
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwtutils');
const models = require ('../models');

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
        var photoUrl = req.body.photo_url;
        var photoAlt = req.body.photo_alt;

        //Verification que tous est bien tapé correctement par l'utilisateur

        if (email == null || nom == null || password == null || prenom == null) {
            return res.status(400).json({ 'error' : 'Paramètres manquant'});
        }

        if (nom.length >= 20 || nom.length <= 4) {
            return res.status(400).json({ 'error' : 'le nom doit avoir un nombre de caractère entre 4 et 20.'});
        }

        if (prenom.length >=25 || prenom.length <=4) {
            return res.status(400).json({ 'error' : 'le prenom doit avoir un nombre de caractère entre 4 et 20.'});
        }

        if (!EMAIL_REGEX.test(email)){
            return res.status(400).json({ 'error' : 'email invalide!'});
        }

        if (!PASSWORD_REGEX.test(password)){
            return res.status(400).json({ 'error' : 'le mot de passe est invalide, il doit avoir 4 à 8 caractère et inclure un nombre.'});
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
                        photoUrl: photoUrl,
                        photoAlt: photoAlt
                    })
                    .then(function(newUser) {
                        return res.status(201).json({ 'userId' : newUser.id})
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error' : 'Impposble d\'ajouter l\'utilisateur'})
                    })
                });
            } else { 
                return res.status(409).json({'error' : 'utilisateur déjà existant'});
                }

        })
        .catch(function(err){
            return res.status(500).json ({ 'error' : 'impossible de vérifier l\'utilisateurs' + err});
        });
    },
        
    //login route
    login: function(req, res) {

        
        
        //Params
        var email = req.body.email;
        var password = req.body.password;

        //verrification des paramètres donné
        if (email == null || password == null) {
            return res.status(400).json({ 'error' : 'Paramètres manquant'})
        }

        /*
        //waterfall

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    attributes: ['email'],
                    where: { email: email }
                })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error' : 'impossible de vérifier l\'utilisateur'});
                });
            },

            function(userFound, done) {
                if (!userFound) {
                    bcrypt.hash(password, 5, function (err, bcryptedPassword ){
                        done (null, userFound, bcryptedPassword);
                    });
                } else {
                    return res.status(409).json({ 'error': 'Utilisateur déjà existant'});
                }
            },

            function(userFound, bcryptedPassword, done) {
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
                    done(newUser);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error' : 'Impposble d\'ajouter l\'utilisateur'});
                });
            }
        ], function(newUser) {
            if (newUser) {
                return res.status(201).json({
                    'userId' : newUser.id
                });
            } else {
                return res.status(500).json({ 'error' : 'Impposble d\'ajouter l\'utilisateur'});
            }
        }); */

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
                        return res.status(403).json({ 'error' : 'mot de passe invalide'});
                    }
                })

            } else {
                    return res.status(404).json ({'error' : 'L\'Utilisateur n\'est pas dans notre base de données'});
                }
            })
            .catch(function(err) {
                return res.status(500).json ({ 'error': 'impossible de vérifier l\'utilisateur'})
            });
            
    },

    //accédez à la page profile
    getUserProfile: function(req, res) {

        //recupérer l'autorisation
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0)
            return res.status(400).json({ 'error': 'mauvais token'});
        
        models.User.findOne({
            attributes: ['id', 'email', 'nom','prenom', 'poste', 'photo_alt', 'photo_url'],
            where: { id: userId }

        })
        .then(function(user) {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({'error' : 'Utilisateur introuvable!'})
            }
        })
        .catch(function(err) {
            res.status(500).json({ 'error' : 'Impossible d\'aller chercher l\'utilisateur'})
        });
    },
    
    updateUserProfile: function(req, res) {

        // récupéréer l'autorisation
        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);
    
        // Params
        var poste = req.body.poste;
        var photoUrl = req.body.photo_url;
        var photoAlt = req.body.photo_alt;

        /* asyncLib.waterfall ([

            function(done) {
                models.User.findOne({
                    where: { email: email }
                })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err){
                    return res.status(500).json ({ 'error' : 'Impossible de vérifier l\'utilisateur'});
                });                
            },
            function(userFound, done) {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                        done(null, userFound, resBycrypt);
                    });
                } else {
                    return res.status(404).json ({'error' : 'L\'Utilisateur n\'est pas dans notre base de données'});
                }
            },
            function(userFound, resBycrypt, done) {
                if(resBycrypt) {
                  done(userFound);
                } else {
                  return res.status(403).json({ 'error': 'mot de passe invalide' });
                }
              }
        ], function(userFound) {
            if (userFound) {
                return res.status(201).json({
                    'userId': userFound.id,
                    'token': jwtUtils.generateTokenForUser(userFound)
                });
            } else {
                return res.status(500).json({'error': 'Connexion impossible'});
            }
        }); */
    
        
        models.User.findOne({
            attributes: ['id', 'poste', 'photo_url', 'photo_alt'],
            where: { id: userId }
        })
        .then(function (user) {
            if (user) {
                user.update ({
                    poste: (poste ? poste : userFound.poste),
                    photoAlt: (photoAlt ? photoAlt : userFound.photoAlt),
                    photoUrl: (photoUrl ? photoUrl : userFound.photoUrl)
                })
                .then(function (user) {
                    return res.status(201).json({ user })
                })
                .catch(function(err) {
                    return res.status(500).json ({ 'error' : 'Impossible d\'apporter les modifications'});
                })
            } else {
                return res.status(409).json ({ 'error' : 'Utilisateur non trouvé'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({'error' : 'Impossible de vérifier l\'utilisateur'});
        });
    },

    deleteUserProfile: function(req, res) {

        // récupéréer l'autorisation
        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);

        //Params
        var email = req.body.email;
        var password = req.body.password;

        models.User.findOne({
            where: {id: userId}
        })

        .then(function(userFound) {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    if (resBycrypt) {
                        userFound.destroy()
                        .then (function () {
                            return res.status(201).json({message: 'utilisateurs supprimé'});
                        })
                    }else {
                        return res.status(403).json({ 'error' : 'mot de passe invalide'});
                    }
                })

            } else {
                    return res.status(404).json ({'error' : 'L\'Utilisateur n\'est pas dans notre base de données'});
                }
        })
        .catch(function(err) {
            return res.status(500).json ({ 'error': 'impossible de vérifier l\'utilisateur'})
        });
    }
}
