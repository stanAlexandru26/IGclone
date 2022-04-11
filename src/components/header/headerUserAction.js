import React from 'react';
import useFirebaseStorage from '../../hooks/useFirebaseStorage';
import useOutsideClick from '../../hooks/useOutsideClick';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

export default function HeaderUserAction({ user }) {
  const auth = getAuth();

  const { objectReference, visible, setVisible } = useOutsideClick(false);

  const { photoFirebaseUrl } = useFirebaseStorage(user.photoURL, 'avatar');
  return (
    <div className="relative flex cursor-pointer items-center">
      <Link to={`/p/${user.displayName}`} />
      <img
        className={`h-8 w-8 rounded-full ${
          visible ? 'ring-1 ring-neutral-600 ring-offset-2' : null
        } `}
        src={photoFirebaseUrl}
        alt={`${user.displayName} profile picture`}
        onClick={() => setVisible(!visible)}
      />
      <div
        ref={objectReference}
        className={`absolute top-14 -left-44 w-56 rounded bg-white shadow-xl drop-shadow-[0_0_1px_rgba(0,0,0,0.25)] hover:cursor-pointer   ${
          visible ? 'block' : 'hidden'
        }`}
      >
        <div className="absolute -top-2 right-5 h-4 w-4 rotate-45 bg-white  "></div>
        <div className="flex flex-col  divide-y divide-gray-200   ">
          <ul className="z-50 flex flex-col  justify-center rounded-lg  ">
            <Link
              to={`/p/${user.displayName}`}
              className="flex items-center gap-2 px-4 py-2 text-sm active:bg-gray-200 "
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
              to={ROUTES.ACCOUNT_SAVED}
              className="flex items-center gap-2 px-4 py-2 text-sm active:bg-gray-200 "
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
              to={ROUTES.ACCOUNT_SETTINGS}
              className="flex items-center gap-2 px-4 py-2 text-sm active:bg-gray-200"
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
              className="flex items-center gap-2 px-4 py-2 text-sm active:bg-gray-200"
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
            className="flex px-4 py-2 text-sm active:bg-gray-200  "
            onClick={() => signOut(auth)}
          >
            Log Out
          </div>
        </div>
      </div>
    </div>
  );
}
