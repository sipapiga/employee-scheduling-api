const express = require('express');

const router = express.Router();

const users = require('./users');
const auth = require('./auth');
const companies = require('./companies');

router.use('/api/users', users);
router.use('/api/auth', auth);
router.use('/api/companies', companies);

module.exports = router;
