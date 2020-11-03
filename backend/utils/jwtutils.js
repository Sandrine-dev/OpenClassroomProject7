//Imports
const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '1Jebau59jyeDG83F4sfrbsu70sdfseFHH56148Ashulae78vsDeb';

//Export
module.exports = {
  generateTokenForUser: function(userData){
      return jwt.sign({
          userId: userData.id
      },
      JWT_SIGN_SECRET,
      {
          expiresIn: '12h'
      })
  }
};