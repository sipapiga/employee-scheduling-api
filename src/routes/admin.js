const express = require('express');

const adminRouter = express.Router();
const users = require('../controllers/users');
const schedule = require('../controllers/schedules');

const { auth, admin } = require('../middleware/authorization');

adminRouter.route('/users/:id')
  .delete(auth, admin, users.deleteUser)
  .patch(auth, admin, users.adminUpdateUser);

adminRouter.route('/email').get(auth, admin, users.sendMailtoEmployees);

adminRouter.route('/schedules')
  .post(auth, admin, schedule.createSchedule);

adminRouter.route('/schedules/:id')
  .delete(auth, admin, schedule.deleteSchedule);

module.exports = adminRouter;
