const jwt = require("jsonwebtoken");
const jwtUtils = require("../utils/jwtutils");

module.exports = (req, res, next) => {
  try {

    const token = req.headers.authorization;

    const userId = jwtUtils.getUserId(token);
    
    if ( userId === -1) {
      //console.log('je suis pas identifié')
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request !"),
    });
  }
};
