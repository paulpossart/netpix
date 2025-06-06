import { useNavigate } from 'react-router-dom';
import { callSignOut } from '../../apiCalls/authCalls';
import { useAuth } from '../../context/AuthContext';
import styles from '../auth/auth.module.scss';
import { useLocation } from 'react-router-dom';

function SignOut() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const location = useLocation();
    const path = location.pathname;

    const handleSignOut = async () => {
        await callSignOut();
        setUser(null);
        navigate('/auth');
        sessionStorage.clear();
    }

    return (
        <button
            className={styles.textBtn}
            style={path === '/account' ? { color: 'black' } : null}
            type='button'
            onClick={handleSignOut}
        >
            Sign Out
        </button>
    );
}

export default SignOut;
