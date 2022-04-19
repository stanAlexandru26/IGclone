import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getCurrentUserFirestoreData,
  followUser,
} from '../../../utils/firebaseUilts';
import useFirebaseStorage from '../../../hooks/useFirebaseStorage';
export default function SuggestedProfile({
  userDocId,
  username,
  profileId,
  userId,
  profileImgSrc,
}) {
  const [followed, setFollowed] = useState(false);
  const { photoFirebaseUrl } = useFirebaseStorage(profileImgSrc, 'avatar');

  async function handleFollowUser() {
    setFollowed(true);

    const [{ docId }] = await getCurrentUserFirestoreData(userId);
    await followUser(docId, userId, userDocId, profileId);
  }

  return !followed ? (
    <div className="flex items-center gap-3">
      <Link to={`/${username}/posts`}>
        <img
          className="h-8 w-8 rounded-full border-2"
          src={photoFirebaseUrl}
          alt={`Follow ${username}`}
        />
      </Link>
      <div className="flex flex-auto flex-col">
        <Link to={`/${username}/posts`}>
          <span className="text-sm font-semibold">{username}</span>
        </Link>
        <span className="text-xs text-gray-400">Followed by</span>
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
