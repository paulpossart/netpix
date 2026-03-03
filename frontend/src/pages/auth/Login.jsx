import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { isValidSubmission, handleInputChange } from '../../utils/helpers';
import InputErr from '../../components/inputErr/InputErr';
import styles from './Login&Reg.module.scss';

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
                    autoFocus
                    aria-invalid={!!usernameErr}
                    aria-errormessage={usernameErr ? 'username-error' : undefined}
                />

                {usernameErr && <InputErr id='username-error' errMessage={usernameErr} />}

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

                {passwordErr && <InputErr id='password-error' errMessage={passwordErr} />}

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
                        className={styles.authTextBtn}
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
