//Import
const models = require ('../models');
const asyncLib = require ('async');
var jwtUtils = require ('../utils/jwtutils');
const message = require('./message');
const user = require('../models/user');

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

        .then(function(user) {
            if (user) {
                var newCommentaire = models.Commentaire.create({
                    commentaire: contenue,
                    userId: user.id,
                    messageId: messageId
                })
                .then(function(newCommentaire){
                    //console.log(newCommentaire);
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
            where: ({messageId: req.params.messageId}),
            include: [
                {
                    model : models.User,
                    as : 'user',
                    attributes: ['nom','prenom']
                },
                {
                    model : models.Message,
                    as: 'message',
                    attributes: ['id']
                }
            ]

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
            res.status(500).json({ msg: 'champ incomplet' + err });
        })

    },

    deleteComments: function(req, res) {

        // récupéréer l'autorisation
        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);

        //Params

        //console.log(user.id);
        
        models.Commentaire.findOne({
            where: {id: req.params.id}
        }) 


        .then(function(commentsFound){
            if(commentsFound) {

                var isAdmin = req.body.isAdmin;
                
                if (isAdmin === 1 || commentsFound.userId === userId ){
                    
                    commentsFound.destroy();

                    return res.status(201).json({msg: 'commentaire supprimé'});
                }else {
                    return res.status(403).json({msg: 'vous n\'êtes pas autorisé à supprimer ce commentaire'})
                }
                
            }else {
                return res.status(403).json({ msg: 'ce commentaire n\'est pas dans notre base de donné' +err });
            }
        })
        .catch(function(err) {
            return res.status(500).json ({ msg : 'impossible de vérifier l\'utilisateur' + err})
        });

    }
}