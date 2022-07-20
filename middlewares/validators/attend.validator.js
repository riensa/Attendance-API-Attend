const {check, validationResult} = require('express-validator');

exports.validateSessionAdmin = [
	(req, res, next) => {
		// check auth
		console.log(req.user)
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