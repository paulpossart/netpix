import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import AuthMain from './pages/auth/AuthMain';
import NotFound from './pages/notFound/NotFound';

import Root from './Root';
import Home from './pages/home/Home';

import Account from './pages/account/Account';
import AccOverview from './pages/account/AccOverview';
import Membership from './pages/account//security&Membership/Membership';
import Security from './pages/account/security&Membership/Security';
import UpdatePassword from './pages/account/security&Membership/UpdatePassword';
import UpdateUsername from './pages/account/security&Membership/UpdateUsername';

import Loader from './components/loader/Loader';

import { useAuth } from './context/AuthContext';

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={user ? <Root /> : <Navigate to='/auth' replace />}>
          <Route index element={<Home />} />

          <Route path='account' element={<Account />}>
            <Route index element={<AccOverview />} />
            <Route path='security' element={<Security />}>
              <Route path='update-username' element={<UpdateUsername />} />
              <Route path='update-password' element={<UpdatePassword />} />
            </Route>
            <Route path='membership' element={<Membership />} />
          </Route>
        </Route>

        <Route path='/auth' element={user ? <Navigate to='/' replace /> : <AuthMain />} />


        <Route path='/not-found' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/not-found' replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
