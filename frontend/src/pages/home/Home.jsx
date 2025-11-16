import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function Home() {
const {user, logout} = useAuth();

  return (
    <>
      <p>Welcome, {user.username}</p>
      <Link to='/account'>Account</Link>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default Home;