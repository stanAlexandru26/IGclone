import React, { useEffect, useReducer } from 'react';
import { Outlet } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileNavbar from './ProfileNavbar';
import {
  getUserByUsername,
  getUserPhotosByUsername,
} from '../../utils/firebaseUtils';

const reducer = (state, newState) => ({ ...state, ...newState });

const initialState = {
  profile: {},
  photosCollection: null,
  profileFollowerCount: 0,
};

export default function Profile({ username, isLoggedInUser }) {
  const [
    { profile, profilePhotos, profileFollowerCount, followers },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getUserData() {
      const [{ ...user }] = await getUserByUsername(username);
      const photos = await getUserPhotosByUsername(username);

      dispatch({
        profile: user,
        profilePhotos: photos,
        profileFollowerCount: user.followers.length,
        followers: user.followers,
      });
    }
    getUserData();
  }, [username]);

  return (
    <>
      <ProfileHeader
        photosCount={profilePhotos ? profilePhotos.length : 0}
        profile={profile}
        followerCount={profileFollowerCount}
        followers={followers}
        setFollowerCount={dispatch}
        username={username}
        isLoggedInUser={isLoggedInUser}
      />
      <ProfileNavbar
        isLoggedInUser={isLoggedInUser}
        profileUrl={profile.username}
      />
      <Outlet />
    </>
  );
}
