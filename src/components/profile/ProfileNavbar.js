import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as ProfileNavbarPostIcon } from '../../assets/svg/ProfileNavbarPostIcon.svg';
import { ReactComponent as ProfileNavbarTaggedIcon } from '../../assets/svg/ProfileNavbarTaggedIcon.svg';
import { ReactComponent as ProfileNavbarSavedIcon } from '../../assets/svg/ProfileNavbarSavedIcon.svg';

export default function ProfileNavbar({ isLoggedInUser, profileUrl }) {
  const location = useLocation();
  const [activeProfile, setActiveProfile] = useState(false);
  const [activeSaved, setActiveSaved] = useState(false);
  const [activeTagged, setActiveTagged] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('posts')) {
      setActiveProfile(true);
      setActiveSaved(false);
      setActiveTagged(false);
    } else if (location.pathname.includes('saved')) {
      setActiveSaved(true);
      setActiveTagged(false);
      setActiveProfile(false);
    } else if (location.pathname.includes('tagged')) {
      setActiveTagged(true);
      setActiveProfile(false);
      setActiveSaved(false);
    } else {
      setActiveProfile(false);
      setActiveSaved(false);
      setActiveTagged(false);
    }
  }, [location]);

  return (
    <div className="mx-auto mb-4 flex w-8/12 flex-row justify-between border-b md:my-8 md:border-t md:border-b-0">
      {/* Post */}
      <div
        className={` flex h-full basis-1/3 justify-center  border-t  border-transparent  p-4  ${
          activeProfile ? 'md:border-black' : ''
        }`}
      >
        <Link to={`/${profileUrl}/posts`}>
          <div className="flex flex-row items-center gap-2   ">
            <ProfileNavbarPostIcon
              className={`h-6 w-6  md:h-4 md:w-4  ${
                activeProfile ? 'text-blue-500 md:text-black' : 'text-slate-500'
              }`}
            />
            <h1
              className={`hidden text-xs font-semibold uppercase md:block ${
                activeProfile ? '' : 'text-slate-500'
              }`}
            >
              Posts
            </h1>
          </div>
        </Link>
      </div>
      {/* Saved */}
      {isLoggedInUser && (
        <div
          className={` flex h-full basis-1/3 justify-center  border-t  border-transparent  p-4  ${
            activeSaved ? 'md:border-black' : ''
          }`}
        >
          <Link to={`/${profileUrl}/saved`}>
            <div className="flex flex-row items-center gap-2">
              <ProfileNavbarSavedIcon
                className={`h-6 w-6  md:h-4 md:w-4  ${
                  activeSaved ? 'text-blue-500 md:text-black' : 'text-slate-500'
                }`}
              />
              <h1
                className={`hidden text-xs font-semibold uppercase md:block ${
                  activeSaved ? '' : 'text-slate-500'
                }`}
              >
                Saved
              </h1>
            </div>
          </Link>
        </div>
      )}
      {/* Tagged */}
      <div
        className={` flex h-full basis-1/3 justify-center  border-t  border-transparent  p-4  ${
          activeTagged ? 'md:border-black' : ''
        }`}
      >
        <Link to={''}>
          <div className="flex flex-row items-center gap-2 ">
            <ProfileNavbarTaggedIcon
              className={`h-6 w-6  md:h-4 md:w-4  ${
                activeTagged ? 'text-blue-500 md:text-black' : 'text-slate-500'
              }`}
            />
            <h1
              className={`hidden text-xs font-semibold uppercase md:block ${
                activeTagged ? '' : 'text-slate-500'
              }`}
            >
              Tagged
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
}
