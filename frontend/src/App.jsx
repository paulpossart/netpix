import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Root from './components/root/Root';
import AuthPage from './components/auth/AuthPage';

import Home from './components/home/Home';
import Account from './components/account/Account';
import Overview from './components/account/AccOverview';
import Security from './components/account/Security';
import Membership from './components/account/Membership';
import UpdateUsername from './components/account/UpdateUsername';
import UpdatePassword from './components/account/UpdatePassword';

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

        {/* will need a 404*/}

      </Routes>
    </Router>
  );
};

export default App;
