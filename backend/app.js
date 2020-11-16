//Imports
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const messageRoutes = require ('./routes/message');
const likeRoutes = require ('./routes/like');
const commentRoutes = require ('./routes/commentaire')

//Instantiate server
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//BodyParser configuration
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Api routes
app.use('/api', userRoutes);
app.use('/api', messageRoutes);
app.use('/api', likeRoutes);
app.use('/api', commentRoutes);

module.exports = app;