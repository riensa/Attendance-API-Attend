// routes/index.js
const express = require('express');
require('express-group-routes');

// Import routes
const AttendRoute = require('./attend.route');

const router = express.Router();

router.use('/attend', AttendRoute);

// 404
router.use("/", (req, res, next) => {
  res.status(404).json({
		status: 404,
		success: false,
		message: 'Not Found',
		errors: 'Not Found'
	})
})

module.exports = router;