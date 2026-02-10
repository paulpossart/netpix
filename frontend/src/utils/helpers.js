const changeInput = (e, setValue, setError, inputType) => {
    const safeRegex = /^[^<>{};\\]*$/;
    const bannedRegEx = '< > { } ; \\';

    const value = e.target.value;
    setValue(value);

    const capitaliseType = inputType.charAt(0).toUpperCase() + inputType.slice(1);

    if (value.length > 30) {
        setError(`${capitaliseType} maximum 30 characters`);
    }
    else if (value.length < 6 && inputType === 'password') {
        setError('Password minimum 6 characters');
    }
    else if (!safeRegex.test(value) && inputType === 'username') {
        setError(`Username cannot contain these characters: ${bannedRegEx}`);
    }
    else if (
        (value.startsWith(' ') || value.endsWith(' ')) && inputType === 'username'
    ) {
        setError(`Username cannot begin or end with a space`);
    }
    else setError('');
};


export const handleInputChange = (inputType, setValue, setError, setErrFeedback) => {
    return (e) => {
        setErrFeedback('');
        changeInput(e, setValue, setError, inputType)
    };
};


export const isValidSubmission = (input, type) => {
    const safeRegex = /^[^<>{};\\]*$/;

    if (input.length > 30) return false;

    if (
        type === 'username'
        && (!input.trim() || !safeRegex.test(input))
    ) {
        return false;
    }

    if (type === 'password' && (!input || input.length < 6)) return false;

    return true;
};

export const apiJsonFetch = async (url, methodStr, options = {}) => {
    const defaultOptions = {
        method: methodStr,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        ...options
    };

    const response = await fetch(url, defaultOptions);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`)
    }

    return data;
};

export const randomIndexGenerator = (array) => {
    const idx = Math.floor(array.length * Math.random());
    return idx;
};
