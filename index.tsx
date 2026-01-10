import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import App from './App';
import { store } from './store';
import { monitoringService } from './services/monitoring.service';

// Initialize production monitoring
monitoringService.init();

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Could not find root element");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
        <Toaster position="top-right" richColors />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);