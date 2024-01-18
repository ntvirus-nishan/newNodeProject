module.exports = (sequelize, DataTypes) => {
  //define a Sequelize model named "product". The define method is used to create a new model with the specified attributes
  const Product = sequelize.define("product", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  return Product;
};
