import { apiJsonFetch } from '../utils/helpers'
// export const callCreate

/*export const callGetMovieList = async () => {
    return await apiJsonFetch(`/api/movies/`, 'GET');
};*/

export const callGetMovieList = () => apiJsonFetch(`/api/movies/`, 'GET');
export const callCreateMoviesById = id => apiJsonFetch(`/api/movies/${id}`, 'POST');
export const callDeleteMovie = id => apiJsonFetch(`/api/movies/${id}`, 'DELETE');
