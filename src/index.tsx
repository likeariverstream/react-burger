import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './utils/store'
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={`469835538565-dkc7lgso0391d1l4u8l1uevshamo3bel.apps.googleusercontent.com`}>
        <App />
        </GoogleOAuthProvider>
      </Provider>
    </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
