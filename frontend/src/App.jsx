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
import Account from './components/root/account/Account';
import Overview from './components/root/account/AccOverview';
import Security from './components/root/account/Security';
import Membership from './components/root/account/Membership';
import UpdateUsername from './components/root/account/UpdateUsername';
import UpdatePassword from './components/root/account/UpdatePassword';

import Loader from './components/utils/loader/Loader';

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  return (
    <Router>
      <Routes>

        <Route path='/' element={user ? <Root /> : <Navigate to='/auth' />}>
          <Route index element={<Home />} />
          <Route path='account' element={<Account />}>
            <Route index element={<Overview />} />

            <Route path='security' element={<Security />}>
              <Route path='update-username' element={<UpdateUsername />} />
              <Route path='update-password' element={<UpdatePassword />} />
            </Route>

            <Route path='membership' element={<Membership />} />
          </Route>
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
