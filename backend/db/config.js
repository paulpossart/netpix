import { isProd } from '../utils/helperFunctions.js';
import pg from 'pg';

const {Pool} = pg;

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: isProd() ? {rejectUnauthorized: false} : false
});

export default pool;
