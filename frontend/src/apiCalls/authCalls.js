const callSignIn = async (username, password) => {
    const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
};

const callSignOut = async () => {
    const response = await fetch('/api/auth/sign-out', {
        method: 'POST',
        credentials: 'include'
    });
    if (!response.ok) throw new Error('callSignOut error');
    return null;
};

const callPasswordCheck = async (password) => {
    const response = await fetch('/api/auth/password-check', {
        method: 'POST',
        body: JSON.stringify({
            password
        }),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}

export {callSignIn, callSignOut, callPasswordCheck};
