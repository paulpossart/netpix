import pg from 'pg';
const isProd = process.env.NODE_ENV === 'production';

const {Pool} = pg;

const pool = new Pool(
    {
        connectionString: process.env.DB_URL,
        ssl: isProd ? { rejectUnauthorized: false} : false
    }
);

export default pool