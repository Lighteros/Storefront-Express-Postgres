import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, TEST_POSTGRES_DB, NODE_ENV } = process.env;

let connect;

if (NODE_ENV === 'dev') {
  connect = {
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  };
}

if (NODE_ENV?.trim() === 'test') {
  connect = {
    host: POSTGRES_HOST,
    database: TEST_POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  };
}

const client = new Pool(connect);

export default client;
