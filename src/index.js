import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import FirebaseContext from './context/firebaseContext';
import { firebase, db } from './firebase/firebase';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={(firebase, db)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
