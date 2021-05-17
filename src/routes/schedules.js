const express = require('express');

const scheduleRouter = express.Router();
const schedule = require('../controllers/schedules');
const { auth } = require('../middleware/authorization');

scheduleRouter.route('/')
  .get(auth, schedule.getSchedules);

scheduleRouter.route('/:id')
  .patch(auth, schedule.updateSchedule);

module.exports = scheduleRouter;
