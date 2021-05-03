const { companyModel } = require('../models/Company');
const ErrorResponse = require('../utils/errorResponse');

const companyController = {
  async createCompany(req, res, next) {
    try {
      const company = await companyModel.createCompany(req.body);
      res.status(201).json({
        success: true,
        data: company,
      });
    } catch (e) {
      next(e);
    }
  },
  async getPersonsInCompany(req, res, next) {
    console.log(req.params.id);
    try {
      // eslint-disable-next-line no-underscore-dangle
      const adminCompanyId = req.user.company;
      console.log(adminCompanyId);
      if (!adminCompanyId) {
        return next(new ErrorResponse('not authorize to access this route', 401));
      }
      if (adminCompanyId === req.params.id) {
        const employees = await companyModel.getPersonsInCompany(req.params.id);
        res.status(200).json({
          success: true,
          data: employees,
        });
      } else {
        return next(new ErrorResponse('not authorize to access this route', 403));
      }
    } catch (e) {
      next(e);
    }
  },
};
module.exports = companyController;
