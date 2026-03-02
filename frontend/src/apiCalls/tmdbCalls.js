import { apiJsonFetch } from '../utils/helpers';

/*export const callSearchTmdb = async (query) => {
    const data =  await apiJsonFetch(`/api/tmdb/search/${query}`, 'GET');
    console.log('data:', data)
    return data
};*/

export const callSearchTmdb = query => apiJsonFetch(`/api/tmdb/search/${query}`, 'GET');
export const callFetchVideosById = id => apiJsonFetch(`/api/tmdb/videos/${id}`, 'GET');
export const callFetchPopular = () => apiJsonFetch('api/tmdb/popular', 'GET');
export const callFetchUpcoming = () => apiJsonFetch('api/tmdb/upcoming', 'GET');
export const callFetchNowPlaying = () => apiJsonFetch('api/tmdb/now-playing', 'GET');
export const callFetchDetailsById = id => apiJsonFetch(`/api/tmdb/details/${id}`, 'GET');
export const callFetchLogoById = id => apiJsonFetch(`/api/tmdb/logo/${id}`, 'GET');
