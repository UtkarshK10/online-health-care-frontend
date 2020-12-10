import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './contexts/auth-context';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Offline, Online } from 'react-detect-offline';

ReactDOM.render(
  // <React.StrictMode>
  <>
    <Online>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Online>
    <Offline>
      <div
        className='container offline'
        style={{ width: '100vw', height: '90vh' }}
      >
        <div className='row '>
          <div className='center'>
            <h3>You're currently offline.</h3>
            <i className='material-icons' style={{ fontSize: '4em' }}>
              sentiment_very_dissatisfied
            </i>
          </div>
        </div>
      </div>
    </Offline>
  </>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
