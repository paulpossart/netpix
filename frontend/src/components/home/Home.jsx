import { useAuth } from '../../context/AuthContext';
import { useOutletContext } from 'react-router-dom';

function Home() {
const {logout} = useAuth();
const {user} = useOutletContext();

  return (
    <>
      <p>Welcome, {user.username}</p>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default Home;