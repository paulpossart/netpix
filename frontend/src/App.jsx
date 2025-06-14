import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Root from './components/root/Root';
import Home from './components/home/Home';
import Account from './components/account/Account';
import Overview from './components/account/accOverview/AccOverview';
import Security from './components/account/accOverview/Security';
import Membership from './components/account/accOverview/Membership';
import UpdateUsername from './components/account/accOverview/UpdateUsername';
import UpdatePassword from './components/account/accOverview/UpdatePassword';
import AuthPage from './components/auth/AuthPage';
import Loader from './components/utils/loader/Loader';
import NotFound from './components/notFound/NotFound';

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

        <Route path='/not-found' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/not-found' replace />} />

      </Routes>
    </Router>
  );
};

export default App;
