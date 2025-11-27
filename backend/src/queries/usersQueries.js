import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import { httpErr } from '../utils/helpers.js';

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

export const createUser = async (username, password) => {

    const id = uuidv4();

    const usernameExists = await getUserByUsername(username);

    if (usernameExists) {
        throw httpErr('Username unavailable', 409, 'RegistrationError');
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


export const replacePassword = async (
    id, currentPassword, newPassword,
) => {

    const user = await getUserById(id);

    if (!user) {
        throw httpErr('Username unavailable', 409, 'RegistrationError');
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password_hash);

    if (!passwordMatch) {
        throw httpErr('Current password invalid', 401, 'PasswordError');
    };

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const result = await pool.query(
        `UPDATE netpix.users
         SET password_hash = $1, 
            updated_at = CURRENT_TIMESTAMP
         WHERE id = $2`,
        [hashedPassword, id]
    );

    if (result.rowCount === 1) return true;

    throw httpErr('Failed to update password', 500, 'UpdateError');
};


export const replaceUsername = async (id, newUsername) => {
    const usernameExists = await getUserByUsername(newUsername);

    if (usernameExists) {
        throw httpErr('Username unavailable', 409, 'RegistrationError');
    }

    const result = await pool.query(
        `UPDATE netpix.users
         SET username = $1, 
            updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING username, updated_at`,
        [newUsername, id]
    );

    return result.rows[0];
};

export const removeUser = async (id) => {
    const result = await pool.query(
        `DELETE FROM netpix.users
         WHERE id = $1
         RETURNING username, updated_at`,
        [id]
    );

    if (result.rowCount === 1) return result.rows[0];
    return null;
};
