const jwt = require('jsonwebtoken');
require('dotenv').config();
const ErrorResponse = require('../utils/errorResponse');

function auth(req, res, next) {
  if (!req.headers.authorization) return res.sendStatus(403);
  const token = req.headers.authorization.replace('Bearer ', '');
  if (!token) {
    return next(new ErrorResponse('You need to login', 401));
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SERCET);
    req.user = payload;
    return next();
  } catch (e) {
    return next();
  }
}
module.exports = { auth };
