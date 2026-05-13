import dotenv from "dotenv";
dotenv.config();

const config = {
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
  db_name: process.env.DB_NAME,
  db_url: process.env.DB_URL,
  db_port: process.env.DB_PORT,
  redis_url: process.env.REDIS_URL,
  port: process.env.PORT
}

export default config;
