import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getCurrentUserFirestoreData,
  followUser,
} from '../../utils/firebaseUilts';
import useFirebaseStorage from '../../hooks/useFirebaseStorage';

export default function SuggestedProfile({
  userDocId,
  username,
  profileId,
  userId,
}) {
  const [followed, setFollowed] = useState(false);
  const { photoFirebaseUrl } = useFirebaseStorage(profileId, 'avatar');

  async function handleFollowUser() {
    setFollowed(true);

    const [{ docId }] = await getCurrentUserFirestoreData(userId);
    await followUser(docId, userId, userDocId, profileId);
  }

  return !followed ? (
    <div className="flex items-center gap-3">
      <Link to={`/p/${username}`}>
        <img
          className="rounded-full w-8 h-8 border-2"
          src={photoFirebaseUrl}
          alt={`Follow ${username}`}
        />
      </Link>
      <div className="flex flex-col flex-auto">
        <Link to={`/p/${username}`}>
          <span className="font-semibold text-sm">{username}</span>
        </Link>
        <span className="text-gray-400 text-xs">Followed by</span>
      </div>
      <button
        className="text-sm font-semibold text-blue-400 "
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
}
