import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { config } from './config';
import { initializeAnalytics } from './lib/analytics';
import App from './App';
import './index.css';

if (config.sentry.enabled && config.sentry.dsn) {
  Sentry.init({
    dsn: config.sentry.dsn,
    environment: config.env,
    enabled: config.sentry.enabled,
  });
}

initializeAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);