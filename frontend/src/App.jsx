import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Home from './components/home/Home';
import AuthMain from './components/auth/AuthMain';
import Root from './Root';
import NotFound from './components/auth/NotFound';

import { useAuth } from './context/AuthContext';

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <p>loading...</p>;

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={user ? <Root user={user} /> : <Navigate to='/auth' replace />}>
          <Route index element={<Home />} />
        </Route>

        <Route path='/auth' element={user ? <Navigate to='/' replace /> : <AuthMain />} />

        <Route path='*' element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
