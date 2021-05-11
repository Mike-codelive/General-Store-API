const express = require('express');
const router = express.Router();
// const User = require('../models/User');
// const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config = require('config');
// const auth = require('../middleware/auth');


// @route GET api/auth
// @desc  Get logged in user
// @access  Private

router.get('/', (req, res) => {
	res.send('Get loggedin user')
})

// @route POST api/auth
// @desc  Get logged in user
// @access  Private

router.post('/', (req, res) => {
	res.send('log in user')
})

module.exports = router