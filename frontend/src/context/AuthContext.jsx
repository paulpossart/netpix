import { createContext, useContext, useState, useEffect } from 'react';
import { callLogin, callLogout, callLogoutEverywhere } from '../apiCalls/authCalls';
import { callRegisterUser, callAuthenticateUser } from '../apiCalls/usersCalls';

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const data = await callAuthenticateUser();
                if (data?.user) setUser(data.user);
                else setUser(null);
            } catch (err) {
                if (err.message.includes('401')) setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        verifyUser();
    }, []);

    const register = async (username, password, confirmPassword) => {
        try {
            const data = await callRegisterUser(username, password, confirmPassword);
            if (data?.user) setUser(data.user);
            else setUser(null);
        } catch (err) {
            setUser(null);
            throw err;
        }
    };

    const login = async (username, password) => {
        try {
            const data = await callLogin(username, password);
            if (data?.user) setUser(data.user);
            else setUser(null);
        } catch (err) {
            setUser(null);
            throw err;
        }
    };

    const logout = async () => {
        try {
            await callLogout();
            setUser(null);
        } catch (err) {
            throw err;
        }
    };

    const logoutAll = async () => {
        try {
            await callLogoutEverywhere();
            setUser(null);
        } catch (err) {
            throw err;
        }
    };

    return (
        <AuthContext.Provider value={{
            user, register, login, logout, logoutAll, isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { useAuth, AuthProvider };
