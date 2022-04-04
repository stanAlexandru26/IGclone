/* eslint-disable no-unused-vars */
import React from 'react';
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/userContext';
import useAuthListener from './hooks/useAuth';

const Dashboard = lazy(() => import('./pages/dashboard'));
const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signup'));
const PasswordReset = lazy(() => import('./pages/passwordReset'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/notFound'));

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useAuthListener();
    const location = useLocation();

    if (!user) {
      return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
    }

    return children;
  };

  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={user}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTES.PASSWORD_RESET} element={<PasswordReset />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;

