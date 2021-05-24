module.exports = (sequelize, DataTypes) => {
  const feed = sequelize.define("feed", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    background_color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  feed.associate = (models) => {
    feed.hasMany(models.window),
      {
        onDelete: "cascade",
      };
  };

  return feed;
};
