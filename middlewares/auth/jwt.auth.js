const jwt = require("jsonwebtoken");
const DB = require("../../models");

const AdminsDB = DB.admins;
const EmployeesDB = DB.employees;

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
      
			if (err || !decode) {
				req.user = undefined;
				if(err) {
					return res.status(500)
						.send({
							status: 500,
							success: false,
							message: "Unexpected Error",
							errors: err || "Some error occurred"
						});
				}
				next()
			} else {

				let UserDB;
				if(decode.group == 'E') {
					UserDB = EmployeesDB
				} else if (decode.group == 'A') {
					UserDB = AdminsDB
				}

				UserDB.findOne({ where: {id: decode.id} })
					.then(data => {
						req.user = data;
						next()
					})
					.catch(err => {
						return res.status(500)
						.send({
							status: 500,
							success: false,
							message: "Unexpected Error",
							errors: err || "Some error occurred"
            });
					});
			}
    });
  } else {
		req.user = undefined;
		next()
	}
};
module.exports = verifyToken;