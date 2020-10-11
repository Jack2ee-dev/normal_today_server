const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../constants/jwt.json');

module.exports = (req, res, next) => {
  try {
    const authToken = req
      .get('Authorization')
      .split(' ')[1];
    const decodedAuthToken = jwt.verify(
      authToken,
      JWT_SECRET_KEY
    );

    req.userId = decodedAuthToken.userId;
    next();
  } catch (error) {
    error.message = '유효한 토큰이 아닙니다.';
    throw error;
  }
};
