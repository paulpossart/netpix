import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useModal } from '../../../context/ModalContext';
import { callPasswordCheck } from '../../../apiCalls/authCalls';
import { callUpdateUsername } from '../../../apiCalls/usersCalls';
import { setTextModal } from '../../modal/Modal';
import { changeInput } from '../../../helpers/helperFunctions';
import styles from './accOverview.module.scss';

function UpdateUsername() {
    const [authorised, setAuthorised] = useState(false);
    const [password, setPassword] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [inputError, setInputError] = useState('');
    const [username, setUsername] = useState('');
    const { setUser } = useAuth();
    const {setModal} = useModal();
    const navigate = useNavigate();
    const safeRegex = /^[^<>{};\\]*$/;

    const modalClick = () => {
        setModal(null);
        navigate('/account')
    }

    const setModalContent = (message) => {
        setTextModal({
            setter: setModal,
            onClick: modalClick,
            message: message
        })
    };

    const handleChangePassword = (e) => {
        setSubmitError('');
        setInputError('');
        changeInput(e, setPassword, setInputError, 'password');
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();

        if (!password || password.length < 6 || password.length > 30) {
            setSubmitError('Invalid password');
            return;
        };

        try {
            const data = await callPasswordCheck(password);
            if (data?.success) {
                setAuthorised(true);
            }
        } catch (err) {
            setSubmitError(err.message)
        } finally {
            setPassword('');
        }
    };

    const handleChangeUsername = (e) => {
        setSubmitError('');
        setInputError('');
        changeInput(e, setUsername, setInputError, 'username');
    };

    const handleSubmitUsername = async (e) => {
        e.preventDefault();

        if (!username.trim() || username.length > 30) {
            setSubmitError('Invalid username');
            return;
        };
        if (!safeRegex.test(username)) {
            setSubmitError('Invalid username');
            return;
        }

        try {
            const data = await callUpdateUsername(username);
            if (data?.success) {
                setUser(data.user);
                setModalContent(data.message);
            }
        } catch (err) {
            setSubmitError(err.message)
        } finally {
            setUsername('');
        }
    };

    if (!authorised) {
        return (
            <div className={styles.accountOverview}>
                <h2>Change Username</h2 >
                <section>
                    <h3>Let's make sure it's you</h3>
                    <div className={styles.overviewContainer}>
                        <form onSubmit={handleSubmitPassword}>
                            <input
                                type='password'
                                placeholder='password'
                                value={password}
                                onChange={handleChangePassword}
                            />

                            {inputError && <p className={styles.inputError}>{inputError}</p>}
                            {submitError && <p className={styles.submitError}>{submitError}</p>}

                            <button
                                type='submit'
                                className={styles.btn2}
                            >
                                Submit
                            </button>
                            <Link
                                to='/account/security'
                                className={styles.transparentBtn}
                            >
                                Cancel
                            </Link>
                        </form>
                    </div>
                </section>
            </div>
        );
    };

    return (
        <div className={styles.accountOverview}>
            <h2>Change Username</h2 >
            <section>
                <h3>Choose a memorable username</h3>
                <div className={styles.overviewContainer}>
                    <form onSubmit={handleSubmitUsername}>
                        <input
                            type='text'
                            placeholder='new username'
                            value={username}
                            onChange={handleChangeUsername}
                        />

                        {inputError && <p className={styles.inputError}>{inputError}</p>}
                        {submitError && <p className={styles.submitError}>{submitError}</p>}

                        <button
                            type='submit'
                            className={styles.btn2}
                        >
                            Save
                        </button>
                        <Link
                            to='/account/security'
                            className={styles.transparentBtn}
                        >
                            Cancel
                        </Link>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default UpdateUsername;
