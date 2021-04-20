const express = require('express');

const authRouter = express.Router();
const users = require('../controllers/users');

authRouter.route('/login').post(users.authenticateUser);
authRouter.route('/register').post(users.registerUser);

module.exports = authRouter;
