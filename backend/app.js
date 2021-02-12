//Imports
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const messageRoutes = require ('./routes/message');
const commentRoutes = require ('./routes/commentaire')
const path = require('path');
const cors = require('cors')

//Instantiate server
const app = express();


app.use(cors())

/*app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});*/

//BodyParser configuration
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

//Api routes
app.use('/api', userRoutes);
app.use('/api', messageRoutes);
app.use('/api', commentRoutes);



module.exports = app;