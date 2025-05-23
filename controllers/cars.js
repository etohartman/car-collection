const express = require('express');
const router = express.Router();

// Middleware used to protect routes that need a logged in user
const ensureLoggedIn = require('../middleware/ensure-logged-in');
const Car = require('../models/car');
// index action
// GET /listings
// Non-protected route
router.get('/', async (req, res) => {
  // Thanks to the timestamps option, we can sort by createdAt
  const cars = await Car.find({}).sort('-createdAt');
  res.render('cars/index.ejs', { cars, title: 'All Cars' });
});

// new route/action
// GET /listings/new
// Protected route
router.get('/new', ensureLoggedIn, (req, res) => {
  res.render('cars/new.ejs');
});

// create route/action
// POST /listings
router.post('/', ensureLoggedIn, async (req, res) => {
  try {
    // Be sure to add the owner's/user's ObjectId (_id)
    req.body.owner = req.user._id;
    await Car.create(req.body);
    res.redirect('/cars');
  } catch (err) {
    console.log(err);
    res.redirect('/cars/new');
  }
});

// show route/action
// GET /listings/:id
router.get('/:id', async (req, res) => {
  const car = await Car.findById(req.params.id)
  res.render('cars/show.ejs', { car });
});

router.delete('/:id', ensureLoggedIn, async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.redirect('/cars');
});


module.exports = router;