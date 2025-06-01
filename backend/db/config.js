import pg from 'pg';
const {Pool} = pg;

const isProd = process.env.NODE_EN === 'production';