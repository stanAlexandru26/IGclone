import React from 'react';
import { Link } from 'react-router-dom';
import useFirebaseStorage from '../../../hooks/useFirebaseStorage';

export default function SidebarUserHeader({ username, fullName, imageSrc }) {
  const { photoFirebaseUrl } = useFirebaseStorage(imageSrc, 'avatar');
  return (
    <>
      <div>
        <Link to={`/${username}/posts`}>
          <div className="flex items-center gap-6">
            <img
              src={photoFirebaseUrl}
              alt="Profile avatar"
              className="h-16 w-16 rounded-full"
            />
            <div className="flex flex-col ">
              <span className="font-semibold">{username}</span>
              <span className="text-sm text-gray-400">{fullName}</span>
              
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
