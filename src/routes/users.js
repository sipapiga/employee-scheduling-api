const express = require('express');

const userRouter = express.Router();
const users = require('../controllers/users');
const { auth, admin } = require('../middleware/authorization');

userRouter.route('/')
  .get(users.getUsers);

userRouter.route('/:id')
  .get(users.getUser)
  .patch(auth, users.updateUser)
  .delete(auth, admin, users.deleteUser);

userRouter.route('/admin/send-schedule').get(auth, admin, users.sendMailtoEmployees);

module.exports = userRouter;
