import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { callSignOut } from '../../apiCalls/authCalls';
import styles from '../auth/auth.module.scss';

function SignOut() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useAuth();

    const path = location.pathname;
    const isAccountPath = path.startsWith('/account');

    const handleSignOut = async () => {
        await callSignOut();
        setUser(null);
        navigate('/auth');
        sessionStorage.clear();
    }

    return (
        <button
            className={styles.textBtn}
            style={isAccountPath ? { color: 'black' } : null}
            type='button'
            onClick={handleSignOut}
        >
            Sign Out
        </button>
    );
}

export default SignOut;
