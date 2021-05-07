const mongoose = require('mongoose');

const schema = {
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  start: Date,
  end: Date,
  color: {
    type: String,
    default: '#d50000',
  },
  extra: {
    type: Boolean,
    default: false,
  },
};
const scheduleSchema = new mongoose.Schema(schema, { timestamps: true });

const Schedule = mongoose.model('Schedule', scheduleSchema);

const scheduleModel = {
  async createSchedule(data) {
    console.log(data);
    try {
      const schedule = {
        employee: data.employee,
        start: data.start,
        end: data.end,
        color: data.color,
        extra: data.extra,
      };
      return await Schedule.create(schedule);
    } catch (e) {
      console.error(e); throw e;
    }
  },
  async getSchedules() {
    try {
      // eslint-disable-next-line max-len
      return await Schedule.find().populate('employee');
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  async deleteUserSchedules(userId) {
    try {
      return await Schedule.deleteMany({ employee: userId }, { multi: true });
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  async deleteSchedule(id) {
    try {
      return await Schedule.deleteOne({ _id: id });
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  async updateSchedule(id, payload) {
    try {
      return await Schedule.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    } catch (e) {
      console.error(e);
      return false;
    }
  },
};

module.exports = { Schedule, scheduleModel };
