const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const UserDetails = sequelize.define("userdetails", {
    userName: { type: DataTypes.STRING(30), allowNull: false },
    email: { type: DataTypes.STRING(128), unique: true, allowNull: false },
    password: { type: DataTypes.STRING },
  });
  return UserDetails;
};
