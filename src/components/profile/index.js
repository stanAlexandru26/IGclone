import React, { useEffect, useReducer } from 'react';
import ProfileUserHeader from './profileUserHeader';
import ProfileTimeline from './profileTimeline';
import {
  getUserByUsername,
  getUserPhotosByUsername,
} from '../../utils/firebaseUilts';
import Navbar from './Navbar';

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
  profile: {},
  photosCollection: null,
  profileFollowerCount: 0,
};
export default function UserProfile({ username }) {
  const [
    { profile, profilePhotos, profileFollowerCount, followers },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getUserPhotos() {
      const [{ ...user }] = await getUserByUsername(username);
      const photos = await getUserPhotosByUsername(username);

      dispatch({
        profile: user,
        profilePhotos: photos,
        profileFollowerCount: user.followers.length,
        followers: user.followers,
      });
    }
    getUserPhotos();
  }, [username]);

  return (
    <>
      <ProfileUserHeader
        photosCount={profilePhotos ? profilePhotos.length : 0}
        profile={profile}
        followerCount={profileFollowerCount}
        followers={followers}
        setFollowerCount={dispatch}
        username={username}
      />
      <Navbar active={'profile'} profileUrl={profile.username} />
      <ProfileTimeline profilePhotos={profilePhotos} />
    </>
  );
}
