import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useModal } from '../../../context/ModalContext';
import { callUpdateUsername } from '../../../apiCalls/usersCalls';
import { handleInputChange, isValidSubmission } from '../../../utils/helpers';
import CheckPassword from './CheckPassword';
import InputErr from '../../../components/inputErr/InputErr';
import styles from './accChildren.module.scss';

function UpdateUsername() {
    const [authorised, setAuthorised] = useState(false);
    const [newUsername, setNewUsername] = useState('');

    const [submitError, setSubmitError] = useState('');
    const [inputError, setInputError] = useState('');

    const { verifyUser } = useAuth();
    const { setModal, closeModal } = useModal();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidSubmission(newUsername, 'username')) {
            setSubmitError('Invalid username');
            return;
        };

        try {
            const response = await callUpdateUsername(newUsername);

            setModal({
                type: 'text',
                data: {
                    message: response.message,
                    onClick: async () => {
                        await verifyUser();
                        closeModal();
                        navigate('/account');

                    }
                }
            })

        } catch (err) {
            setSubmitError(err.message)
        } finally {
            setNewUsername('');
        }
    };


    return (
        <div className={styles.accChildren}>
            <h2>Change Username</h2>

            {
                !authorised
                    ? <CheckPassword authorised={authorised} setAuthorised={setAuthorised} />
                    : <section>
                        <h3>Choose a memorable username</h3>
                        <div className={styles.UpdateDetails}>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor='new-username' className={styles.srOnly}>Enter new username</label>
                                <input
                                    id='new-username'
                                    type='text'
                                    placeholder='new username'
                                    value={newUsername}
                                    onChange={handleInputChange('username', setNewUsername, setInputError, setSubmitError)}
                                    required
                                    aria-invalid={!!inputError}
                                    aria-errormessage={inputError ? 'new-username-error' : undefined}
                                />

                                {inputError && <InputErr id='new-username-error' errMessage={inputError} />}
                                {submitError && <p role='alert' className={styles.submitErr}>{submitError}</p>}

                                <button type='submit' className={styles.blackBtn}>
                                    Save
                                </button>
                                <Link to='/account/security' className={styles.transparentBtn}>
                                    Cancel
                                </Link>
                            </form>
                        </div>
                    </section>
            }

        </div>
    );
};

export default UpdateUsername;
