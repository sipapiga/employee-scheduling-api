const express = require('express');

const userRouter = express.Router();
const users = require('../controllers/users');
const { auth } = require('../middleware/authorization');

userRouter.route('/')
  .get(users.getUsers);

userRouter.route('/:id')
  .get(users.getUser)
  .patch(auth, users.updateUser)
  .delete(auth, users.deleteUser);

module.exports = userRouter;
