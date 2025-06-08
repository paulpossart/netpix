const callFetchPopular = async () => {
    const response = await fetch('api/tmdb/popular', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
};

export { callFetchPopular };
