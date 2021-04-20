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
};
module.exports = companyController;
