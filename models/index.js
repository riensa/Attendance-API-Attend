const fs = require('fs');
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import all model files
var files = fs.readdirSync('./models');
files.map(file => {
  file = file.split('.')
  modelName = file[0]
  if (modelName == 'index') {
    return
  } else {
    db[modelName] = require("./" + modelName)(sequelize, Sequelize);
  }
})

module.exports = db;