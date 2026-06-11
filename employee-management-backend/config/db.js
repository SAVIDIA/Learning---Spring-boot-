const oracledb = require("oracledb");
require("dotenv").config();

async function initialize() {
  try {
    await oracledb.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SERVICE}`,
      poolMin: 2,
      poolMax: 20,
      poolIncrement: 2,
      poolTimeout: 60
    });

    console.log("Oracle Pool Created Successfully");
  } catch (err) {
    console.error("Oracle Pool Creation Failed");
    console.error(err);
    process.exit(1);
  }
}

async function getConnection() {
  return await oracledb.getConnection();
}

module.exports = {
  initialize,
  getConnection
};