/* eslint-disable no-unused-vars */
import Header from '../components/header';
import React, { useContext, useEffect, useState } from 'react';
import ProfileTimeline from '../components/profile/profileTimeline';
import { getSavedPosts } from '../utils/firebaseUilts';
import useUser from '../hooks/useUser';
export default function ProfileSaved() {
  useEffect(() => {
    document.title = 'Saved - Instagram';
  }, []);

  const user = useUser();
  console.log("🚀 ~ file: profileSaved.js ~ line 13 ~ ProfileSaved ~ user", user)

  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    if (user) {
      getSavedPosts(user.userId).then((posts) => {
        setSavedPosts(posts);
      });
    }
  }, [user]);

  return (
    <>
      <Header />
      <ProfileTimeline profilePhotos={savedPosts} />
    </>
  );
}
