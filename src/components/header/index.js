import React, { useContext } from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import LogInLogo from '../../assets/images/logo.png';
import HeaderUserAction from './headerUserAction';
import useOutsideClick from '../../hooks/useOutsideClick';
import NewPostModal from './NewPostModal';

export default function Header() {
  const user = useContext(UserContext);

  const { objectReference, visible, setVisible } = useOutsideClick(false);

  return (
    <header className="mb-8 w-screen border-b bg-white">
      <div className=" mx-auto h-14 w-8/12">
        <div className="mx-auto flex h-full items-center justify-between ">
          <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
            <img src={LogInLogo} alt="Instagram" className="mt-2 w-6/12" />
          </Link>

          <div className="text-gray align-items flex items-center text-center">
            {user ? (
              <>
                <div className="flex flex-row items-center gap-6 ">
                  <Link to={ROUTES.DASHBOARD} arial-label="Home">
                    <svg
                      className={`w-6  cursor-pointer   fill-transparent ${
                        visible ? 'fill-none' : 'fill-black'
                      }`}
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

                  <NewPostModal />

                  <Link to={ROUTES.EXPLORE} arial-label="Explore">
                    <svg
                      aria-label="Find People"
                      color="#262626"
                      fill="#262626"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <polygon
                        fill="none"
                        points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></polygon>
                      <polygon
                        fillRule="evenodd"
                        points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"
                      ></polygon>
                      <circle
                        cx="12.001"
                        cy="12.005"
                        fill="none"
                        r="10.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></circle>
                    </svg>
                  </Link>

                  <HeaderUserAction
                    user={user}
                    objectReference={objectReference}
                    visible={visible}
                    setVisible={setVisible}
                  />
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="h-8 w-20 rounded bg-blue-500 text-sm font-semibold text-white active:opacity-50"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="text-blue h-8 w-20 rounded text-sm font-semibold text-blue-500 active:opacity-50"
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
