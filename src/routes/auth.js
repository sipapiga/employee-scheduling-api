const express = require('express');

const authRouter = express.Router();
const users = require('../controllers/users');
const { auth } = require('../middleware/authorization');

authRouter.route('/login').post(users.authenticateUser);
authRouter.route('/register').post(users.registerUser);
authRouter.route('/me').get(auth, users.me);

module.exports = authRouter;
