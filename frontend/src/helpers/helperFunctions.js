const safeRegex = /^[^<>{};\\]*$/;
const bannedRegEx = '< > { } ; \\';

const changeInput = (e, setValue, setError, type) => {
    const value = e.target.value;
    setValue(value);

    if (value.length > 30) setError(`Maximum 30 characters`);
    else if (value.length < 6 && type === 'password') setError('Password minimum 6 characters')
    else if (!safeRegex.test(value) && type === 'username') setError(`Username cannot contain the following characters: ${bannedRegEx}`);
    else setError(null);
};

const isValidSubmission = (username, password) => {
    if (!username.trim() || username.length > 30) {
        return false;
    };

    if (!password || password.length < 6 || password.length > 30) {
        return false;
    };

    if (!safeRegex.test(username)) {
        return false;
    }
    return true;
};

const randomIndexGenerator = (array) => {
    const idx = Math.floor(array.length * Math.random());
    return idx;
}

const fetchVidKeyAndTrailers = async (movie, callFetch) => {
    const vidArray = await callFetch(movie.id);
    const clipsArray = vidArray.filter(vid => vid.type === 'Clip');
    const trailerArray = vidArray.filter(vid => vid.type === 'Trailer');

    let vidKey;
    if (clipsArray.length > 0) vidKey = clipsArray[randomIndexGenerator(clipsArray)].key
    else if (trailerArray.length > 0) vidKey = trailerArray[randomIndexGenerator(trailerArray)].key
    else if (vidArray.length > 0) vidKey = vidArray[randomIndexGenerator(vidArray)].key;
    else vidKey = null;

    return {
        YTKey: vidKey,
        trailers: trailerArray
    }
}

export { changeInput, isValidSubmission, randomIndexGenerator, fetchVidKeyAndTrailers };