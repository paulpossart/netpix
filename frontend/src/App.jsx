import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Root from './Root';
import SignIn from './components/1_auth/SignIn';
import CreateUser from './components/2_users/CreateUser';

import Home from './components/Home';

function App() {
  const { user, isLoading } = useAuth();
  console.log(user);

  if (isLoading) return 'isLoading...'

  return (
    <Router>
      <Routes>

        <Route path='/' element={user ? <Root /> : <Navigate to='/sign-in' />}>
          <Route index element={<Home />} />
        </Route>

        <Route
          path='/sign-in'
          element={user ? <Navigate to='/' /> : <SignIn />}
        />

        <Route
          path='/create-user'
          element={user ? <Navigate to='/' /> : <CreateUser />}
        />

        {/* will need new creds and a 404*/}

      </Routes>
    </Router>
  );
};

export default App;
