import React from 'react';
import { Link } from 'react-router-dom';
import useFirebaseStorage from '../../hooks/useFirebaseStorage';

export default function Header({ username, userId }) {
  const { photoFirebaseUrl } = useFirebaseStorage(userId, 'avatar');
  
  return (
    <div className="flex p-4 border-b">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            src={photoFirebaseUrl}
            alt={`${username} profile picture`}
          />
          <p className="font-semibold">{username}</p>
        </Link>
      </div>
    </div>
  );
}
