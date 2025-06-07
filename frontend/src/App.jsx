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
import UpdateUser from './components/root/account/UpdateUser';
import DeleteUser from './components/root/account/DeleteUser';

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
            <Route path='update-user' element={<UpdateUser />} />
            <Route path='delete-user' element={<DeleteUser />} />
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
