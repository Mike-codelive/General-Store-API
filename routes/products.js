const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
// const User = require('../models/User');
// const Contact = require('../models/Contact');
// const { check, validationResult } = require('express-validator');

// @route GET api/products
// @desc  Get all products
// @access  Private

router.get('/', (req, res) => {
	res.send('Get All products')
})

// @route POST api/products
// @desc  Post a product
// @access  Private

router.post('/', (req, res) => {
	res.send('Add a Product')
})

// @route PUT api/products/:id
// @desc  Edit a products
// @access  Private

router.put('/:id', (req, res) => {
	res.send('Edit a Product')
})

// @route DELETE api/products/:id
// @desc  Delete a products
// @access  Private

router.delete('/', (req, res) => {
	res.send('delete a Product')
})

module.exports = router