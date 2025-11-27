import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useModal } from '../../../context/ModalContext';
import { useAuth } from '../../../context/AuthContext';
import { callUpdatePassword } from '../../../apiCalls/usersCalls';
import { handleInputChange, isValidSubmission } from '../../../utils/helpers';
import InputErr from '../../../components/inputErr/InputErr';
import styles from './accChildren.module.scss';

function UpdatePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [currentPassErr, setCurrentPassErr] = useState('');
    const [newPassErr, setNewPassErr] = useState('');
    const [confirmPassErr, setConfirmPassErr] = useState('');
    const [submitErr, setSubmitErr] = useState('');

    const { setModal, closeModal } = useModal();
    const { setUser } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const checkPassword = () => {
            if (newPassword !== confirmPassword && confirmPassword.length > 0) {
                setConfirmPassErr('Passwords do not match');
                return;
            }
            setConfirmPassErr('')
        }
        checkPassword();
    }, [confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const removeUser = () => {
            setUser(null)
            closeModal();
            navigate('/auth')
        };

        if (
            !isValidSubmission(currentPassword, 'password')
            || !isValidSubmission(newPassword, 'password')
        ) {
            setSubmitErr('Invalid password');
            setNewPassword('');
            setConfirmPassword('');
            return;
        }

        if (newPassword !== confirmPassword) {
            setSubmitErr('Passwords do not match');
            return;
        }

        try {
            const response = await callUpdatePassword(currentPassword, newPassword, confirmPassword);
            setModal({
                type: 'text',
                data: {
                    message: response.message,
                    onClick: removeUser,
                }
            })
        } catch (err) {
            setSubmitErr(err.message);
        } finally {
            setCurrentPassword('')
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    return (
        <div className={styles.accChildren}>
            <h2>Change Password</h2>

            <section>
                <h3>You will be signed out after saving</h3>

                <div className={styles.UpdateDetails}>
                    <form onSubmit={handleSubmit}>

                        {submitErr && <p role='alert' className={styles.submitErr}>{submitErr}</p>}

                        <label htmlFor='current-password' className={styles.srOnly}>Enter current password</label>
                        <input
                            id='current-password'
                            type='password'
                            placeholder='current password'
                            value={currentPassword}
                            onChange={handleInputChange('password', setCurrentPassword, setCurrentPassErr, setSubmitErr)}
                            required
                            aria-invalid={!!currentPassErr}
                            aria-errormessage={currentPassErr ? 'current-password-error' : undefined}
                        />

                        {currentPassErr && <InputErr id='current-password-error' errMessage={currentPassErr} />}

                        <div className={styles.newPasswords}>
                            <label htmlFor='new-password' className={styles.srOnly}>Enter new password</label>
                            <input
                                id='new-password'
                                type='password'
                                placeholder='new password'
                                value={newPassword}
                                onChange={handleInputChange('password', setNewPassword, setNewPassErr, setSubmitErr)}
                                required
                                aria-invalid={!!newPassErr}
                                aria-errormessage={newPassErr ? 'new-password-error' : undefined}
                            />

                            {newPassErr && <InputErr id='new-password-error' errMessage={newPassErr} />}

                            <label htmlFor='confirm-new-password' className={styles.srOnly}>Confirm new password</label>
                            <input
                                id='confirm-new-password'
                                type='password'
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setSubmitErr('');
                                }}
                                placeholder='confirm new password'
                                required
                                aria-invalid={!!confirmPassErr}
                                aria-errormessage={confirmPassErr ? 'confirm-new-password-error' : undefined}
                            />

                            {confirmPassErr && <InputErr id='confirm-new-password-error' errMessage={confirmPassErr} />}
                        </div>

                        <button type='submit' className={styles.blackBtn}>
                            Save
                        </button>
                        <Link to='/account/security' className={styles.transparentBtn}>
                            Cancel
                        </Link>
                    </form>
                </div>

            </section>
        </div>
    );
}

export default UpdatePassword;
