import { apiJsonFetch } from "../utils/helpers";

export const callRegisterUser = async (username, password, confirmPassword) => {
    return apiJsonFetch('/api/users/register-user', 'POST', {
        body: JSON.stringify({ username, password, confirmPassword })
    });
};

export const callAuthenticateUser = async () => {
    return apiJsonFetch('/api/users/authenticate-user', 'GET');
};
