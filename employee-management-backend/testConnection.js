const oracledb = require("oracledb");

(async () => {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: "dfcudev",
      password: "YOUR_PASSWORD",
      connectString: "192.168.132.71:1521/orclpdb"
    });

    const result = await connection.execute(
      "SELECT 'DATABASE CONNECTED' MSG FROM DUAL"
    );

    console.log(result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
})();