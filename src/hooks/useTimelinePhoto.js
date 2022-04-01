/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/userContext';
import {
  getCurrentUserFirestoreData,
  getUserFollowedPhotos,
} from '../utils/firebaseUilts';

export default function useTimelinePhoto() {
  const [photos, setPhotos] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      const followingUserIds = await getCurrentUserFirestoreData(user.userId);
      let followedUsersPhotos = [];

      if (followingUserIds && followingUserIds[0].following.length > 0) {
        followedUsersPhotos = await getUserFollowedPhotos(
          user.userId,
          followingUserIds[0].following,
        );
      }

      followedUsersPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUsersPhotos);
    }

    getTimelinePhotos();
  }, [user.userId]);

  return { photos };
}
