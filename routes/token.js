const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ error: 'Access Denied' });

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, payload) => {
    if (error) return res.status(400).json({ error: 'Invalid token', message: error.message });

    console.log(payload);

    if (payload.ip == req.ip) {
      res.status(200).json({ token: 'token' });
    } else {
      return res.status(400).json({ error: 'Invalid token zone' });
    }
  });
});

module.exports = router;
