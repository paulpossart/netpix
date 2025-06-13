const callCreateMoviesById = async (id) => {
    const response = await fetch(`/api/movies/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
};

const callGetMovies = async () => {
    const response = await fetch(`/api/movies/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data.data;
};

const callDeleteMoviesById = async (id) => {
    const response = await fetch(`/api/movies/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
};

export { callCreateMoviesById, callGetMovies, callDeleteMoviesById };