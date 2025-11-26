import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { isValidSubmission, handleInputChange } from '../../utils/helpers';
import styles from './Login&Reg.module.scss';
import errorIcon from '../../assets/error.svg';

function Login({ setView }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const [submitErr, setSubmitErr] = useState('');
    const { login } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !isValidSubmission(username, 'username')
            || !isValidSubmission(password, 'password')
        ) {
            setSubmitErr('Invalid username or password');
            setPassword('');
            return
        }

        try {
            await login(username, password);
            setSubmitErr('');
            setUsername('');
        } catch (err) {
            setSubmitErr((err).message);
        } finally {
            setPassword('');
        }
    };

    return (
        <>

            <form
                onSubmit={handleSubmit}
                aria-labelledby='sign-in-form'
                className={styles.LoginAndReg}
            >

                <h2 id='sign-in-form'>Sign In</h2>

                {submitErr && <p role='alert' className={styles.submitErr}>{submitErr}</p>}

                <label htmlFor='username' className={styles.srOnly}>Enter username</label>
                <input
                    id='username'
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={handleInputChange('username', setUsername, setUsernameErr, setSubmitErr)}
                    required
                    aria-invalid={!!usernameErr}
                    aria-errormessage={usernameErr ? 'username-error' : undefined}
                />

                {
                    usernameErr &&
                    <p id='username-error' className={styles.inputErr}>
                        <img src={errorIcon} alt='' />
                        <span>{usernameErr}</span>
                    </p>
                }

                <label htmlFor='password' className={styles.srOnly}>Enter password</label>
                <input
                    id='password'
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={handleInputChange('password', setPassword, setPasswordErr, setSubmitErr)}
                    required
                    aria-invalid={!!passwordErr}
                    aria-errormessage={passwordErr ? 'password-error' : undefined}
                />

                {
                    passwordErr &&
                    <p id='password-error' className={styles.inputErr}>
                        <img src={errorIcon} alt='' />
                        <span>{passwordErr}</span>
                    </p>
                }

                <button
                    type='submit'
                    className={styles.redBtn}
                    style={{ marginTop: '1rem' }}
                >
                    Sign In
                </button>

                <p>New to Netpix?
                    <button
                        type='button'
                        className={styles.textBtn}
                        onClick={() => setView('register')}
                        style={{ marginLeft: '0.8rem' }}
                    >
                        Sign up now.
                    </button>
                </p>

            </form>
        </>
    )
}

export default Login;
