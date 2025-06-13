const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
}

const callFetchPopular = async () => {
    const response = await fetch('api/tmdb/popular', options);

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
};

const callFetchUpcoming = async () => {
    const response = await fetch('api/tmdb/upcoming', options);

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
};

const callFetchNowPlaying = async () => {
    const response = await fetch('api/tmdb/now-playing', options);

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
};

const callFetchVideosById = async (id) => {
    const response = await fetch(`api/tmdb/video/${id}`, options);

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}

const callFetchLogoById = async (id) => {
    const response = await fetch(`api/tmdb/logo/${id}`, options);

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}

const callSearchTmdb = async (query) => {
    console.log('called')
    const response = await fetch(`api/tmdb/search/${query}`, options);

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}

const callFetchDetailsById = async (id) => {
    const response = await fetch(`api/tmdb/details/${id}`, options);

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}

export {
    callFetchPopular,
    callFetchUpcoming,
    callFetchNowPlaying,
    callFetchVideosById,
    callFetchLogoById,
    callSearchTmdb,
    callFetchDetailsById
};
