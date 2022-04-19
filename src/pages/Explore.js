import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import { getAllExplorePosts } from '../utils/firebaseUilts';
import ProfileTimeline from '../components/profile/ProfileTimeline';

export default function Explore() {
  const [postsArray, setPostsArray] = useState([]);

  const [sortedPostsArray, setSortedPostsArray] = useState([]);
  useEffect(() => {
    document.title = 'Explore - Instagram';
  }, []);

  const user = useUser();

  useEffect(() => {
    getAllExplorePosts().then((posts) => {
      setPostsArray(posts);
    });
  }, []);

  useEffect(() => {
    if (user) {
      const filteredPosts = postsArray.filter((post) => {
        return (
          post.userId !== user.userId && !user.following.includes(post.userId)
        );
      });
      setSortedPostsArray(filteredPosts);
    }
  }, [postsArray, user]);

  return (
    <>
      <ProfileTimeline posts={user ? sortedPostsArray : postsArray} />
    </>
  );
}
