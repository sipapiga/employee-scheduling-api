const jwt = require('jsonwebtoken');
require('dotenv').config();
const ErrorResponse = require('../utils/errorResponse');

async function auth(req, res, next) {
  console.log(req.user);
  if (!req.headers.authorization) return res.sendStatus(403);
  const token = req.headers.authorization.replace('Bearer ', '');
  if (!token) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }
  try {
    console.log(token);
    console.log(process.env.JWT_SECRET);
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedUser;
    return next();
  } catch (e) {
    console.error(e);
    return next(new ErrorResponse('Not authorize to access this route', 402));
  }
}
module.exports = { auth };
