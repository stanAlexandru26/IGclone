/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  getPostData,
  getCurrentUserFirestoreData,
} from '../utils/firebaseUilts';
import Post from '../components/post/index';
import UserContext from '../context/userContext';

export default function SinglePost() {
  const { postId } = useParams();
  const loggedInUser = useContext(UserContext);
  const location = useLocation();

  const postArray = location.state;

  const [post, setPost] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (postId) {
        const data = await getPostData(postId);
        console.log('🚀 ~ file: post.js ~ line 27 ~ getData ~ data', data);
        const userData = await getCurrentUserFirestoreData(data.userId);
        console.log(
          '🚀 ~ file: post.js ~ line 28 ~ getData ~ userData',
          userData,
        );
        setPost({
          ...data,
          userImageSrc: userData[0].imageSrc,
          username: userData[0].username,
          userLikedPost: data.likes.includes(loggedInUser.uid),
          userSavedPost: data.savedUsers.includes(loggedInUser.uid),
        });
      }
    };
    getData();
  }, [postId]);

  return (
    <div className="container mx-auto flex max-h-screen max-w-screen-lg ">
      {post && <Post content={post} horizontal={true} />}
    </div>
  );
}
