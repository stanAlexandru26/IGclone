import React, { useContext } from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import LogInLogo from '../../assets/images/logo.png';
import HeaderUserAction from './HeaderUserAction';
import useOutsideClick from '../../hooks/useOutsideClick';
import HeaderNewPostModal from './HeaderNewPostModal';
import { ReactComponent as HeaderHomeIcon } from '../../assets/svg/HeaderHomeIcon.svg';
import { ReactComponent as HeaderExploreIcon } from '../../assets/svg/HeaderExploreIcon.svg';

export default function Header() {
  const user = useContext(UserContext);

  const { objectReference, visible, setVisible } = useOutsideClick(false);

  return (
    <header className="mb-4 w-screen border-b bg-white md:mb-8">
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
                    <HeaderHomeIcon
                      className={`w-6 cursor-pointer   fill-transparent ${
                        visible ? 'fill-none' : 'fill-black'
                      }`}
                    />
                  </Link>

                  <HeaderNewPostModal />

                  <Link to={ROUTES.EXPLORE} arial-label="Explore">
                    <HeaderExploreIcon />
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
