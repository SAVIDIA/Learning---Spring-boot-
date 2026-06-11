const bcrypt = require('bcryptjs');
const oracledb = require('oracledb');

(async () => {
  let conn;
  try {
    // Hash password 'test123'
    const hashedPwd = await bcrypt.hash('test123', 10);
    console.log('Hashed password:', hashedPwd);

    conn = await oracledb.getConnection({
      user: 'dfcudev',
      password: 'dfcudev',
      connectString: '192.168.132.71:1521/orclpdb'
    });

    // Insert test user
    await conn.execute(
      `INSERT INTO APP_USERS (USER_ID, USERNAME, PASSWORD, FULL_NAME, EMAIL, ROLE, STATUS)
       VALUES (APP_USERS_SEQ.NEXTVAL, :u, :p, :f, :e, :r, 'ACTIVE')`,
      { u: 'testuser', p: hashedPwd, f: 'Test User', e: 'test@example.com', r: 'EMPLOYEE' }
    );
    await conn.commit();
    console.log('Test user created successfully');
    
    // Verify
    const result = await conn.execute('SELECT USER_ID, USERNAME, ROLE FROM APP_USERS WHERE USERNAME = :u', {u: 'testuser'});
    if (result.rows.length > 0) {
      console.log('Verified - User ID:', result.rows[0][0], '| Username:', result.rows[0][1]);
    }
  } catch(e) {
    console.error('Error:', e.message);
  } finally {
    if(conn) await conn.close();
  }
})();
