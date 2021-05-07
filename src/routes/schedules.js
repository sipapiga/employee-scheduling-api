const express = require('express');

const scheduleRouter = express.Router();
const schedule = require('../controllers/schedules');
const { auth, admin } = require('../middleware/authorization');

scheduleRouter.route('/')
  .post(auth, admin, schedule.createSchedule)
  .get(auth, schedule.getSchedules);

scheduleRouter.route('/:id')
  .delete(auth, admin, schedule.deleteSchedule)
  .patch(auth, schedule.updateSchedule);

module.exports = scheduleRouter;
