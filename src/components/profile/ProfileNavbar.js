import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
    <div className="mx-auto mb-4 flex w-8/12 flex-row justify-evenly border-b md:my-8 md:border-t md:border-b-0">
      {/* Post */}
      <div
        className={` flex h-full basis-1/3 justify-center  border-t  border-transparent  p-4  ${
          activeProfile ? 'md:border-black' : ''
        }`}
      >
        <Link to={`/${profileUrl}/posts`}>
          <div className="flex flex-row items-center gap-2   ">
            <svg
              className={`h-6 w-6  md:h-4 md:w-4  ${
                activeProfile ? 'text-blue-500 md:text-black' : 'text-slate-500'
              }`}
              color="#262626"
              fill="#262626"
              viewBox="0 0 24 24"
            >
              <rect
                fill="none"
                height="18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                width="18"
                x="3"
                y="3"
              ></rect>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="9.015"
                x2="9.015"
                y1="3"
                y2="21"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="14.985"
                x2="14.985"
                y1="3"
                y2="21"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="21"
                x2="3"
                y1="9.015"
                y2="9.015"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="21"
                x2="3"
                y1="14.985"
                y2="14.985"
              ></line>
            </svg>
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
              <svg
                className={`h-6 w-6  md:h-4 md:w-4  ${
                  activeSaved ? 'text-blue-500 md:text-black' : 'text-slate-500'
                }`}
                fill="#8e8e8e"
                role="img"
                viewBox="0 0 24 24"
                width="12 "
              >
                <polygon
                  fill="none"
                  points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></polygon>
              </svg>
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
            <svg
              className={`h-6 w-6  md:h-4 md:w-4  ${
                activeTagged ? 'text-blue-500 md:text-black' : 'text-slate-500'
              }`}
              fill="#8e8e8e"
              height="12"
              viewBox="0 0 24 24"
              width="12"
            >
              <path
                d="M10.201 3.797L12 1.997l1.799 1.8a1.59 1.59 0 001.124.465h5.259A1.818 1.818 0 0122 6.08v14.104a1.818 1.818 0 01-1.818 1.818H3.818A1.818 1.818 0 012 20.184V6.08a1.818 1.818 0 011.818-1.818h5.26a1.59 1.59 0 001.123-.465z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <path
                d="M18.598 22.002V21.4a3.949 3.949 0 00-3.948-3.949H9.495A3.949 3.949 0 005.546 21.4v.603"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <circle
                cx="12.072"
                cy="11.075"
                fill="none"
                r="3.556"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></circle>
            </svg>
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
