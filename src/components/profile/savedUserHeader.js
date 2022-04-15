import React from 'react';
import useUser from '../../hooks/useUser';

export default function SavedUserHeader() {

    const user=useUser()
    console.log("🚀 ~ file: savedUserHeader.js ~ line 7 ~ SavedUserHeader ~ user", user)

  return (
    <div className="mx-auto flex w-8/12  justify-center md:justify-start md:gap-8 md:px-12 ">
      {/* Profile Image */}
      <div className="hidden md:block ">
        <img
          className=" aspect-square rounded-full md:h-20  md:w-20 lg:h-40 lg:w-40 "
          alt={`${username} profile picture`}
          src={photoFirebaseUrl}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Profile Name & Follow Button */}
        <div className="container order-1 flex flex-row gap-6 md:flex-col ">
          <div className="md:hidden">
            <img
              className="  h-16 w-16 rounded-full "
              alt={`${username} profile picture`}
              src={photoFirebaseUrl}
            />
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <p className="text-2xl ">{username}</p>
            <button
              className={`h-8 w-20 rounded bg-blue-500 text-sm font-bold text-white ${
                firebaseUser.uid === profile.userId ? 'hidden' : ''
              }`}
              type="button"
              onClick={handleToggleFollow}
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        </div>
        {/* Profile Counters */}
        <div className="container order-3 flex items-center justify-center gap-10 border-t  py-2 md:order-2 md:border-0 md:py-0 ">
          {followers === undefined || profile.following === undefined ? null : (
            <>
              <p className="flex flex-col items-center md:flex-row md:gap-2">
                <span className="font-bold">{photosCount}</span> photos
              </p>
              <p className="flex flex-col items-center md:flex-row md:gap-2">
                <span className="font-bold">{followerCount}</span>{' '}
                {followers === 1 ? 'follower' : 'followers'}
              </p>
              <p className="flex flex-col items-center md:flex-row md:gap-2">
                <span className="font-bold">{profile.following.length}</span>{' '}
                following
              </p>
            </>
          )}
        </div>
        {/* Profile Name */}
        <div className="container order-2 md:order-3 ">
          <p className="font-semibold">{profile.fullName}</p>
        </div>
      </div>
    </div>
  );
}