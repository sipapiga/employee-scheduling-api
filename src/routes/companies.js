const express = require('express');

const companyRouter = express.Router();
const company = require('../controllers/company');

companyRouter.route('/').post(company.createCompany);
module.exports = companyRouter;
