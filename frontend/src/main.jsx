import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx';
import { SearchProvider } from './context/SearchContext.jsx';
import { ListProvider } from './context/ListContext.jsx';
import { ModalProvider } from './context/ModalContext.jsx';
import App from './App.jsx'
import './main.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SearchProvider>
        <ListProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </ListProvider>
      </SearchProvider >
    </AuthProvider>
  </StrictMode>,
)
