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

export {callCreateMoviesById};