import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

import Loader from './components/loader/Loader';
import { useAuth } from './context/AuthContext';

function App() {
  const { isLoading } = useAuth();

  if (isLoading) return <Loader />;

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App
