module.exports = (sequelize, Sequelize) => {
	const Admins = sequelize.define("admins", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			username: {
				allowNull: false,
				type: Sequelize.STRING
			},
			password: {
				allowNull: false,
				type: Sequelize.TEXT
			},
			fullname: {
				allowNull: false,
				type: Sequelize.STRING
			},
			group: {
				allowNull: true,
				type: Sequelize.CHAR,
				defaultValue: 'A',
			},
			status: {
				type: Sequelize.ENUM,
				values: ['active', 'inactive'],
				defaultValue: 'active',
				allowNull: false
			}
	});
	return Admins;
};