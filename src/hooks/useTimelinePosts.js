import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/userContext';
import {
  getCurrentUserFirestoreData,
  getFirebaseUserFollowersPosts,
} from '../utils/firebaseUtils';

export default function useTimelinePosts() {
  const [posts, setPosts] = useState([]);

  const firebaseUser = useContext(UserContext);

  useEffect(async () => {
    const followingUserIds = await getCurrentUserFirestoreData(
      firebaseUser.uid,
    );
    let followedUsersPhotos = [];
    if (followingUserIds && followingUserIds[0].following.length > 0) {
      followedUsersPhotos = await getFirebaseUserFollowersPosts(
        firebaseUser.uid,
        followingUserIds[0].following,
      );
    }

    followedUsersPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
    setPosts(followedUsersPhotos);
  }, [firebaseUser.userId]);

  return { posts };
}
