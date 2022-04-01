/* eslint-disable no-unused-vars */
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';

async function getCurrentUserFirestoreData(userId) {
  const q = query(collection(db, 'users'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  const userFirestoreData = querySnapshot.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return userFirestoreData;
}

async function getFirebaseUserFolowersPosts(userId, followingUserIds) {
  const q = query(
    collection(db, 'photos'),
    where('userId', 'in', followingUserIds),
  );
  const result = await getDocs(q);
  const photos = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  const photosWithUserDetails = await Promise.all(
    photos.map(async (photo) => {
      let userLikedPhoto = photo.likes.includes(userId) ? true : false;

      const user = await getCurrentUserFirestoreData(photo.userId);
      const username = user[0].username;
      return { username, ...photo, userLikedPhoto };
    }),
  );

  return photosWithUserDetails;
}

export { getCurrentUserFirestoreData, getFirebaseUserFolowersPosts };
