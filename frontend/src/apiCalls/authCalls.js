import { apiJsonFetch } from "../utils/helpers";

export const callLogin = async (username, password) => {
    return apiJsonFetch('/api/auth/login', 'POST', {
        body: JSON.stringify({ username, password })
    });
};

export const callLogout = async () => {
    const response = await fetch('/api/auth/logout', {
        method: 'POST',
    });
    if (!response.ok) throw new Error('logout failed');
};

export const callLogoutEverywhere = async () => {
    const response = await fetch('/api/auth/logout-all', {
        method: 'POST',
    });
    if (!response.ok) throw new Error('logout failed');
};
