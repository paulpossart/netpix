import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { handleInputChange, isValidSubmission } from '../utils/helpers';
import styles from './Login&Reg.module.scss';
import errorIcon from '../../assets/error.svg';

function Register({ setView }) {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [confirmPasswordErr, setConfirmPasswordErr] = useState('');

    const [submitErr, setSubmitErr] = useState('');
    const { register } = useAuth();

    useEffect(() => {
        const checkPasswords = () => {
            if (newPassword !== confirmNewPassword && confirmNewPassword.length > 0) {
                setConfirmPasswordErr('Passwords do not match');
                return;
            }
            setConfirmPasswordErr('');
        }
        checkPasswords();
    }, [confirmNewPassword, newPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !isValidSubmission(newUsername, 'username')
            || !isValidSubmission(newPassword, 'password')
        ) {
            setSubmitErr('Invalid username or password');
            setNewPassword('');
            setConfirmNewPassword('');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setSubmitErr('Passwords do not match');
            return;
        }

        try {
            await register(newUsername, newPassword, confirmNewPassword);
            setSubmitErr('');
            setNewUsername('');
        } catch (err) {
            setSubmitErr((err).message)
        } finally {
            setNewPassword('');
            setConfirmNewPassword('');
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                aria-labelledby='user-registration-form'
                className={styles.LoginAndReg}
            >
                <h2 id='user-registration-form'>Sign Up</h2>

                {submitErr && <p role='alert' className={styles.submitErr}>{submitErr}</p>}


                <label htmlFor='username' className={styles.srOnly}>Register a new username</label>
                <input
                    id='username'
                    type='text'
                    placeholder='new username'
                    value={newUsername}
                    onChange={handleInputChange('username', setNewUsername, setUsernameErr, setSubmitErr)}
                    required
                    aria-invalid={!!usernameErr}
                    aria-errormessage={usernameErr ? 'new-username-error' : undefined}
                />

                {
                    usernameErr &&
                    <p id='new-username-error' className={styles.inputErr}>
                        <img src={errorIcon} alt='' />
                        <span>{usernameErr}</span>
                    </p>
                }

                <label htmlFor='password' className={styles.srOnly}>Register a new password</label>
                <input
                    id='password'
                    type='password'
                    placeholder='new password'
                    value={newPassword}
                    onChange={handleInputChange('password', setNewPassword, setPasswordErr, setSubmitErr)}
                    required
                    aria-invalid={!!passwordErr}
                    aria-errormessage={passwordErr ? 'new-password-error' : undefined}
                />

                {
                    passwordErr &&
                    <p id='new-password-error' className={styles.inputErr}>
                        <img src={errorIcon} alt='' />
                        <span>{passwordErr}</span>
                    </p>
                }

                <label htmlFor='confirm-password' className={styles.srOnly}>Confirm your new password</label>
                <input
                    id='confirm-password'
                    type='password'
                    placeholder='confirm password'
                    value={confirmNewPassword}
                    onChange={(e) => {
                        setConfirmNewPassword(e.target.value);
                        setSubmitErr('');
                    }}
                    required
                    aria-invalid={!!confirmPasswordErr}
                    aria-errormessage={confirmPasswordErr ? 'confirm-password-error' : undefined}
                />

                {
                    confirmPasswordErr &&
                    <p id='confirm-password-error' className={styles.inputErr}>
                        <img src={errorIcon} alt='' />
                        <span>{confirmPasswordErr}</span>
                    </p>
                }

                <button
                    type='submit'
                    className={styles.bigRedBtn}
                    style={{ marginTop: '1rem' }}
                >
                    Become a Member!
                </button>

                <button
                    type='button'
                    onClick={() => setView('login')}
                    className={styles.textBtn}
                    style={{ marginTop: '1rem' }}
                >
                    Go back to sign in.
                </button>

            </form>
        </>
    )
}

export default Register;
