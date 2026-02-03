import {
    getMovieByUser,
    countMoviesByUser,
    insertMovieByUser,
    getMovieListByUser,
    deleteMovieById
} from '../queries/moviesQueries.js';

export const createMoviesById = async (req, res, next) => {
    const userId = req.user.id;
    const movieId = parseInt(req.params.id);

    try {
        const alreadyInList = await getMovieByUser(userId, movieId);
        if (alreadyInList.length > 0) {
            return res.status(409).json({
                success: false,
                message: `This movie is already in your list!`
            });
        };

        const movieCount = await countMoviesByUser(userId);
        if (movieCount >= 10) {
            return res.status(409).json({
                success: false,
                message: `Maximum of 10 movies in a list.`
            });
        };

        await insertMovieByUser(userId, movieId);
        res.status(201).json({
            success: true,
            message: 'Movie succesfully added to list.'
        });
    } catch (err) {
        next(err);
    }
};

export const getMovieList = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const result = await getMovieListByUser(userId);
        res.status(200).json(result.rows);
    } catch (err) {
        next(err);
    }
};

export const deleteMovie = async (req, res, next) => {
    const movieId = parseInt(req.params.id);
    const userId = req.user.id;

    try {
        const result = await deleteMovieById(userId, movieId);

        if (result > 0) {
            return res.status(200).json({
                success: true,
                message: 'Movie removed from list.'
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Could not complete request.'
            })
        }
    } catch (err) {
        next(err);
    }
};
