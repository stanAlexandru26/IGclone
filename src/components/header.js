import React, { useContext } from 'react';
import * as ROUTES from '../constants/routes';
import { Link } from 'react-router-dom';
import UserContext from '../context/userContext';
import LogInLogo from '../assets/images/logo.png';
import { getAuth, signOut } from 'firebase/auth';
import useOutsideClick from '../hooks/useOutsideClick';

export default function Header() {
  const auth = getAuth();
  const user = useContext(UserContext);
  const { ref, visible, setVisible } = useOutsideClick(false);

  return (
    <header className="w-screen bg-white border-b mb-8">
      <div className=" h-14 w-8/12 mx-auto">
        <div className="h-full flex items-center justify-between mx-auto ">
          <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
            <img src={LogInLogo} alt="Instagram" className="mt-2 w-6/12" />
          </Link>

          <div className="text-gray text-center flex items-center align-items">
            {user ? (
              <>
                <div className="flex flex-row items-center gap-6 ">
                  <Link to={ROUTES.DASHBOARD} arial-label="Home">
                    <svg
                      className={`w-6  fill-transparent   cursor-pointer ${
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
                  <Link to={''} arial-label="New Post">
                    <svg
                      aria-label="New Post"
                      color="#262626"
                      fill="#262626"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path
                        d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                      <line
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        x1="6.545"
                        x2="17.455"
                        y1="12.001"
                        y2="12.001"
                      ></line>
                      <line
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        x1="12.003"
                        x2="12.003"
                        y1="6.545"
                        y2="17.455"
                      ></line>
                    </svg>
                  </Link>
                  <Link to={''} arial-label="Explore">
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

                  <div className="flex items-center cursor-pointer relative">
                    <Link to={`/p/${user.displayName}`} />
                    <img
                      className={`rounded-full h-8 w-8    ${
                        visible ? 'ring-neutral-600 ring-1 ring-offset-2' : null
                      } `}
                      src={require(`../assets/images/avatars/${user.photoURL}.jpg`)}
                      alt={`${user.displayName} profile picture`}
                      onClick={() => setVisible(!visible)}
                    />
                    <div
                      ref={ref}
                      className={`absolute top-14 w-56 -left-44 bg-white rounded drop-shadow-[0_0_1px_rgba(0,0,0,0.25)] shadow-xl hover:cursor-pointer   ${
                        visible ? 'block' : 'hidden'
                      }`}
                    >
                      <div className="w-4 h-4 bg-white absolute rotate-45 -top-2 right-5  "></div>
                      <div className="divide-gray-200 divide-y  flex flex-col gap-2  ">
                        <ul className="flex flex-col rounded-lg  justify-center z-50 gap-2 ">
                          <Link
                            to={`/p/${user.displayName}`}
                            className="active:bg-gray-200 px-4 py-1 flex gap-2 items-center text-sm "
                          >
                            <svg
                              aria-label="Profile"
                              color="#262626"
                              fill="#262626"
                              height="16"
                              role="img"
                              viewBox="0 0 24 24"
                              width="16"
                            >
                              <circle
                                cx="12.004"
                                cy="12.004"
                                fill="none"
                                r="10.5"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                              ></circle>
                              <path
                                d="M18.793 20.014a6.08 6.08 0 00-1.778-2.447 3.991 3.991 0 00-2.386-.791H9.38a3.994 3.994 0 00-2.386.791 6.09 6.09 0 00-1.779 2.447"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                              ></path>
                              <circle
                                cx="12.006"
                                cy="9.718"
                                fill="none"
                                r="4.109"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                              ></circle>
                            </svg>
                            Profile
                          </Link>

                          <Link
                            to={''}
                            className="active:bg-gray-200 px-4 py-1 flex gap-2 items-center text-sm "
                          >
                            <svg
                              aria-label="Saved"
                              color="#262626"
                              fill="#262626"
                              height="16"
                              role="img"
                              viewBox="0 0 24 24"
                              width="16"
                            >
                              <polygon
                                fill="none"
                                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              ></polygon>
                            </svg>{' '}
                            Saved
                          </Link>

                          <Link
                            to={''}
                            className="active:bg-gray-200 px-4 py-1 flex gap-2 items-center text-sm"
                          >
                            <svg
                              aria-label="Settings"
                              color="#262626"
                              fill="#262626"
                              height="16"
                              role="img"
                              viewBox="0 0 24 24"
                              width="16"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                fill="none"
                                r="8.635"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              ></circle>
                              <path
                                d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                                fill="none"
                                stroke="currentColor"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              ></path>
                            </svg>
                            Settings
                          </Link>

                          <Link
                            to={''}
                            className="active:bg-gray-200 px-4 py-1 flex gap-2 items-center text-sm"
                          >
                            <svg
                              aria-label="Switch Accounts"
                              color="#262626"
                              fill="#262626"
                              height="16"
                              role="img"
                              viewBox="0 0 24 24"
                              width="16"
                            >
                              <path d="M8 8.363a1 1 0 00-1-1H4.31a8.977 8.977 0 0114.054-1.727 1 1 0 101.414-1.414A11.003 11.003 0 003 5.672V3.363a1 1 0 10-2 0v5a1 1 0 001 1h5a1 1 0 001-1zm14 6.274h-5a1 1 0 000 2h2.69a8.977 8.977 0 01-14.054 1.727 1 1 0 00-1.414 1.414A11.004 11.004 0 0021 18.33v2.307a1 1 0 002 0v-5a1 1 0 00-1-1z"></path>
                            </svg>
                            Switch Accounts
                          </Link>
                        </ul>
                        <div
                          className="active:bg-gray-200 px-4 py-2 text-sm  "
                          onClick={() => signOut(auth)}
                        >
                          Log Out
                        </div>
                      </div>
                    </div>
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
{
  /* <div
  id="dropdown"
  className={`absolute top-16 right-3    bg-white rounded  divide-gray-200 drop-shadow-[0_0_1px_rgba(0,0,0,0.25)]   ${
    isOpen ? 'block' : 'hidden'
  }`}
>
  <div className="w-4 h-4 bg-white absolute rotate-45 -top-1  right-5  "></div>
  <ul
    className="flex flex-col px-4 py-2 gap-2 items-left justify-center"
    aria-labelledby="dropdownDividerButton"
  >
    <li>
      <Link to={`/p/${user.displayName}`}>Profile</Link>
    </li>
    <li>
      <a href="#" className=" ">
        Saved
      </a>
    </li>
    <li>
      <a href="#" className="flex ">
        Settings
      </a>
    </li>
    <li>
      <a href="#" className=" ">
        Switch Account
      </a>
    </li>
  </ul>
  <div className="py-1">
    <a
      href="#"
      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 "
    >
      Log Out
    </a>
  </div>
</div>; */
}
