import React from 'react';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/userContext';
import useAuthListener from './hooks/useAuth';

const Dashboard = lazy(() => import('./pages/dashboard'));
const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signup'));
const PasswordReset = lazy(() => import('./pages/passwordReset'));

function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={user}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTES.PASSWORD_RESET} element={<PasswordReset />} />
        </Routes>
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
