import { apiJsonFetch } from '../utils/helpers'
// export const callCreate

export const callGetMovieList = async () => {
    return await apiJsonFetch(`/api/movies/`, 'GET');
};
