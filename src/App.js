import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AccountEdit from './components/account-settings/AccountEdit';
import AccountPassword from './components/account-settings/AccountPassword';
import * as ROUTES from './constants/routes';
import UserContext from './context/userContext';
import useAuthListener from './hooks/useAuth';

const Dashboard = lazy(() => import('./pages/dashboard'));
const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signup'));
const PasswordReset = lazy(() => import('./pages/passwordReset'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/notFound'));
const AccountSettingsPage = lazy(() => import('./pages/accountSettings'));
const ProfileSaved = lazy(() => import('./pages/profileSaved'));
const Explore = lazy(() => import('./pages/explore'));
const Post = lazy(() => import('./pages/post'));
const About = lazy(() => import('./pages/about'));

function App() {
  const { user } = useAuthListener();

  const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    if (!user) {
      return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
    }

    return children;
  };

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
          <Route
            path={ROUTES.ACCOUNT_SETTINGS}
            element={
              <ProtectedRoute>
                <AccountSettingsPage />
              </ProtectedRoute>
            }
          >
            <Route
              path={ROUTES.ACCOUNT_SETTINGS_EDIT}
              index
              element={
                <ProtectedRoute>
                  <AccountEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.ACCOUNT_SETTINGS_PASSWORD}
              element={
                <ProtectedRoute>
                  <AccountPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={<Navigate to={ROUTES.ACCOUNT_SETTINGS_EDIT} replace />}
            />
          </Route>

          <Route path={ROUTES.EXPLORE} element={<Explore />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.PROFILE} element={<Profile />}>
            <Route
              path={ROUTES.ACCOUNT_SAVED}
              element={
                <ProtectedRoute>
                  <ProfileSaved />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTES.PASSWORD_RESET} element={<PasswordReset />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          <Route path={ROUTES.POST} element={<Post />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
        </Routes>
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
