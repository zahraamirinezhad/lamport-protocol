const Sequelize = require("sequelize");
const db = require("../database");

const User = db.define(
  "User",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    passwordSession: { type: Sequelize.INTEGER, allowNull: false },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = User;
