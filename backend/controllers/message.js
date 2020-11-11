//Import
const models = require ('../models');
const asyncLib = require ('async');
var jwtUtils = require ('../utils/jwtutils');

module.exports = {
    createMessage: function(req, res) {

        //recupérer l'autorisation
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        //Paramètres
        var contenue = req.body.message;
        var imagealt = req.body.image_alt;
        var imageurl = req.body.image_url;

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
                var newMessage = models.Message.create({
                        userId: user.id,
                        message : contenue,
                        imagealt: imagealt,
                        imageurl : imageurl,
                        likes : 0,
                })
                .then(function(newMessage){
                    return res.status(201).json({newMessage});
                })
                .catch(function(err) {
                    return res.status(500).json({'error': 'Impossible d\'ajouter le commenaitre' + err});
                })
            } else {
                return res.status(409).json({'error': 'utilisateur inconnue'});
            }
        })
        .catch(function(err) {
            return res.status(500).json ({ 'error' :'Impossible de vérifier l\'utilisateur' });
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
                res.status(404).json ({ 'error' : 'aucun messages trouvé'});
            }
        })
        .catch (function(err) {
            res.status(500).json({'error': 'champ incomplet' + err});
        });
    }
}