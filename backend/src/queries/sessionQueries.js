import pool from '../config/db.js';

export const logoutAll = async (userId) => {
    await pool.query(
        `DELETE FROM netpix.session
         WHERE sess->'passport'->>'user' = $1`,
        [userId]
    );
};
