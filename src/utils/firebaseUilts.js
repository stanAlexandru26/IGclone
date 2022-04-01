/* eslint-disable no-unused-vars */
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
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

async function getSuggestedProfiles(userId) {
  const q = query(collection(db, 'users'), where('userId', '!=', userId));
  const result = await getDocs(q);

  const [{ following }] = await getCurrentUserFirestoreData(userId);

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId),
    );
}

async function followUser(docId, userId, followingDocId, followingUserId) {
  const userDocument = await doc(db, 'users', docId);
  const followingUserDocument = await doc(db, 'users', followingDocId);

  await updateDoc(userDocument, {
    following: arrayUnion(followingUserId),
  });
  await updateDoc(followingUserDocument, {
    followers: arrayUnion(userId),
  });
}
async function unfollowUser(docId, userId, followingDocId, followingUserId) {
  const userDocument = await doc(db, 'users', docId);
  const followingUserDocument = await doc(db, 'users', followingDocId);

  await updateDoc(userDocument, {
    following: arrayRemove(followingUserId),
  });
  await updateDoc(followingUserDocument, {
    followers: arrayRemove(userId),
  });
}

export {
  getCurrentUserFirestoreData,
  getFirebaseUserFolowersPosts,
  getSuggestedProfiles,
  followUser,
  unfollowUser,
};
