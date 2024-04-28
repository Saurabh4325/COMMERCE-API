const jwt = require('jsonwebtoken');

const generateRefreshToken = function (id) {
    
// Generate JWT token
const token = jwt.sign({id}, process.env.JWT_SECRET,{ expiresIn: '3d' });
return token;
}
module.exports = generateRefreshToken