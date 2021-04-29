const express = require('express');

const companyRouter = express.Router();
const company = require('../controllers/company');
const { auth } = require('../middleware/authorization');

companyRouter.route('/').post(company.createCompany);
companyRouter.route('/:id')
  .get(auth, company.getPersonsInCompany);
module.exports = companyRouter;
