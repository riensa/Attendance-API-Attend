module.exports = {
	HOST: "localhost",
	USER: "atndnc_user",
	PASSWORD: "atndnc_pass",
	DB: "attendance_app",
	dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	timezone: '+07:00'
};