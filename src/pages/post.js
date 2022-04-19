import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostData } from '../utils/firebaseUilts';
import Post from '../components/dashboard/post/index';

export default function Postdsadsa() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    if (postId) {
      getPostData(postId).then((data) => {
        setPost(data);
      });
    }
  }, [postId]);

  return <div>{post && <Post content={post} />}</div>;
}
