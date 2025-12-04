import { apiJsonFetch } from "../utils/helpers";

export const callRegisterUser = async (username, password, confirmPassword) => {
    return apiJsonFetch('/api/users/register-user', 'POST', {
        body: JSON.stringify({ username, password, confirmPassword })
    });
};

export const callAuthenticateUser = async () => {
    return apiJsonFetch('/api/users/authenticate-user', 'GET');
};

export const callUpdatePassword = async (currentPassword, newPassword, confirmNewPassword) => {
    return apiJsonFetch('/api/users/update-password', 'POST', {
        body: JSON.stringify({currentPassword, newPassword, confirmNewPassword})
    });
};

export const callUpdateUsername = async (newUsername) => {
    return apiJsonFetch('/api/users/update-username', 'POST', {
        body: JSON.stringify({newUsername})
    });
};

export const callDeleteUser = async () => {
    return apiJsonFetch('/api/users/delete-user', 'DELETE');
};
