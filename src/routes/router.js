const express = require('express');

const router = express.Router();

const users = require('./users');
const auth = require('./auth');
const companies = require('./companies');
const schedules = require('./schedules');
const admin = require('./admin');

router.use('/api/users', users);
router.use('/api/auth', auth);
router.use('/api/companies', companies);
router.use('/api/schedules', schedules);
router.use('/api/admin', admin);

module.exports = router;
