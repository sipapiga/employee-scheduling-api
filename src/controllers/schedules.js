const { scheduleModel } = require('../models/Schedule');
const ErrorResponse = require('../utils/errorResponse');

const scheduleController = {
  async createSchedule(req, res, next) {
    try {
      const schedule = await scheduleModel.createSchedule(req.body);
      res.status(201).json({
        success: true,
        data: schedule,
      });
    } catch (e) {
      next(e);
    }
  },
  async getSchedules(req, res, next) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const schedules = await scheduleModel.getSchedules();
      if (!schedules) {
        return next(new ErrorResponse('Schedules not found', 404));
      }
      res.status(200).json({
        success: true,
        data: schedules,
      });
    } catch (e) {
      next(e);
    }
  },
};
module.exports = scheduleController;
