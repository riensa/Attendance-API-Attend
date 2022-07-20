const dayjs = require('dayjs')
const fs = require('fs');
const DB = require("../models");

const AttendsDB = DB.attends;
const EmployeesDB = DB.employees;
const Op = DB.Sequelize.Op;

exports.report = async (req, res) => {
	try {

		EmployeesDB.hasMany(AttendsDB, {foreignKey: 'employee_id'})
    AttendsDB.belongsTo(EmployeesDB, {foreignKey: 'employee_id'})

		let filterAttends = {}

		if(req.body.type) {
			filterAttends.type = req.body.type
		}

		if(req.body.startdate) {
			filterAttends.startdate = {
				[Op.gte]: dayjs(req.body.startdate + ' 07:00:00').format('YYYY-MM-DD HH:mm:ss')
			}
		}

		if(req.body.enddate) {
			filterAttends.enddate = {
				[Op.lt]: dayjs(req.body.enddate + ' 07:00:00').add(1, 'day').format('YYYY-MM-DD HH:mm:ss')
			}
		}

		let filterEmployee = {status: 'active'}

		if(req.body.employee_name) {
			filterEmployee.fullname = {
				[Op.substring]: req.body.employee_name
			}
		}

		// fetch all data
		let data =  await AttendsDB.findAll({
			where: filterAttends,
			include: [{
				model: EmployeesDB,
				attributes:['id', 'fullname', ],
				where: filterEmployee,
				required: true,
			}]
		})

		return res.send({
			status: 200,
			success: true,
			message: "Fetch report successfully",
			data: data
		})

	} catch (error) {
		return res.status(500).send({
			status: 500,
			success: false,
			message: "Unexpected Error",
			errors: error.message || "Some error occurred"
		});
	}
}

exports.findOne = async (req, res) => {
	try {

		let month = req.query.month == '' ? dayjs().format('MM') : req.query.month
		let year = req.query.year == '' ? dayjs().format('YYYY') : req.query.year

		let startdate = dayjs(year + '-' + month + '-01 07:00:00').format('YYYY-MM-DD HH:mm:ss')
		let enddate = dayjs(year + '-' + month + '-01 07:00:00').add(1, 'month').format('YYYY-MM-DD HH:mm:ss')

		EmployeesDB.hasMany(AttendsDB, {foreignKey: 'employee_id'})
    AttendsDB.belongsTo(EmployeesDB, {foreignKey: 'employee_id'})

		// fetch all data
		let data =  await AttendsDB.findAll({
			where: {
				startdate: {
					[Op.gte]: startdate
				},
				enddate: {
					[Op.lt]: enddate
				},
			},
			include: [{
				model: EmployeesDB,
				attributes:['id', 'fullname'],
				where: {
					id: req.user.id,
					status: 'active'
				},
				required: true,
			}]
		})

		return res.send({
			status: 200,
			success: true,
			message: "Fetch monthly attendance successfully",
			data: data
		})
	} catch (error) {
		return res.status(500).send({
			status: 500,
			success: false,
			message: "Unexpected Error",
			errors: error.message || "Some error occurred"
		});
	}
}

exports.create = async (req, res) => {
	try {

		// validate date 
		let selected_date = dayjs(req.body.date + ' ' + '07:00');

		let is_duplicate = await AttendsDB.count({ 
      where: { 
				employee_id: req.user.id,
				startdate: {
					[Op.gte]: selected_date.format('YYYY-MM-DD HH:mm:ss')
				},
				enddate: {
					[Op.lt]: selected_date.add(1, 'day').format('YYYY-MM-DD HH:mm:ss')
				}
			 }
    })

		if(is_duplicate) {
			return res.status(400).send({
				status: 400,
				success: false,
				message: "Validation Error",
				errors: [{
					"value": req.body.date,
					"msg": "Duplicate Date",
					"param": "date",
					"location": "body"
        }]
			});
		}

		let starttime = req.body.starttime == '' ? '00:00' : req.body.starttime
		let endtime = req.body.endtime == '' ? '00:00' : req.body.endtime

		let startdate = dayjs(req.body.date + ' ' + starttime)
		let enddate = dayjs(req.body.date + ' ' + endtime)

		let workhours = 0
		if(req.body.type == 'Attend') {
			workhours = enddate.diff(startdate, 'hour', true)
		}

		let base64Data = null
		if(req.file) {
			base64Data = new Buffer(fs.readFileSync(req.file.path)).toString("base64");
		} else if(req.body.type == 'Attend') {
			return res.status(400).send({
				status: 400,
				success: false,
				message: "Validation Error",
				errors: [{
					"value": "",
					"msg": "Must upload selfie",
					"param": "username",
					"location": "body"
        }]
			});
		}

		AttendsDB.create({
			employee_id: req.user.id,
			type: req.body.type,
			startdate: startdate.add(7, 'hour').format('YYYY-MM-DD HH:mm:ss'),
			enddate: enddate.add(7, 'hour').format('YYYY-MM-DD HH:mm:ss'),
			workhours: workhours,
			description: req.body.description,
			selfie: base64Data
		})

		return res.send({
			status: 200,
			success: true,
			message: "add new attendance successfully",
		})
	} catch (error) {
		return res.status(500).send({
			status: 500,
			success: false,
			message: "Unexpected Error",
			errors: error.message || "Some error occurred"
		});
	}
}

exports.update = async (req, res) => {
	try {

		let data = await AttendsDB.findOne({
			where: {
				id: req.body.id,
				employee_id: req.user.id
			}
		})

		if(!data) {
			return res.status(400).send({
				status: 400,
				success: false,
				message: "Validation Error",
				errors: [{
					"value": req.body.id,
					"msg": "Attendance not found",
					"param": "id",
					"location": "body"
        }]
			});
		}

		let date = dayjs(data.date).format('YYYY-MM-DD')

		let starttime = req.body.starttime == '' ? '00:00' : req.body.starttime
		let endtime = req.body.endtime == '' ? '00:00' : req.body.endtime

		let startdate = dayjs(date + ' ' + starttime)
		let enddate = dayjs(date + ' ' + endtime)

		let workhours = 0
		if(req.body.type == 'Attend') {
			workhours = enddate.diff(startdate, 'hour', true)
		}

		let values = {
			type: req.body.type,
			startdate: startdate.add(7, 'hour').format('YYYY-MM-DD HH:mm:ss'),
			enddate: enddate.add(7, 'hour').format('YYYY-MM-DD HH:mm:ss'),
			workhours: workhours,
			description: req.body.description,
		}

		if(req.file) {
			base64Data = new Buffer(fs.readFileSync(req.file.path)).toString("base64");
			values.selfie = base64Data
		}

		AttendsDB.update(values, {
      where: {
				id: req.body.id,
				employee_id: req.user.id
			}
    })

		return res.send({
			status: 200,
			success: true,
			message: "update attendance successfully"
		})
	} catch (error) {
		return res.status(500).send({
			status: 500,
			success: false,
			message: "Unexpected Error",
			errors: error.message || "Some error occurred"
		});
	}
}
