const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('auth-token');
  var host = req.headers.host;
  var origin = req.headers.origin;
  console.log(`Local Port: ${req.socket.localPort}`);
  console.log(`Remote Port: ${req.socket.remotePort}`);
  console.log(`user IP: ${req.socket.remoteAddress}`);
  console.log(`Local IP: ${req.socket.localAddress}`);
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
