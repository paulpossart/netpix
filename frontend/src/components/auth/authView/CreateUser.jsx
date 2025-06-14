import { useState } from 'react';
import { callCreateUser } from '../../../apiCalls/usersCalls';
import { changeInput, isValidSubmission } from '../../../helpers/helperFunctions';
import { useAuth } from '../../../context/AuthContext';

import styles from '../auth.module.scss';

function CreateUser({ setView }) {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [inputError, setInputError] = useState('');
    const [createUserError, setCreateUserError] = useState('');
    const { setUser } = useAuth();

    const handleChangeUsername = (e) => {
        setCreateUserError('');
        changeInput(e, setNewUsername, setInputError, 'username')
    }

    const handleChangePassword = (e) => {
        setCreateUserError('');
        changeInput(e, setNewPassword, setInputError, 'password')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = isValidSubmission(newUsername, newPassword);
        if (!isValid) {
            setCreateUserError('Invalid username or password')
            return;
        }

        try {
            const data = await callCreateUser(newUsername, newPassword);
            if (data?.userData) setUser(data.user);
            else setUser(null);
        } catch (err) {
            setCreateUserError(err.message);
            setUser(null)
        } finally {
            setNewUsername('');
            setNewPassword('');
        }
    };

    return (
        <div className={styles.authForm}>
            <h2>Sign Up</h2>
            {createUserError && <p className={styles.signInError}>{createUserError}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={newUsername}
                    onChange={handleChangeUsername}
                    placeholder='new username'
                />
                {inputError && <p className={styles.inputError}>{inputError}</p>}
                <input
                    type='password'
                    value={newPassword}
                    onChange={handleChangePassword}
                    placeholder='new password'
                />
                <button type='submit' className={styles.btn1}>Become a Member!</button>
            </form>
            <p className={styles.p}><button className={styles.textBtn} onClick={() => setView('sign-in')}>Go back to sign in.</button></p>
        </div>
    );
}

export default CreateUser;
