import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function Home() {
const {user, logout} = useAuth();

  return (
    <div>
      <p>Welcome, {user.username}</p>
      <Link to='/account'>Account</Link>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home;