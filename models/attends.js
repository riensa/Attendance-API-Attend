module.exports = (sequelize, Sequelize) => {
	const Attends = sequelize.define("attends", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			employee_id: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			type: {
				type: Sequelize.ENUM,
				values: ['Attend', 'Absent', 'On Leave', 'Sick Leave'],
				defaultValue: 'attend',
				allowNull: false
			},
			startdate: {
				allowNull: false,
				type: Sequelize.DATE
			},
			enddate: {
				allowNull: false,
				type: Sequelize.DATE
			},
			workhours: {
				allowNull: true,
				type: Sequelize.FLOAT
			},
			description: {
				allowNull: true,
				type: Sequelize.TEXT
			},
			selfie: {
				allowNull: true,
				type: Sequelize.TEXT
			}
	});
	return Attends;
};