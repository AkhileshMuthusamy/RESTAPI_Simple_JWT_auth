const jwt = require('jsonwebtoken');

function signToken(payload) {
  /**
   * Create and assign a token
   * expiresIn: seconds
   */
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 60 * 1 }, (error, token) => {
      if (error) reject(error);

      jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 60 * 3 }, (error, refreshToken) => {
        if (error) reject(error);

        resolve({
          success: true,
          token: `Bearer ${token}`,
          refreshToken: `Bearer ${refreshToken}`
        });
      });
    });
  });
}

module.exports = signToken;
