import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Home from './pages/home/Home';
import Account from './pages/account/Account';
import AuthMain from './pages/auth/AuthMain';
import NotFound from './pages/notFound/NotFound';
import Root from './Root';

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

          <Route path='account' element={<Account />} />
        </Route>

        <Route path='/auth' element={user ? <Navigate to='/' replace /> : <AuthMain />} />


        <Route path='/not-found' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/not-found' replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
