import { apiJsonFetch } from '../utils/helpers';

export const callSearchTmdb = async (query) => {
    const data =  await apiJsonFetch(`/api/tmdb/search/${query}`, 'GET');
    console.log('data:', data)
    return data
};
