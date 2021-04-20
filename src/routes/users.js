const express = require('express');

const userRouter = express.Router();
const users = require('../controllers/users');

userRouter.route('/')
  .get(users.getUsers);

userRouter.route('/:id')
  .get(users.getUser)
  .patch(users.updateUser)
  .delete(users.deleteUser);

module.exports = userRouter;
