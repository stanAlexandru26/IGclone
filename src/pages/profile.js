import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import Profile from '../components/profile/index.js';
import { getUserByUsername } from '../utils/firebaseUilts';
import UserContext from '../context/userContext';

export default function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();

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
      } else {
        setUserExists(true);
      }
    }
    checkUserExistsToLoadProfile();
  }, [username]);

  // Logged In User Check //
  useEffect(() => {
    if (LoggedInUser.displayName === username) {
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
