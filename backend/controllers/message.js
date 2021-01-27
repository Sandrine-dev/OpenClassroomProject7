//Import
const models = require ('../models');
const asyncLib = require ('async');
const fs = require ('fs');
var jwtUtils = require ('../utils/jwtutils');


module.exports = {
    createMessage: function(req, res) {

        //console.log('coucou');
        //recupérer l'autorisation
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        //Paramètres
        var contenue = req.body.message;
        var image = null;

        console.log(req);

        if(req.file !== undefined){
            console.log(req.file);
            image = `images/${req.file.filename}`;
        }
        console.log(image);

        if (contenue == null) {
            return res.status(400).json({ 'error' : 'veuillez ajouter du texte'});
        }

        /*asyncLib.waterfall([
           function(done) {
               //console.log(userId);
               models.User.findOne({
                    attributes: ['id'],
                    where: { id: userId }
                })
                .then((user) => {
                    console.log(user);
                    done(null, user);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error' : 'impossible de vérifier l\'utilisateur' });
                });

            },
            function (user, done) {
                if (user) {
                    models.Message.create({
                        userId: user.id,
                        message : contenue,
                        imagealt: imagealt,
                        imageurl : imageurl,
                        likes : 0,
                    })
                    .then(function(newMessage) {
                        done(newMessage);
                    });
                } else {
                    res.status(404).json ({ 'error' : 'Utilisteur non trouvé'});
                }
            },
             
        ], 
        function (newMessage) {
            if (newMessage) {
                return res.status(201).json(newMessage);
            } else {
                return res.status(500).json({ 'error' : 'Impossible de poster le message!'});
            } 
         });*/

        models.User.findOne({
            attributes: ['id'],
            where: { id: userId}
        })

        .then(function(user) {
            if(user) {
                //console.log(image);
                var newMessage = models.Message.create({
                        userId: user.id,
                        message : contenue,
                        image_url: image,
                        likes : 0,
                })
                .then(function(newMessage){
                    console.log(newMessage);
                    return res.status(201).json({'messageId' : newMessage.id});
                })
                .catch(function(err) {
                    return res.status(500).json({message: 'Impossible d\'ajouter le message' + err});
                })
            } else {
                return res.status(409).json({message: 'utilisateur inconnue'});
            }
        })
        .catch(function(err) {
            return res.status(500).json ({ message :'Impossible de vérifier l\'utilisateur' + err });
        })
    },


    listMessages: function(req, res) {
        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;

        if ( limit > 50) {
            limit = 50;
        }

        models.Message.findAll ({
            order: [(order != null) ? order.split(':') : ['updatedAt', 'DESC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model : models.User,
                attributes: ['nom', 'prenom']
            }]
        })
        .then(function(messages) {
            if (messages) {
                res.status(200).json(messages);
            } else {
                res.status(404).json ({ message : 'aucun messages trouvé'});
            }
        })
        .catch (function(err) {
            res.status(500).json({message: 'champ incomplet' + err});
        });
    },

    deleteMessage: function(req, res) {

        // récupéréer l'autorisation
        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);

        //Params
        var messageId = req.body.id;
        
        models.Message.findOne({
            where: {id: messageId}
        })


        .then(function(messageFound){
            if(messageFound) {
                //console.log(messageFound);
                var imageUrl = messageFound.image_url;
                //console.log(`images/${imageUrl}`);
                fs.unlink(`${imageUrl}`, () => {
                    messageFound.destroy()
                })
                return res.status(201).json({message: 'message supprimé'});
            }else {
                return res.status(403).json({ message : 'ce message n\'est pas dans notre base de donné'});
            }
        })
        .catch(function(err) {
            return res.status(500).json ({ message : 'impossible de vérifier l\'utilisateur' + err})
        });

    }
    
}