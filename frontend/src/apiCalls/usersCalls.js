const callCreateUser = async (newUsername, newPassword) => {
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            newUsername,
            newPassword
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
};

const callGetUser = async () => {
    const response = await fetch('/api/users', {
        method: 'GET',
        credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) return null;
    if (data?.userData) return data;
    return null
};

const callUpdatePassword = async (currentPassword, updatedPassword, reEnteredPassword) => {
    const response = await fetch('/api/users/update-password', {
        method: 'PATCH',
        body: JSON.stringify({
            currentPassword,
            updatedPassword,
            reEnteredPassword
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });

    const data= await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}

export { callCreateUser, callGetUser, callUpdatePassword };
