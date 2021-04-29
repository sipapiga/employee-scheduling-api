const express = require('express');

const scheduleRouter = express.Router();
const schedule = require('../controllers/schedules');
const { auth } = require('../middleware/authorization');

scheduleRouter.route('/')
  .post(auth, schedule.createSchedule)
  .get(auth, schedule.getSchedules);

module.exports = scheduleRouter;
