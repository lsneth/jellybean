import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { LoadingProvider } from './providers/LoadingProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <LoadingProvider>
    <App />
  </LoadingProvider>
);
