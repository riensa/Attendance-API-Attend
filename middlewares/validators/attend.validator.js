const {check, validationResult} = require('express-validator');

exports.validateSessionAdmin = [
	(req, res, next) => {
		// check auth
		if(!req.user || req.user.group !== 'A') {
			return res.status(403).json({
				status: 403,
				success: false,
				message: 'Unauthorised Access',
				errors: 'Unauthorised Access'
			});
		}
		next();
	},
];

exports.validateSessionEmployee = [
    (req, res, next) => {
			// check auth
			if(!req.user || req.user.group !== 'E') {
				return res.status(403).json({
					status: 403,
					success: false,
					message: 'Unauthorised Access',
					errors: 'Unauthorised Access'
				});
			}
			next();
  },
];

exports.validateReport = [
	check('type')
		.if((value) => value.length > 0)
		.trim()
		.escape()
		.bail()
		.isIn(['Attend', 'Absent', 'On Leave', 'Sick Leave'])
		.withMessage('Invalid Type'),
	check('startdate')
		.if((value) => value.length > 0)
		.trim()
		.escape()
		.isDate()
		.withMessage('Start Date must be date'),
	check('enddate')
		.if((value) => value.length > 0)
		.trim()
		.escape()
		.isDate()
		.withMessage('End Date must be date'),
	check('employee_name')
		.if((value) => value.length > 0)
		.trim()
		.escape()
		.isLength({min:3})
		.withMessage('Employee Name must be minimum 3 characters long')
		.bail(),
	(req, res, next) => {

		// check auth
		if(!req.user || req.user.group !== 'A') {
			return res.status(403).json({
				status: 403,
				success: false,
				message: 'Unauthorised Access',
				errors: 'Unauthorised Access'
			});
		}

		const errors = validationResult(req);
		if (!errors.isEmpty())
		return res.status(400).json({
			status: 400,
			success: false,
			message: "Validation Error",
			errors: errors.array()
		});
			next();
},
];

exports.validateMonthlyAttendance = [
	check('month')
		.if((value) => value.length > 0)
		.trim()
		.escape()
		.isNumeric()
		.withMessage('Invalid Month')
		.bail()
		.exists()
		.custom((value, { req }) => value >= 1 && value <= 12)
		.withMessage('Invalid Month'),
	check('year')
		.if((value) => value.length > 0)
		.trim()
		.escape()
		.isNumeric()
		.withMessage('Invalid Year'),
	(req, res, next) => {

		// check auth
		if(!req.user || req.user.group !== 'E') {
			return res.status(403).json({
				status: 403,
				success: false,
				message: 'Unauthorised Access',
				errors: 'Unauthorised Access'
			});
		}

		const errors = validationResult(req);
		if (!errors.isEmpty())
		return res.status(400).json({
			status: 400,
			success: false,
			message: "Validation Error",
			errors: errors.array()
		});
			next();
},
];

exports.validateAttendance = [
	check('type')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('Type can not be empty!')
		.bail()
		.isIn(['Attend', 'Absent', 'On Leave', 'Sick Leave'])
		.withMessage('Invalid Type'),
	check('date')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('Date can not be empty!')
		.bail()
		.isDate()
		.withMessage('Date must be in date format'),
	check('starttime')
		.if((value, { req }) => req.body.type == 'Attend')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('Start Time can not be empty!'),
	check('endtime')
		.if((value, { req }) => req.body.type == 'Attend')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('Start Time can not be empty!'),
	check('description')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('Description can not be empty!'),

	(req, res, next) => {
		// check auth
		if(!req.user || req.user.group !== 'E') {
			return res.status(403).json({
				status: 403,
				success: false,
				message: 'Unauthorised Access',
				errors: 'Unauthorised Access'
			});
		}

		const errors = validationResult(req);
		if (!errors.isEmpty())
		return res.status(400).json({
			status: 400,
			success: false,
			message: "Validation Error",
			errors: errors.array()
		});
			next();
	},
];

exports.validateAttendanceUpdate = [
	check('id')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('ID can not be empty!')
		.bail()
		.isNumeric()
		.withMessage('ID must be Numeric'),
	check('type')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('Type can not be empty!')
		.bail()
		.isIn(['Attend', 'Absent', 'On Leave', 'Sick Leave'])
		.withMessage('Invalid Type'),
	check('starttime')
		.if((value, { req }) => req.body.type == 'Attend')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('Start Time can not be empty!'),
	check('endtime')
		.if((value, { req }) => req.body.type == 'Attend')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('Start Time can not be empty!'),
	check('description')
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage('Description can not be empty!'),

	(req, res, next) => {
		// check auth
		if(!req.user || req.user.group !== 'E') {
			return res.status(403).json({
				status: 403,
				success: false,
				message: 'Unauthorised Access',
				errors: 'Unauthorised Access'
			});
		}

		const errors = validationResult(req);
		if (!errors.isEmpty())
		return res.status(400).json({
			status: 400,
			success: false,
			message: "Validation Error",
			errors: errors.array()
		});
			next();
	},
];
