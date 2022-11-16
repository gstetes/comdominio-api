const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401)
      .json({ error: 'No token provided.' });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401)
      .json({ error: 'Token error' });
  }

  const token = parts[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401)
        .json({ error: 'Invalid token.' });
    };

    req.userId = decoded.id;
    return next();
  });
};