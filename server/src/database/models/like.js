module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "like",
    {
      posting_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      attitude: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: true,
    }
  )
