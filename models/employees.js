module.exports = (sequelize, Sequelize) => {
	const Employees = sequelize.define("employees", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			fullname: {
				allowNull: false,
				type: Sequelize.STRING
			},
			dob: {
				allowNull: false,
				type: Sequelize.DATE
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING
			},
			password: {
				allowNull: false,
				type: Sequelize.TEXT
			},
			password_reset_date: {
				allowNull: false,
				type: Sequelize.DATE
			},
			password_reset_by: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			created_by: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			group: {
				allowNull: true,
				type: Sequelize.CHAR,
				defaultValue: 'E',
			},
			status: {
				type: Sequelize.ENUM,
				values: ['active', 'inactive'],
				defaultValue: 'active',
				allowNull: false
			}
	});
	return Employees;
};