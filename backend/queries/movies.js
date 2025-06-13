import pool from '../db/config.js';

const createMoviesById = async (req, res, next) => {
    const userId = req.userId
    const movieId = parseInt(req.params.id);

    try {
        const alreadyInList = await pool.query(
            `SELECT movie_id FROM netpix.movies
             WHERE movie_id = $1 AND user_id = $2`,
            [movieId, userId]
        );

        if (alreadyInList.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: `This movie is already in your list!`
            });
        }

        const rowCount = await pool.query(
            `SELECT COUNT(*) FROM netpix.movies
             WHERE user_id = $1`,
            [userId]
        );

        const numRows = parseInt(rowCount.rows[0].count);


        if (numRows >= 10) {
            return res.status(409).json({
                success: false,
                message: `Maximum of 10 movies in a list.`
            });
        }

        await pool.query(
            `INSERT INTO netpix.movies (user_id, movie_id)
             VALUES ($1, $2)`,
            [userId, movieId]
        );

        res.status(201).json({
            success: true,
            message: 'Movie succesfully added to list.'
        });

    } catch (err) {
        next(err);
    };
};

const getMovies = async (req, res, next) => {
    const userId = req.userId;
    try {

        const result = await pool.query(
            `SELECT movie_id FROM netpix.movies
             WHERE user_id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'List data not found',
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: 'List data retrieved',
            data: result.rows
        });

    } catch (err) {
        next(err)
    }
};

const deleteMoviesById = async (req, res, next) => {
    const movieId = parseInt(req.params.id);
    const userId = req.userId;

    try {
        const result = await pool.query(
            `DELETE FROM netpix.movies
             WHERE user_id = $1 AND movie_id = $2`,
             [userId, movieId]
        );
       
        if (result.rowCount > 0) {
            return res.status(200).json({
                success: true,
                message: 'Movie removed from list.'
            });
        } else {
            return res.status(404).json({
                sucess: false,
                message: 'Could not complete request.'
            })
        }

    } catch (err) {
        next(err)
    }
}

export { createMoviesById, getMovies, deleteMoviesById };