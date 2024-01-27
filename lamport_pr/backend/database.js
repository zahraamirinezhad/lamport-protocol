const { Sequelize } = require("sequelize");

module.exports = new Sequelize("cyber_pr_dt", "postgres", "sadistmode", {
  host: "localhost",
  dialect: "postgres",
});
