import React, { useEffect, useReducer } from 'react';
import ProfileUserHeader from './profileUserHeader';
import ProfileTimeline from './profileTimeline';
import {
  getUserByUsername,
  getUserPhotosByUsername,
} from '../../utils/firebaseUilts';

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
    document.title = `${username} - Profile`;
  }, []);

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
      <ProfileTimeline profilePhotos={profilePhotos} />
    </>
  );
}
