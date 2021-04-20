const { userModel } = require('../models/User');
const { companyModel } = require('../models/Company');
const ErrorResponse = require('../utils/errorResponse');

const userController = {
  async registerUser(req, res, next) {
    try {
      const user = await userModel.createUser(req.body);
      await companyModel.addEmpoyeeToCompany({ id: req.body.company_id, employees: user });
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
      const result = await userModel.authenticateUser(email, password);
      if (!result.loggedIn) return next(new ErrorResponse(result.message, 401));

      res.status(200).json({
        success: result.loggedIn,
        token: result.token,
        user: result.user,
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
      const user = await userModel.deleteUser(req.params.id);

      res.status(200).json({
        success: true,
        message: 'User Deleted',
      });
      if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
      }
    } catch (e) {
      next(e);
    }
  },
};
module.exports = userController;
