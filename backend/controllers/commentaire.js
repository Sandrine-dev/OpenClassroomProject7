//Import
const models = require ('../models');
const asyncLib = require ('async');
var jwtUtils = require ('../utils/jwtutils');
const message = require('./message');

module.exports = {
    createCommentaire: function(req, res) {

        //recupérer l'autorisation
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        //Paramètres
        var contenue = req.body.commentaire;
        var messageId = req.params.messageId;
        //console.log(messageId);

        if (contenue == null) {
            return res.status(400).json({ msg : 'veuillez ajouter du texte' + err});
        }

        models.User.findOne({
            attributes: ['id'],
            where: {id: userId}
        })

        .then(function(userFound) {
            if (userFound) {
                var newCommentaire = models.Commentaire.create({
                    commentaire: contenue,
                    userId: userFound.id,
                    messageId: messageId
                })
                .then(function(newCommentaire){
                    return res.status(201).json({'commentaireId' : newCommentaire.id});
                })
                .catch(function(err) {
                    return res.status(500).json({msg : 'impossible d\'ajouter le commentaires' + err})
                })
            }else {
                return res.status(409).json({msg: 'Utilateur introuvable' });
            }
        })
        .catch(function(err){
            return res.status(500).json({ msg : 'impossible de vérifier l\'utilisateur' + err});
        })


    },

    listCommentaire: function(req, res) {
        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;

        if( limit > 50) {
            limit = 50;
        }
        
        models.Commentaire.findAll ({
            order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model : models.User,
                attributes: ['nom', 'prenom']
            }]
        })
        .then(function(commentaires) {
            if (commentaires) {
                res.status(200).json(commentaires);
            } else {
                res.status(404).json ({ msg : 'aucun commentaires trouvé'});
            }
        })
        .catch (function(err) {
            //console.log(err);
            res.status(500).json({ msg: 'champ incomplet' +err });
        })

    }
}

/* 
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        //Paramètres
        var contenue = req.body.commentaire;

        if (contenue == null) {
            return res.status(400).json({ 'error' : 'veuillez ajouter du texte'});
        }

        models.User.findOne({
            attributes: ['id'],
            where: { id: userId}
        })

        models.Message.findOne({
            attributes['id'],
            where: { id: messageId}
        })

        .then(function(user, message, done) {
            if(user && message) {
                var newCommentaire = models.Message.create({
                    commentaire: contenue,
                    messageId: messageFound.id,
                    userId: userFound.id
                })
                .then(function(newCommentaire){
                    return res.status(201).json({newCommentaire})
                })
                .catch(function(err) {
                    return res.status(500).json({'error': 'Impossible d\'ajouter le commenaitre'})
                })
            } else {
                return res.status(409).json({'error': 'message ou utilisateurs inexistatn'})
            }
        })
        .catch(function(err) {
            return res.status(500).json ({ 'error' })
        })
*/