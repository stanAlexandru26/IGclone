import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/userContext';
import {
  getCurrentUserFirestoreData,
  getFirebaseUserFolowersPosts,
} from '../utils/firebaseUilts';

export default function useTimelinePosts() {
  const [posts, setPosts] = useState([]);
  console.log("🚀 ~ file: useTimelinePosts.js ~ line 10 ~ useTimelinePosts ~ posts", posts)
  

  const firebaseUser = useContext(UserContext);

  useEffect(async () => {
    const followingUserIds = await getCurrentUserFirestoreData(
      firebaseUser.uid,
    );
    let followedUsersPhotos = [];
    if (followingUserIds && followingUserIds[0].following.length > 0) {
      followedUsersPhotos = await getFirebaseUserFolowersPosts(
        firebaseUser.uid,
        followingUserIds[0].following,
      );
    }

    followedUsersPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
    setPosts(followedUsersPhotos);
  }, [firebaseUser.userId]);

  return { posts };
}
