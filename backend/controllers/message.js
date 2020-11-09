//Import
const models = require ('../models');
const asyncLib = require ('async');
var jwtUtils = require ('../utils/jwtutils');

module.exports = {
    createMessage: function(req, res) {

         //recupérer l'autorisation
         var headerAuth = req.headers['authorization'];
         var userId = jwtUtils.getUserId(headerAuth);

         //paramètres

         var message = req.body.message;
         var imagealt = req.body.image_alt;
         var imageurl = req.body.image_url;

         if (message == null) {
             return res.status(400).json({ 'error' : 'veuillez ajouter du texte'});
         }

         if (message.lenght <= 2) {
             return res.status(400).json ({'error' : 'votre message doit contenir au moins trois caractères'});
         }

         asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    where: { id: userId }
                })
                .then(function(userFound){
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error' : 'impossible de vérifier l\'utilisateur' });
                });

            },

            function (userFound, done) {
                if (userFound) {
                    models.Message.create({
                        message : message,
                        imagealt: imagealt,
                        imageurl : imageurl,
                        likes : 0,
                        UserId: userFound.id
                    })
                    .then(function(newMessage) {
                        done(newMessage);
                    })
                } else {
                    res.status(400).json ({ 'error' : 'Utilisteur non trouvé'});
                }
            },
             
        ]), function (newMessage) {
            if (newMessage) {
                return res.status(201).json(newMessage);
            } else {
                return res.status(500).json({ 'error' : 'Impossible de poster le message!'});
            } 
         }

    },
    listMessage: function(req, res) {
        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;

        models.Message.findAll ({
            order: [(order != null) ? order.split (':') : ['message', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model : models.User,
                attributes: ['nom', 'prenom']
            }]
        })
        .then(function(message) {
            if (message) {
                res.status(200).json(message);
            } else {
                res.status(404).json ({ 'error' : 'aucun message trouvé'});
            }
        })
        .catch (function(err) {
            console.log(err);
            res.status(500).json({'error': 'champ incomplet'});
        })

    }
}