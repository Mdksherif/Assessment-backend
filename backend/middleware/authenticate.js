// middleware/authenticate.js
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Access denied. No token provided...');
    }
    jwt.verify(token, 'qwertythesecretkey', (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        req.user = decoded;
        next();
    });
}

module.exports = authenticate;
