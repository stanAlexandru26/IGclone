import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

export default function AccountSettings() {
  const location = useLocation();

  const [editActive, setEditActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);

  useEffect(() => {
    if (location.pathname === ROUTES.ACCOUNT_SETTINGS_EDIT) {
      setEditActive(true);
      setPasswordActive(false);
    } else if (location.pathname === ROUTES.ACCOUNT_SETTINGS_PASSWORD) {
      setPasswordActive(true);
      setEditActive(false);
    } else {
      setEditActive(false);
      setPasswordActive(false);
    }
  }, [location]);

  return (
    <>
      <div className="mb-4 flex h-screen flex-col md:mx-auto md:w-8/12 md:flex-row md:divide-x-2 md:rounded md:border-2">
        {/* Navbar */}
        <div className="flex flex-row justify-center md:basis-2/6 md:flex-col  md:justify-start">
          <Link to={ROUTES.ACCOUNT_SETTINGS_EDIT}>
            <div
              className={`p-4 font-semibold active:opacity-60 ${
                editActive
                  ? 'border-t-2 border-black md:border-l-2 md:border-t-0'
                  : ''
              }`}
            >
              Edit Profile
            </div>
          </Link>

          <Link to={ROUTES.ACCOUNT_SETTINGS_PASSWORD}>
            <div
              className={`p-4 font-semibold active:opacity-60 ${
                passwordActive
                  ? 'border-t-2 border-black md:border-l-2 md:border-t-0'
                  : ''
              }`}
            >
              Change Password
            </div>
          </Link>
        </div>
        {/* Main */}
        <div className="h-full w-full p-4 md:flex md:items-start md:justify-center ">
          <Outlet />
        </div>
      </div>
    </>
  );
}
