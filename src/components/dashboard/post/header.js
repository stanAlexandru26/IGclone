import React from 'react';
import { Link } from 'react-router-dom';
import useFirebaseStorage from '../../../hooks/useFirebaseStorage';

export default function Header({ username, imageSrc }) {
  const { photoFirebaseUrl } = useFirebaseStorage(imageSrc, 'avatar');

  return (
    <div className="flex border-b p-4">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            className="mr-3 flex h-8 w-8 rounded-full"
            src={photoFirebaseUrl}
            alt={`${username} profile picture`}
          />
          <p className="font-semibold">{username}</p>
        </Link>
      </div>
    </div>
  );
}
