const express = require('express');
const router = express.Router();
// const User = require('../models/User');
// const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config = require('config');

// @route POST api/users
// @desc  Register a user
// @access  Public

router.post('/', (req, res) => {
	res.send('register a user')
})

module.exports = router