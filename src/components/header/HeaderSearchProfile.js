import React from 'react';
import { Link } from 'react-router-dom';
import useFirebaseStorage from '../../hooks/useFirebaseStorage';
export default function HeaderSearchProfile({
  username,
  followers,
  profileImgSrc,
  fullName,
}) {
  const { photoFirebaseUrl } = useFirebaseStorage(profileImgSrc, 'avatar');
  return (
    <div className="z-50 w-full px-4 py-2 active:bg-slate-200 ">
      <Link to={`/${username}/posts`}>
        <div className="flex items-center gap-6">
          <img
            src={photoFirebaseUrl}
            alt="Profile avatar"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col ">
            <span className="font-semibold">{username}</span>
            <span className="text-sm text-gray-400">{fullName}</span>
            {followers.length > 0 && (
              <span className="text-xs text-gray-400">
                Followed by {followers.length}{' '}
                {followers.length > 1 ? 'persons' : 'person '}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
