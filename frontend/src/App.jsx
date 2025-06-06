import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Root from './components/root/Root';
import AuthPage from './components/auth/AuthPage';

import Home from './components/root/home/Home';
import Account from './components/root/account/Acount';

import Loader from './components/utils/loader/Loader';

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  return (
    <Router>
      <Routes>

        <Route path='/' element={user ? <Root /> : <Navigate to='/auth' />}>
          <Route index element={<Home />} />
          <Route path='account' element={user ? <Account /> : <Navigate to='/auth' />} />
        </Route>

        <Route
          path='/auth'
          element={user ? <Navigate to='/' /> : <AuthPage />}
        />

        {/* will need new creds and a 404*/}

      </Routes>
    </Router>
  );
};

export default App;
