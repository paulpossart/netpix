const apiJsonFetch = async (url, methodStr, options = {}) => {
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

export const callRegisterUser = async (username, password, confirmPassword) => {
    return apiJsonFetch('/api/auth/register-user', 'POST', {
        body: JSON.stringify({ username, password, confirmPassword })
    });
};

export const callAuthenticateUser = async () => {
    return apiJsonFetch('/api/auth/authenticate-user', 'GET');
};

export const callLogin = async (username, password) => {
    return apiJsonFetch('/api/auth/login', 'POST', {
        body: JSON.stringify({ username, password })
    });
};

export const callLogout = async () => {
    const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('logout failed');
};

