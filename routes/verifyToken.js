const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('auth-token');

  /** Session based ip */
  console.log(`Remote IP: ${req.socket.remoteAddress}`);
  //   console.log(`X-Forwarded-For: ${req.headers['X-Forwarded-For']}`); //Not working
  /** Public ip */
  console.log(`IP: ${req.ip}`);

  if (!token) return res.status(401).json({ error: 'Access Denied' });

  jwt.verify(token, process.env.TOKEN_SECRET, (error, payload) => {
    if (error) return res.status(400).json({ error: 'Invalid token', messsage: error.messsage });

    console.log(payload);

    if (payload.ip == req.ip) {
      req.user = payload;
      next();
    } else {
      return res.status(400).json({ error: 'Invalid token zone' });
    }
  });
}

module.exports = auth;
