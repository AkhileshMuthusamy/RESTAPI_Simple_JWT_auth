const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('auth-token');

  console.log(`Remote Port: ${req.socket.remotePort}`);
  console.log(`Remote IP: ${req.socket.remoteAddress}`);
  console.log(`X-Forwarded-For: ${req.headers['X-Forwarded-For']}`);
  console.log(`IP: ${req.ip}`);

  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(verified);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
}

module.exports = auth;
