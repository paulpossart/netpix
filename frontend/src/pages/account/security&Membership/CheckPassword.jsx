import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { callVerifyPassword } from '../../../apiCalls/authCalls';
import { handleInputChange, isValidSubmission } from '../../../utils/helpers';
import InputErr from '../../../components/inputErr/InputErr';
import styles from './accChildren.module.scss';

function CheckPassword({ authorised, setAuthorised }) {
    const [password, setPassword] = useState('');

    const [submitError, setSubmitError] = useState('');
    const [inputError, setInputError] = useState('');

    const { user } = useAuth();
    const username = user.username;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidSubmission(password, 'password')) {
            setSubmitError('Invalid password.')
            return;
        }

        try {
            const response = await callVerifyPassword(username, password);
            if (response.isValid) setAuthorised(true);
            else setSubmitError('Invalid password')
        } catch (err) {
            setSubmitError(err.message)
        } finally {
            setPassword('');
        }
    };

    return (
        <section>
            <h3>Let's make sure it's you</h3>
            <div className={styles.UpdateDetails}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='password' className={styles.srOnly}>Enter password</label>
                    <input
                        id='password'
                        type='password'
                        placeholder='password'
                        value={password}
                        onChange={handleInputChange('password', setPassword, setInputError, setSubmitError)}
                        required
                        autoFocus
                        aria-invalid={!!inputError}
                        aria-errormessage={inputError ? 'password-error' : undefined}
                    />

                    {inputError && <InputErr id='password-error' errMessage={inputError} />}
                    {submitError && <p role='alert' className={styles.submitErr}>{submitError}</p>}

                    <button type='submit' className={styles.blackBtn}>
                        Submit
                    </button>
                    <Link to='/account/security' className={styles.transparentBtn}>
                        Cancel
                    </Link>
                </form>
            </div>
        </section>
    );
};

export default CheckPassword;
