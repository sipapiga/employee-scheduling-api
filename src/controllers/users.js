const sgMail = require('@sendgrid/mail');
const { userModel } = require('../models/User');
const { companyModel } = require('../models/Company');
const { scheduleModel } = require('../models/Schedule');
const ErrorResponse = require('../utils/errorResponse');
const Mailer = require('../services/Mailer');
const newUserCreatedMailTemplate = require('../services/emailTemplates/newUserCreatedMailTemplate');
const newUserPublicCreatedMailTemplate = require('../services/emailTemplates/newUserPublicCreatedMailTemplate');
const scheduleNotificationMailTemplate = require('../services/emailTemplates/scheduleNotificationMailTemplate');

const userController = {
  async registerUser(req, res, next) {
    try {
      const user = await userModel.createUser(req.body);
      const admin = req.user;
      await companyModel.addEmpoyeeToCompany({ id: req.body.company, employees: user });
      sgMail.setApiKey(process.env.SENDGRID_KEY);
      const msg = {
        to: `${user.email}`,
        from: 'admin@hourhub.se',
        subject: 'Skapa ett lösenord för att komma igång',
        html: newUserCreatedMailTemplate({ user, admin }),
      };
      sgMail
        .send(msg)
        .then(() => {
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            const { response } = error;
            const { body } = response;
            console.error(body);
          }
        });
      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (e) {
      next(e);
    }
  },
  async registerUserPublic(req, res, next) {
    try {
      const user = await userModel.createUser(req.body);
      const company = await companyModel.addEmpoyeeToCompany({ id: req.body.company, employees: user });
      const companyName = company.name;
      sgMail.setApiKey(process.env.SENDGRID_KEY);
      const msg = {
        to: `${user.email}`,
        from: 'admin@hourhub.se',
        subject: 'Skapa ett lösenord för att komma igång',
        html: newUserPublicCreatedMailTemplate({ user, companyName }),
      };
      sgMail
        .send(msg)
        .then(() => {
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            const { response } = error;
            const { body } = response;
            console.error(body);
          }
        });
      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (e) {
      next(e);
    }
  },
  // eslint-disable-next-line consistent-return
  async authenticateUser(req, res, next) {
    try {
      const { email } = req.body;
      const { password } = req.body;
      if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
      }
      const result = await userModel.authenticateUser(email.toLowerCase(), password);
      if (!result.loggedIn) return next(new ErrorResponse(result.message, 401));

      res.status(200).json({
        success: result.loggedIn,
        token: result.token,
      });
    } catch (e) {
      next(e);
    }
  },
  async activateUser(req, res, next) {
    try {
      const resultUser = await userModel.activatePassword(req.params.id, req.body);
      const result = await userModel.authenticateUser(resultUser.email, req.body.password);
      if (result.loggedIn) {
        res.status(200).json({
          success: result.loggedIn,
          token: result.token,
        });
      }
      return;
    } catch (e) {
      next(e);
    }
  },
  async sendMailtoEmployees(req, res, next) {
    try {
      const companyId = req.user.company;
      const users = await companyModel.getPersonsInCompany(companyId);
      const userData = users.employees.map((user) => user);
      const payload = {
        user: userData,
        admin: req.user,
      };
      const mailer = new Mailer(users.employees, scheduleNotificationMailTemplate(payload));

      mailer
        .send()
        .then(() => {
          res.status(200).json({
            success: true,
          });
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            const { response } = error;
            const { body } = response;
            console.error(body);
          }
        });
    } catch (e) {
      next(e);
    }
  },
  // eslint-disable-next-line consistent-return
  async getUsers(req, res, next) {
    try {
      const users = await userModel.getUsers();
      if (!users) {
        return next(new ErrorResponse('Users not found', 404));
      }

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (e) {
      next(e);
    }
  },
  // eslint-disable-next-line consistent-return
  async getUser(req, res, next) {
    try {
      const user = await userModel.getUser(req.params.id);
      if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (e) {
      next(e);
    }
  },
  // eslint-disable-next-line consistent-return
  async updateUser(req, res, next) {
    try {
      if (req.user.id !== req.params.id) {
        return next(new ErrorResponse('Not authorize to access this route', 403));
      }
      const user = await userModel.updateUser(req.params.id, req.body);
      if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (e) {
      next(e);
    }
  },
  // eslint-disable-next-line consistent-return
  async deleteUser(req, res, next) {
    try {
      await userModel.deleteUser(req.params.id);
      await companyModel.removeEmpoyeeFromCompany(req.param.id);
      await scheduleModel.deleteUserSchedules(req.params.id);

      res.status(200).json({
        success: true,
        message: 'User Deleted',
      });
    } catch (e) {
      next(e);
    }
  },
  async me(req, res, next) {
    try {
      const user = await userModel.getUser(req.user.id);
      if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
      }
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  },
};
module.exports = userController;
