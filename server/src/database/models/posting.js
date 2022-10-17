module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "posting",
    {
      posting_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(1000),
        defaultValue: "",
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(200),
        defaultValue: "",
        allowNull: false,
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: true,
    }
  );
