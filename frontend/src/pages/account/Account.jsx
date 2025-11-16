import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function Account() {
const {user, logout} = useAuth();

  return (
    <div>
      <p>Account</p>
      <Link to='/'>Home</Link>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Account;