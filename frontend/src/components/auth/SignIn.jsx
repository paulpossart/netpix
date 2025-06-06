import { useState } from 'react';
import { callSignIn } from '../../apiCalls/authCalls';
import { changeInput, isValidSubmission } from '../../helpers/helperFunctions';
import { useAuth } from '../../context/AuthContext';

import styles from './auth.module.scss';

function SignIn({ setView }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [inputError, setInputError] = useState('');
    const [signInError, setSignInError] = useState('');
    const { setUser } = useAuth();

    const handleChangeUsername = (e) => {
        setSignInError('');
        changeInput(e, setUsername, setInputError, 'username')
    }

    const handleChangePassword = (e) => {
        setSignInError('');
        changeInput(e, setPassword, setInputError, 'password')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = isValidSubmission(username, password);
        if (!isValid) {
            setSignInError('Invalid username or password')
            return;
        }

        try {
            const data = await callSignIn(username, password);
            if (data?.userData) setUser(data.user);
            else setUser(null);
        } catch (err) {
            setSignInError(err.message);
            setUser(null)
        } finally {
            setUsername('');
            setPassword('');
        }
    };

    return (
        <div className={styles.authForm}>
            <h2>Sign In</h2>
            {signInError && <p className={styles.signInError}>{signInError}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={username}
                    onChange={handleChangeUsername}
                    placeholder='username'
                />
                {inputError && <p className={styles.inputError}>{inputError}</p>}
                <input
                    type='password'
                    value={password}
                    onChange={handleChangePassword}
                    placeholder='password'
                />
                <button type='submit' className={styles.btn1}>Sign in</button>
            </form>
            <p className={styles.p}>New to Netpix?  <button className={styles.textBtn} onClick={() => setView('create-user')}>Sign up now.</button></p>
        </div>
    );
}

export default SignIn;
