import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import Profile from '../components/profile/index.js';
import { getUserByUsername } from '../utils/firebaseUtils';
import UserContext from '../context/userContext';

export default function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const LoggedInUser = useContext(UserContext);

  const [userExists, setUserExists] = useState(undefined);
  const [isLoggedInUser, setIsLoggedInUser] = useState(undefined);

  useEffect(() => {
    document.title = `${username} - Profile`;
  }, []);

  // User Check //

  useEffect(() => {
    async function checkUserExistsToLoadProfile() {
      const doesUserExist = await getUserByUsername(username);
      if (!doesUserExist) {
        navigate(ROUTES.NOT_FOUND);
      } else if (
        (doesUserExist && location.pathname.includes('/saved')) ||
        location.pathname.includes('/posts')
      ) {
        setUserExists(true);
      } else if (
        (doesUserExist && !location.pathname.includes('/saved')) ||
        !location.pathname.includes('/posts')
      ) {
        setUserExists(true);
        navigate(`/${username}/posts`);
      } else {
        setUserExists(false);
      }
    }
    checkUserExistsToLoadProfile();
  }, [username]);

  // Logged In User Check //
  useEffect(() => {
    if (LoggedInUser && LoggedInUser.displayName === username) {
      setIsLoggedInUser(true);
    } else {
      setIsLoggedInUser(false);
    }
  }, [LoggedInUser, username]);

  return userExists ? (
    <>
      <Profile username={username} isLoggedInUser={isLoggedInUser} />
    </>
  ) : null;
}
