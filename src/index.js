import React from 'react';
import ReactDOM from 'react-dom';
import { db, firebase, storage } from './firebase/firebase';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import FirebaseContext from './context/firebaseContext';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase, db, storage }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
