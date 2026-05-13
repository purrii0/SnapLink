import { Pool } from 'pg';
import config from '../config/env'

const pool = new Pool({
  user: config.db_user,
  host: config.db_url,
  database: config.db_name,
  password: config.db_pass,
  port: config.db_port
})

async function testConn() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("DB Connected: ", res.row[0]);
  } catch (err) {
    console.error("DB error: ", err);
  }
}

testConn();

export default pool;
