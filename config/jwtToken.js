const jwt = require('jsonwebtoken');

const generateToken = function (id) {
    
// Generate JWT token
const token = jwt.sign({id}, process.env.JWT_SECRET,{ expiresIn: '1d' });
return token;
}
module.exports = generateToken