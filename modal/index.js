//To imports the database configuration from the dbConfig.js file located in the config directory.
const dbConfig = require("../config/dbConfig");

//Sequelize Initialization:
const { Sequelize, DataTypes } = require("sequelize");

//Creating an instance of sequelize using the information stored in the dbConfig.js file
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

//Database Connection Test:
//To tests the database connection by attempting to authenticate. If the connection is successful, it logs "Connected" to the console. Otherwise, it logs an error message.
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

//Creating Database Object (db):
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//It creates an object (db) and attaches the Sequelize and sequelize instances to it. This object will be used to export the Sequelize instance and models for use in other parts of the application.

//Model Definition:
db.products = require("./productModal.js")(sequelize, DataTypes);
db.userdetails = require("./signupModal.js")(sequelize, DataTypes);
//It defines a Sequelize model for the products table using the productModel.js file located in the same directory. The sequelize and DataTypes objects are passed to this model definition.

//Database Synchronization:
db.sequelize.sync({ force: false }).then(() => {
  console.log("Yes re-sync is done");
});
//It synchronizes the database schema with the defined models. The sync method is used to create tables if they do not exist. The { force: false } option prevents dropping tables if they already exist.

//Exporting Database
module.exports = db;
//It exports the db object, making it available for use in other parts of the application.
