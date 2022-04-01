import React from 'react';
import { Link } from 'react-router-dom';

export default function User({ username, fullName }) {
  return (
    <>
      <div>
        <Link to={`/p/${username}`}>
          <div className="flex gap-6 items-center">
            <img
              src={require(`../../assets/images/avatars/${username}.jpg`)}
              alt="Profile avatar"
              className="rounded-full w-16"
            />
            <div className="flex flex-col ">
              <span className="font-semibold">{username}</span>
              <span className="text-gray-400 text-sm">{fullName}</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
