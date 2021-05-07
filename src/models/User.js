const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = {
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 6,
    default: '123456',
    trim: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  role: {
    type: String,
    default: 'employee',
  },
  color: {
    type: String,
    default: '#afb42b',
  },
};
const userSchema = new mongoose.Schema(schema, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

const User = mongoose.model('User', userSchema);

const userModel = {
  async createUser(user) {
    try {
      return User.create(user);
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  async getUsers() {
    try {
      return await User.find().populate('company');
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  async getUser(id) {
    try {
      return await User.findById({ _id: id }).populate('company');
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  async updateUser(id, payload) {
    try {
      return await User.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).populate('company');
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  async deleteUser(id) {
    try {
      return await User.deleteOne({ _id: id });
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  async getUserByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  async authenticateUser(email, password) {
    console.log(email, password);
    try {
      const user = await User.findOne({ email }).populate('company').select('+password');
      console.log(user);
      if (!user) {
        return { loggedIn: false, message: 'Invalid Password or Email' };
      }
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword) return { loggedIn: false, message: 'Invalid Credentials' };

      const token = await userModel.generateAuthToken(user);
      return { loggedIn: true, token };
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  async activatePassword(id, payload) {
    try {
      const { password } = payload;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      return await User.findByIdAndUpdate(id, { password: hashPassword },
        { new: true, runValidators: true }).select('+password');
    } catch (e) {
      console.error(e);
    }
  },
  async generateAuthToken(user) {
    console.log(user);
    return jwt.sign({
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
      name: user.name,
      role: user.role,
      company: user.company._id,
      companyName: user.company.name,
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
  },
};

module.exports = { User, userModel };
