const mongoose = require('mongoose');

const schema = {
  name: {
    type: String,
    required: [true, 'Please add a company name'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Please add a company address'],
  },
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
};
const companySchema = new mongoose.Schema(schema, { timestamps: true });

const Company = mongoose.model('Company', companySchema);

const companyModel = {
  async createCompany(data) {
    try {
      const company = {
        employees: [],
        name: data.name,
        address: data.address,
      };
      return await Company.create(company);
    } catch (e) {
      console.error(e); throw e;
    }
  },
  async addEmpoyeeToCompany(company) {
    try {
      // eslint-disable-next-line max-len
      return await Company.findOneAndUpdate({ _id: company.id }, { $push: { employees: company.employees } }, {
        new: true,
        runValidators: true,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  async removeEmpoyeeFromCompany(id) {
    try {
      // eslint-disable-next-line max-len
      return await Company.findOneAndUpdate({ employees: id }, { pull: { employees: id } }, {
        new: true,
        runValidators: true,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  async getPersonsInCompany(id) {
    console.log(id);
    try {
      return await Company.findById({ _id: id }).populate('employees');
    } catch (e) {
      console.error(e);
    }
  },
};

module.exports = { Company, companyModel };
