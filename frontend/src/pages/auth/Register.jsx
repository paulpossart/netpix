import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { handleInputChange, isValidSubmission } from '../../utils/helpers';
import InputErr from '../../components/inputErr/InputErr';
import styles from './Login&Reg.module.scss';

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

                {usernameErr && <InputErr id='new-username-error' errMessage={usernameErr} />}

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

                {passwordErr && <InputErr id='new-password-error' errMessage={passwordErr} />}

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

                {confirmPasswordErr && <InputErr id='confirm-password-error' errMessage={confirmPasswordErr} />}

                <button
                    type='submit'
                    className={styles.redBtn}
                    style={{ marginTop: '1rem' }}
                >
                    New Become a Member!
                </button>

                <button
                    type='button'
                    className={styles.textBtn}
                    onClick={() => setView('login')}
                    style={{ marginTop: '1rem' }}
                >
                    Go back to sign in.
                </button>

            </form>
        </>
    )
}

export default Register;
