import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import pool from '../config/db.js';

export const createUser = async (username, password, confirmPassword) => {

    const id = uuidv4();

    const checkUsername = await pool.query(
        'SELECT * FROM netpix.users WHERE username = $1',
        [username]
    );

    if (checkUsername.rows.length > 0) {
        throw newErr('Username unavailable', 400, 'Registration Error');
    }

    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
        `INSERT INTO netpix.users (id, username, password_hash)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [id, username, passwordHash]
    );

    return result.rows[0];
};

export const getUserByUsername = async (username) => {
    const result = await pool.query(
        `SELECT * FROM netpix.users
         WHERE username = $1`,
        [username]
    );

    return result.rows[0];
};

export const getUserById = async (id) => {
    const result = await pool.query(
        `SELECT * FROM netpix.users
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};