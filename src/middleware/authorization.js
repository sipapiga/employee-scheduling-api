const jwt = require('jsonwebtoken');
require('dotenv').config();
const ErrorResponse = require('../utils/errorResponse');

async function auth(req, res, next) {
  if (!req.headers.authorization) return res.sendStatus(403);
  const token = req.headers.authorization.replace('Bearer ', '');
  if (!token) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }
  try {
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedUser;
    return next();
  } catch (e) {
    console.error(e);
  }
}
async function admin(req, res, next) {
  try {
    if (req.user.role === 'admin' || req.user.role === 'superadmin') {
      return next();
    }
    return next(new ErrorResponse('Not authorize to access this route', 401));
  } catch (e) {
    console.error(e);
  }
}
module.exports = { auth, admin };
