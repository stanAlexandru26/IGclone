import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/userContext';
import { followUser, unfollowUser } from '../../utils/firebaseUilts';
import useUser from '../../hooks/useUser';
import useFirebaseStorage from '../../hooks/useFirebaseStorage';

export default function ProfileUserHeader({
  photosCount,
  followerCount,
  setFollowerCount,
  followers = [],
  username,
  profile,
}) {
  const firebaseUser = useContext(UserContext);
  const firebaseUserTest = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const { photoFirebaseUrl } = useFirebaseStorage(profile.userId, 'avatar');

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      profileFollowerCount: isFollowingProfile
        ? followerCount - 1
        : followerCount + 1,
    });
    if (isFollowingProfile) {
      await unfollowUser(
        firebaseUserTest.docId,
        firebaseUserTest.userId,
        profile.docId,
        profile.userId,
      );
    }
    if (!isFollowingProfile) {
      await followUser(
        firebaseUserTest.docId,
        firebaseUserTest.userId,
        profile.docId,
        profile.userId,
      );
    }
  };
  useEffect(() => {
    const isFollowing = followers.includes(firebaseUser.uid);
    setIsFollowingProfile(isFollowing);
  }, [profile]);

  return (
    <div className="flex flex-row gap-8 mx-auto ">
      <div className=" ">
        <img
          className="rounded-full h-40 w-40 "
          alt={`${username} profile picture`}
          src={photoFirebaseUrl}
        />
      </div>
      <div className="flex items-center justify-center flex-col gap-4">
        <div className="container flex items-center gap-4">
          <p className="text-2xl ">{username}</p>

          <button
            className="bg-blue-500 font-bold text-sm rounded text-white w-20 h-8"
            type="button"
            onClick={handleToggleFollow}
          >
            {isFollowingProfile ? 'Unfollow' : 'Follow'}
          </button>
        </div>
        <div className="container flex gap-10 ">
          {followers === undefined || profile.following === undefined ? null : (
            <>
              <p>
                <span className="font-bold">{photosCount}</span> photos
              </p>
              <p>
                <span className="font-bold">{followerCount}</span>{' '}
                {followers === 1 ? 'follower' : 'followers'}
              </p>
              <p>
                <span className="font-bold">{profile.following.length}</span>{' '}
                following
              </p>
            </>
          )}
        </div>
        <div className="container ">
          <p className="font-medium">{profile.fullName}</p>
        </div>
      </div>
    </div>
  );
}
