import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './utils/store'
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <Router basename='/react-burger/'>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
