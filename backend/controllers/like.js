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
        var messageId = req.params.messageId;

        if (messageId <= 0) {
            return res.status(400).json ({ msg : 'paramètre invalide'});
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
                    return res.status(500).json({ msg : 'impossible de vérifier le message' + err});
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
                        return res.status(500).json({ msg : 'impossible de vérifier l\'utilisateur'});
                    });
                }else{
                    res.status(404).json({ msg: 'Message déjà like'});
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
                    .then(function(UserAlreadyLikedFound) {
                        done (null, messageFound, userFound, UserAlreadyLikedFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json ({ msg : 'Impossible de savoir si l\'utilisateur à déjà like'});
                    });
                } else {
                    res.status(404).json({ msg : 'Utilisateur introuvable'});
                }
            },
            function(messageFound, userFound, UserAlreadyLikedFound, done) {
                if (!UserAlreadyLikedFound) {
                        messageFound.addUser(userFound, {isLike : LIKED})
                    .then(function (alreadyLikeFound) {
                        done(null, messageFound, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json ({ msg : 'impossible de prendre la réaction de l\'utilisateur'});
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
                            res.status(500).json({ msg: 'impossible de modifier la réaction'});
                        });
                    } else {
                        res.status(409).json({ msg : 'message déjà like'});
                    }
                    
                }
            },
            function(messageFound, userFound, done) {
                messageFound.update({
                    likes: messageFound.likes + 1,
                })
                .then(function() {
                    done(messageFound);
                })
                .catch(function(err) {
                    res.status(500).json({ msg: 'Impossible de mettre à jour le compteur de like'});
                })
            }
         ], function(messageFound) {
             if (messageFound) {
                 return res.status(201).json(messageFound);
             } else {
                 return res.status(500).json({msg :'impossible de mettre à jour le message'});
             }
         });
    },

    dislikePost: function (req, res) {
        //recupérer l'autorisation
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        //paramètres
        var messageId = req.params.messageId;

        if (messageId <= 0) {
            return res.status(400).json ({ msg : 'paramètre invalide'});
        }

        asyncLib.waterfall([
            function (done) {
                models.Message.findOne({
                    attibutes: ['id'],
                    where: { id: messageId }
                })
                .then(function(messageFound) {
                    done(null, messageFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ msg : 'impossible de vérifier le message'});
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
                        return res.status(500).json({ msg : 'impossible de vérifier l\'utilisateur'});
                    });
                }else{
                    res.status(404).json({ msg: 'Message déjà dislike'});
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
                    .then(function(userAlreadyLikedFound) {
                        done (null, messageFound, userFound, userAlreadyLikedFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json ({ msg : 'Impossible de savoir si l\'utilisateur à déjà disliker'});
                    });
                } else {
                    res.status(404).json({ msg : 'Utilisateur introuvable'});
                }
            },
            function(messageFound, userFound, userAlreadyLikedFound, done) {
                if (!userAlreadyLikedFound) {
                        messageFound.addUser(userFound, { isLike: DISLIKED })
                    .then(function () {
                        done(null, messageFound, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json ({ msg : 'impossible de prendre la réaction de l\'utilisateur'});
                    });
                } else {
                    if (userAlreadyLikedFound.isLike === LIKED) {
                            userAlreadyLikedFound.update({
                            isLike: DISLIKED,
                        })
                        .then(function() {
                            done(null, messageFound, userFound);
                        })
                        .catch(function(err) {
                            res.status(500).json({ msg: 'Impossible de mettre à jour la réaction' });
                        });
                    } else {
                        res.status(409).json({ msg: 'message déjà dislike' });
                    }
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
                    res.status(500).json({ msg: 'Impossible de mettre à jour le compteur de like'});
                })
            }
         ], function(messageFound) {
             if (messageFound) {
                 return res.status(201).json(messageFound);
             } else {
                 return res.status(500).json({msg :'Impossible de mettre à jour le message'});
             }
         });
    }
}