import styles from './Account.module.scss';
import { Link } from 'react-router-dom';
import { callUpdatePassword } from '../../../apiCalls/usersCalls';
import { useState, useEffect } from 'react';
import { changeInput } from '../../../helpers/helperFunctions';
import { useAuth } from '../../../context/AuthContext';

function UpdatePassword() {
    const [modal, setModal] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reEnteredPassword, setReEnteredPassword] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [inputError, setInputError] = useState('');
    const { setUser } = useAuth();

    useEffect(() => {
        const checkPassword = () => {
            if (newPassword !== reEnteredPassword && reEnteredPassword.length > 0) {
                setInputError('Passwords do not match');
                return;
            }
            setInputError('')
        }
        checkPassword();
    }, [reEnteredPassword])

    const removeUser = (e) => {
        e.preventDefault();
        setModal(null)
        setUser(null);
        navigate('/auth')
    };

    const handleNewPassword = (e) => {
        setSubmitError('');
        setInputError('');
        changeInput(e, setNewPassword, setInputError, 'password');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword || newPassword.length < 6 || newPassword.length > 30) {
            setSubmitError('Invalid password');
            return;
        };

        if (newPassword !== reEnteredPassword) {
            setSubmitError('Passwords do not match');
            return;
        }

        try {
            const data = await callUpdatePassword(currentPassword, newPassword, reEnteredPassword);
            if (data?.success) {
                setModal(
                    <>
                        <div onClick={removeUser} className={styles.modalOverlay}></div>
                        <div className={styles.modal}>
                            <p>{data.message}</p>
                            <button className={styles.btn1} onClick={removeUser}>OK</button>
                        </div>
                    </>
                );
            }
        } catch (err) {
            setSubmitError(err.message)
        } finally {
            setCurrentPassword('')
            setNewPassword('');
            setReEnteredPassword('');
        }
    }

    return (
        <>
            {modal && modal}

            <h2>Change Password</h2>

            <section>
                <h3>You will be signed out after saving</h3>
                <div className={styles.overviewContainer}>
                    <form onSubmit={handleSubmit}>

                        {submitError && <p className={styles.submitError}>{submitError}</p>}

                        <input
                            type='password'
                            placeholder='current password'
                            value={currentPassword}
                            onChange={(e) => { setCurrentPassword(e.target.value); setSubmitError('') }}
                        />
                        <div className={styles.newPasswords}>
                            <input
                                type='password'
                                placeholder='new password (6-30 characters)'
                                value={newPassword}
                                onChange={handleNewPassword}
                            />

                            {inputError && <p className={styles.inputError}>{inputError}</p>}

                            <input
                                type='password'
                                placeholder='re-enter new password'
                                value={reEnteredPassword}
                                onChange={(e) => { setReEnteredPassword(e.target.value); setSubmitError('') }}
                            />
                        </div>
                        <button
                            type='submit'
                            className={styles.btn2}
                        >
                            Save
                        </button>
                        <Link
                            to='/account/security'
                            className={styles.cancelBtn}
                        >
                            Cancel
                        </Link>
                    </form>
                </div>
            </section >
        </>
    );
};

export default UpdatePassword;


