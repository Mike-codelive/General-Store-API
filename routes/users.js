const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route POST api/users
// @desc  Register a user
// @access  Public

router.post('/',
	[
	check('name', 'name is required')
	.not()
	.isEmpty(),
	check('email', 'please provide a valid email').isEmail(),
	check('password', 'please enter a password with 6 or more caracters').isLength({ min: 6 })
	],

	async (req, res) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

      // check to see if the user already exists
      if (user) {
      	return res.status(400).json({ msg: 'User already exists' });
      }

      // new User model from params
      user = new User({
      	name,
      	email,
      	password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      // res.send('register a user')

      const payload = {
      	user: {
      		id: user.id
      	}
      };

      const jwtSecret = config.get('jwtSecret');

      jwt.sign(
      	payload,
      	jwtSecret,
      	{
      		expiresIn: 50000
      	},
      	(err, token) => {
      		if (err) throw err;
      		res.json({ token });
      	}
      	);

    } catch (err) {
    	console.error(err.message);
    	res.status(500).send('Server Error');
    }})


module.exports = router