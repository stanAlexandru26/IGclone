import { useState, useEffect, useContext } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import UserContext from '../context/userContext';
import FirebaseContext from '../context/firebaseContext';

export default function useUser() {
  const [activeUser, setActiveUser] = useState();
  const user = useContext(UserContext);
  const { db } = useContext(FirebaseContext);
  async function getUserByUserId(userId) {
    const result = await getDocs(
      query(collection(db, 'users'), where('userId', '==', userId)),
    );

    const userData = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id,
    }));

    return userData;
  }

  useEffect(() => {
    async function getUserObjByUserId() {
      const response = await getUserByUserId(user.uid);
      setActiveUser(response[0]);
    }
    if (user && user.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return activeUser;
}
