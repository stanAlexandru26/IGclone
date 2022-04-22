/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/userContext';
import useAuthListener from './hooks/useAuth';
import PageLoading from './components/loading/PageLoading';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signup'));
const PasswordReset = lazy(() => import('./pages/passwordReset'));
const NotFound = lazy(() => import('./pages/notFound'));
const About = lazy(() => import('./pages/about'));

const MainPage = lazy(() => import('./pages/main'));
const Dashboard = lazy(() => import('./components/dashboard'));

const ProfilePage = lazy(() => import('./pages/profile'));
const ProfilePosts = lazy(() => import('./components/profile/ProfilePosts'));
const ProfileSaved = lazy(() => import('./components/profile/ProfileSaved'));
const AccountSettingsPage = lazy(() => import('./pages/accountSettings'));
const AccountEdit = lazy(() =>
  import('./components/account-settings/AccountEdit'),
);
const AccountPassword = lazy(() =>
  import('./components/account-settings/AccountPassword'),
);

const Explore = lazy(() => import('./pages/explore'));
const SinglePost = lazy(() => import('./pages/post'));

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
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path={ROUTES.DASHBOARD} element={<MainPage />}>
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path={ROUTES.POST} element={<SinglePost />} />

            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.EXPLORE} element={<Explore />} />
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
            </Route>
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />}>
              <Route
                path={ROUTES.PROFILE_POSTS}
                index
                element={<ProfilePosts />}
              />
              <Route
                path={ROUTES.PROFILE_SAVED}
                element={
                  <ProtectedRoute>
                    <ProfileSaved />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>

          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTES.PASSWORD_RESET} element={<PasswordReset />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
