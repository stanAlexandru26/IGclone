import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import useUser from '../hooks/useUser';
import { getAllExplorePosts } from '../utils/firebaseUilts';
import ProfileTimeline from '../components/profile/profileTimeline';

export default function Explore() {
  const [posts, setPosts] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);
  useEffect(() => {
    document.title = 'Explore - Instagram';
  }, []);
  const user = useUser();

  useEffect(() => {
    getAllExplorePosts().then((posts) => {
      setPosts(posts);
    });
  }, []);

  useEffect(() => {
    if (user) {
      setSortedPosts(arraySorter(posts, user.userId, user.following));
    }
  }, [posts]);

  const arraySorter = (postsArray, userId, followingArray) => {
    const filteredArray = postsArray.filter((post) => {
      if (post.userId === userId) {
        return false;
      }
      if (followingArray.includes(post.userId)) {
        return false;
      }
      return true;
    });
    return filteredArray;
  };

  return (
    <>
      <Header />
      <ProfileTimeline profilePhotos={user ? sortedPosts : posts} />
    </>
  );
}
