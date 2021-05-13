const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// const User = require('../models/User');
const Products = require('../models/product');
const { check, validationResult } = require('express-validator');

// @route GET api/products
// @desc  Get all products
// @access  Public

router.get('/', async (req, res) => {
	// res.send('Get All products')
	try {
		const product = await Products.find()
		res.json(product);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error "products"');
	}
})

// @route POST api/products
// @desc  Post a product
// @access  Private

router.post(
	'/',
	[
	auth,
	[
	check('name', 'Name is required')
	.not()
	.isEmpty()
	]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, photo, type, stock, description } = req.body;

		try {
			const newProduct = new Products({
				name,
				photo,
				stock,
				type,
				description,
			});

			const product = await newProduct.save();
			res.json(product);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error post product');
		}
	}
	);

// @route PUT api/products/:id
// @desc  Edit a products
// @access  Private

router.put('/:id', auth, async (req, res) => {
	const { name, photo, stock, type, description } = req.body;

  //build contact object based on fields that are submitted
  const productFields = {};
  if (name) productFields.name = name;
  if (photo) productFields.photo = photo;
  if (stock) productFields.stock = stock;
  if (type) productFields.type = type;
  if (description) productFields.description = description;

  try {
  	let product = await Products.findById(req.params.id);

    //if the contact isnt found
    if (!product) return res.status(404).json({ msg: 'Contact not found' });

    // // make sure user owns contact
    // if (product.user.toString() !== req.user.id) {
    // 	return res.status(401).json({ msg: 'Not authorised' });
    // }

    product = await Products.findByIdAndUpdate(
    	req.params.id,
    	{ $set: productFields },
    	{ new: true }
    	);

    res.json(product);
  } catch (err) {
  	console.error(err.message);
  	res.status(500).send('Server Error update Product');
  }
});

// @route DELETE api/products/:id
// @desc  Delete a products
// @access  Private

router.delete('/:id', auth, async (req, res) => {
	try {
    // find the contact by the id passed in the request parameters
    let product = await Products.findById(req.params.id)

    //if the product isnt found
    if (!product) return res.status(404).json({ msg: 'product not found' })

    // // make sure user owns product
    // if (product.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: 'Not authorised' });
    // }

    //dont use delete method as its deprecated
    await Products.findByIdAndRemove(req.params.id)

    res.json({ msg: 'Product Removed' })
  } catch (err) {
  	console.error(err.message)
  	res.status(500).send('Server Error')
  }
});

module.exports = router