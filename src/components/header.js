/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useContext } from 'react';
import * as ROUTES from '../constants/routes';
import { Link } from 'react-router-dom';
import FirebaseContext from '../context/firebaseContext';
import UserContext from '../context/userContext';
import LogInLogo from '../assets/images/logo.png';
import { getAuth, signOut } from 'firebase/auth';

export default function Header() {
  const { firebase } = useContext(FirebaseContext);
  const auth = getAuth();
  const user = useContext(UserContext);

  return (
    <header className="h-16 bg-white border-b mb-8  ">
      <div className="container mx-auto max-width-lg h-full px-10">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1>
              <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                <img src={LogInLogo} alt="Instagram" className="mt-2 w-6/12" />
              </Link>
            </h1>
          </div>
          <div className="text-gray text-ce nter flex items-center align-items">
            {user ? (
              <>
                <div className="flex flex-row items-center gap-6 ">
                  <Link to={ROUTES.DASHBOARD} arial-label="Home">
                    <svg
                      className="w-6  fill-transparent hover:fill-black  cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"
                      />
                    </svg>
                  </Link>
                  <button
                    type="button"
                    title="Sign Out  "
                    onClick={() => signOut(auth)}
                  >
                    <svg
                      className="w-8 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                  <div className="flex items-center cursor-pointer ">
                    <Link to={`/p/${user.displayName}`}>
                      <img
                        className="rounded-full h-8 w-8 flex hover:ring-1 ring-offset-2 hover:ring-neutral-600"
                        src={require(`../assets/images/avatars/${user.photoURL}.jpg`)}
                        alt={`${user.displayName} profile picture`}
                      />
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-500 active:opacity-50 font-semibold text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="font-semibold active:opacity-50 text-sm rounded text-blue w-20 h-8 text-blue-500"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
