import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserPhotosByUsername } from '../../utils/firebaseUilts';
import ProfileTimeline from './ProfileTimeline';

export default function ProfilePosts() {
  const user = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = `${user.username} - Profile`;
  }, []);

  useEffect(() => {
    if (user) {
      getUserPhotosByUsername(user.username).then((data) => {
        setPosts(data);
      });
    }
  }, [user]);

  return (
    <>
      <ProfileTimeline posts={posts} />
    </>
  );
}
