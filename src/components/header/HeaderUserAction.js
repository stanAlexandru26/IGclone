import React from 'react';
import useFirebaseStorage from '../../hooks/useFirebaseStorage';
import useOutsideClick from '../../hooks/useOutsideClick';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
// SVG //
import { ReactComponent as HeaderActionProfileIcon } from '../../assets/svg/HeaderActionProfileIcon.svg';
import { ReactComponent as HeaderActionSavedIcon } from '../../assets/svg/HeaderActionSavedIcon.svg';
import { ReactComponent as HeaderActionSettingsIcon } from '../../assets/svg/HeaderActionSettingsIcon.svg';
import { ReactComponent as HeaderActionAboutIcon } from '../../assets/svg/HeaderActionAboutIcon.svg';

export default function HeaderUserAction({ user }) {
  const auth = getAuth();

  const { objectReference, visible, setVisible } = useOutsideClick(false);

  const { photoFirebaseUrl } = useFirebaseStorage(user.photoURL, 'avatar');

  return (
    <div className="relative flex min-w-max cursor-pointer items-center">
      <Link to={`/p/${user.displayName}`} />
      <img
        className={`h-8 w-8 rounded-full  ${
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
              to={`/${user.displayName}/posts`}
              className="flex items-center gap-2 px-4 py-2 text-sm active:bg-gray-200 "
            >
              <HeaderActionProfileIcon />
              Profile
            </Link>

            <Link
              to={`/${user.displayName}/saved`}
              className="flex items-center gap-2 px-4 py-2 text-sm active:bg-gray-200 "
            >
              <HeaderActionSavedIcon />
              Saved
            </Link>

            <Link
              to={ROUTES.ACCOUNT_SETTINGS_EDIT}
              className="flex items-center gap-2 px-4 py-2 text-sm active:bg-gray-200"
            >
              <HeaderActionSettingsIcon />
              Settings
            </Link>

            <Link
              to={ROUTES.ABOUT}
              className="flex items-center gap-2 px-4 py-2 text-sm active:bg-gray-200"
            >
              <HeaderActionAboutIcon />
              About the project
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
