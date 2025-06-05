import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Root from './Root';
import AuthPage from './components/1_auth/AuthPage';

import Home from './components/Home';

function App() {
  const { user, isLoading } = useAuth();
  console.log(user);

  if (isLoading) return 'isLoading...'

  return (
    <Router>
      <Routes>

        <Route path='/' element={user ? <Root /> : <Navigate to='/auth' />}>
          <Route index element={<Home />} />
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
