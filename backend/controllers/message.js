//Import
const models = require ('../models');
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

        //console.log(req);

        if(req.file !== undefined){
            //console.log(req.file);
            image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        }
        //console.log(image);

        if (contenue == null) {
            return res.status(400).json({ msg : 'veuillez ajouter du texte'});
        }

    
        models.User.findOne({
            attributes: ['id', 'nom', 'prenom'],
            where: { id: userId}
        })

        .then(function(user) {
            if(user) {
                //console.log(image);
                models.Message.create({
                        message : contenue,
                        attachement: image,
                        likes : 0,
                        userId: user.id,
                })
                .then(function(newMessage){
                    console.log(newMessage);
                    return res.status(201).json({'messageId' : newMessage});
                })
                .catch(function(err) {
                    return res.status(500).json({msg: 'Impossible d\'ajouter le message' + err});
                })
            } else {
                return res.status(409).json({msg: 'utilisateur inconnue'});
            }
        })
        .catch(function(err) {
            return res.status(500).json ({ msg :'Impossible de vérifier l\'utilisateur' + err });
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
            order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
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
                console.log(messages)
            } else {
                res.status(404).json ({ msg : 'aucun messages trouvé'});
            }
        })
        .catch (function(err) {
            res.status(500).json({msg: 'champ incomplet' + err});
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
                var image = messageFound.attachement;
                //console.log(`images/${image}`);
                fs.unlink(`${image}`, () => {
                    messageFound.destroy()
                })
                return res.status(201).json({msg: 'message supprimé'});
            }else {
                return res.status(403).json({ msg: 'ce message n\'est pas dans notre base de donné'});
            }
        })
        .catch(function(err) {
            return res.status(500).json ({ msg : 'impossible de vérifier l\'utilisateur' + err})
        });

    }
    
}