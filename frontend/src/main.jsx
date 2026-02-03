import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { ModalProvider } from './context/ModalContext';
import { SearchProvider } from './context/SearchContext';
import { ListProvider } from './context/ListContext';
import './main.scss';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ModalProvider>
        <SearchProvider>
          <ListProvider>
            <App />
          </ListProvider>
        </SearchProvider>
      </ModalProvider>
    </AuthProvider>
  </StrictMode>,
);
