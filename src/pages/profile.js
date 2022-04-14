import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile/index.js';
import { getUserByUsername } from '../utils/firebaseUilts';

export default function Profile() {
  const { username } = useParams();
  const [userExists, setUserExists] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${username} - Profile`;
  }, []);

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
  }, [username, navigate]);

  return userExists ? (
    <>
      <Header />
      <UserProfile username={username} />
    </>
  ) : null;
}
