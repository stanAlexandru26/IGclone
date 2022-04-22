import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSavedPosts } from '../../utils/firebaseUtils';
import ProfileTimeline from './ProfileTimeline';
import UserContext from '../../context/userContext';
import * as ROUTES from '../../constants/routes';

export default function ProfileSaved() {
  const { username } = useParams();
  const navigate = useNavigate();
  const LoggedInUser = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (username === LoggedInUser.displayName) {
      getSavedPosts(LoggedInUser.uid).then((posts) => {
        setPosts(posts);
      });
    } else {
      navigate(ROUTES.NOT_FOUND);
    }
  }, [username, LoggedInUser]);

  return <ProfileTimeline posts={posts} />;
}
