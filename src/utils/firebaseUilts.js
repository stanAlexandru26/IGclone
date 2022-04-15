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
    collection(db, 'posts'),
    where('userId', 'in', followingUserIds),
  );
  const result = await getDocs(q);
  const photos = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  const photosWithUserDetails = await Promise.all(
    photos.map(async (photo) => {
      let userLikedPost = photo.likes.includes(userId) ? true : false;
      let userSavedPost = photo.savedUsers.includes(userId) ? true : false;
      const user = await getCurrentUserFirestoreData(photo.userId);
      const username = user[0].username;
      const userImageSrc = user[0].imageSrc;
      return { username, ...photo, userLikedPost, userImageSrc, userSavedPost };
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
async function getUserByUsername(username) {
  const q = query(collection(db, 'users'), where('username', '==', username));
  const querySnapshot = await getDocs(q);

  const user = querySnapshot.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user.length > 0 ? user : false;
}
async function getUserPhotosByUsername(username) {
  const user = await getUserByUsername(username);

  const q = query(
    collection(db, 'posts'),
    where('userId', '==', user[0].userId),
  );
  const result = await getDocs(q);

  const photos = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return photos;
}

async function getAllExplorePosts() {
  const q = query(collection(db, 'posts'));
  const result = await getDocs(q);

  const posts = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return posts;
}

async function getSavedPosts(userId) {
  const q = query(collection(db, 'posts'), where('savedUsers', 'array-contains', userId));
  const result = await getDocs(q);

  const posts = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return posts;
}
  

export {
  getCurrentUserFirestoreData,
  getFirebaseUserFolowersPosts,
  getSuggestedProfiles,
  followUser,
  unfollowUser,
  getUserByUsername,
  getUserPhotosByUsername,
  getAllExplorePosts,
  getSavedPosts,
};
