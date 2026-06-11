const db = require("../config/db");

async function execute(query, binds = {}, options = {}) {
  let connection;

  try {
    connection = await db.getConnection();

    const result = await connection.execute(
      query,
      binds,
      {
        autoCommit: true,
        outFormat: require("oracledb").OUT_FORMAT_OBJECT,
        ...options
      }
    );

    return result;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
  execute
};