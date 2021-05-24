module.exports = (sequelize, DataTypes) => {
  const window = sequelize.define("window", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    start_x_l: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_y_l: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_l: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    width_l: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height_p: {
      type: DataTypes.INTEGER,
    },
    width_p: {
      type: DataTypes.INTEGER,
    },
    start_x_p: {
      type: DataTypes.INTEGER,
    },
    start_y_p: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.STRING,
    },
  });
  return window;
};
