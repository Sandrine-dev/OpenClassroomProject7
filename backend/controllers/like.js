//Imports
var models = require('../models');
var jwtUtils = require ('../utils/jwtutils');
var asyncLib = require ('async');

const DISLIKED = 0;
const LIKED = 1;

module.exports = {

    likePost: function (req, res) {
        //recupérer l'autorisation
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        //paramètres
        var messageId = parseInt(req.query.messageId);

        if (messageId <= 0) {
            return res.status(400).json ({ 'error' : 'paramètre invalide'});
        }

        //waterfall
        asyncLib.waterfall([
            function (done) {
                //console.log(messageId);
                models.Message.findOne({
                    attibutes: ['id'],
                    where: { id: messageId }
                })
                .then(function(messageFound) {
                    done(null, messageFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error' : 'impossible de vérifier le message' + err});
                });
            },
            function(messageFound, done) {
                if(messageFound) {
                    models.User.findOne({
                        where: { id: userId }
                    })
                    .then(function(userFound) {
                        done(null, messageFound, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error' : 'impossible de vérifier l\'utilisateur'});
                    });
                }else{
                    res.status(404).json({'error': 'Message déjà like' + err});
                }
            },
            function(messageFound, userFound, done) {
                if(userFound) {
                    models.Like.findOne({
                        where: {
                            userId: userId,
                            messageId: messageId
                        }
                    })
                    .then(function(UserAlreadyLiked) {
                        done (null, messageFound, userFound, UserAlreadyLiked);
                    })
                    .catch(function(err) {
                        return res.status(500).json ({ 'error' : 'Impossible de savoir si l\'utilisateur à déjà aimé'});
                    });
                } else {
                    res.status(404).json({ 'error' : 'Utilisateur introuvable'});
                }
            },
            function(messageFound, userFound, UserAlreadyLiked, done) {
                if (!UserAlreadyLiked) {
                    messageFound.addUser(userFound, {isLike : LIKED})
                    .then(function (alreadyLikeFound) {
                        done(null, messageFound, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json ({ 'error' : 'impossible de prendre la réaction de l\'utilisateur'});
                    });
                } else {
                    if (UserAlreadyLikedFound.isLike === DISLIKED) {
                        UserAlreadyLikedFound.update({
                            isLike: LIKED,
                        })
                        .then(function() {
                            done(null, messageFound, userFound);
                        })
                        .catch(function(err) {
                            res.status(500).json({'error': 'impossible de modifier la réaction' + err});
                        });
                    } else {
                        res.status(409).json({ 'error' : 'message déjà aimé'});
                    }
                    
                }
            },
            function(messageFound, userFound, done) {
                messageFound.update({
                    likes: + messageFound.likes + 1,
                })
                .then(function() {
                    done(messageFound);
                })
                .catch(function(err) {
                    res.status(500).json({ 'error': 'Impossible de mettre à jour le compteur de like'});
                })
            }
         ], function(messageFound) {
             if (messageFound) {
                 return res.status(201).json(messageFound);
             } else {
                 return res.status(500).json({'error' :'cannot update message'});
             }
         });
    },

    dislikePost: function (req, res) {
        //recupérer l'autorisation
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        //paramètres
        var messageId = parseInt(req.query.messageId);

        if (messageId <= 0) {
            return res.status(400).json ({ 'error' : 'paramètre invalide'});
        }

        asyncLib.waterfall([
            function (done) {
                models.Message.findOne({
                    where: { id: messageId }
                })
                .then(function(messageFound) {
                    done(null, messageFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error' : 'impossible de vérifier le message' + err});
                });
            },
            function(messageFound, done) {
                if(messageFound) {
                    models.User.findOne({
                        where: { id: userId}
                    })
                    .then(function(userFound) {
                        done(null, messageFound, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error' : 'impossible de vérifier l\'utilisateur'});
                    });
                }else{
                    res.status(404).json({'error': 'Message déjà aimé'});
                }
            },
            function(messageFound, userFound, done) {
                if(userFound) {
                    models.Like.findOne({
                        where: {
                            userId: userId,
                            messageId: messageId
                        }
                    })
                    .then(function(isUserAlreadyLiked) {
                        done (null, messageFound, userFound, isUserAlreadyLiked);
                    })
                    .catch(function(err) {
                        return res.status(500).json ({ 'error' : 'Impossible de savoir si l\'utilisateur à déjà aimé'});
                    });
                } else {
                    res.status(404).json({ 'error' : 'Utilisateur introuvable'});
                }
            },
            function(messageFound, userFound, isUserAlreadyLiked, done) {
                if (!isUserAlreadyLiked) {
                   isUserAlreadyLiked.destroy()
                    .then(function () {
                        done(null, messageFound, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json ({ 'error' : 'impossible de prendre la réaction de l\'utilisateur'});
                    });
                } else {
                    done(null, messageFound, userFound);
                }
            },
            function(messageFound, userFound, done) {
                messageFound.update({
                    likes: messageFound.likes - 1,
                })
                .then(function() {
                    done(messageFound);
                })
                .catch(function(err) {
                    res.status(500).json({ 'error': 'Impossible de mettre à jour le compteur de like'});
                })
            }
         ], function(messageFound) {
             if (messageFound) {
                 return res.status(201).json(messageFound);
             } else {
                 return res.status(500).json({'error' :'cannot update message'});
             }
         });
    }
}