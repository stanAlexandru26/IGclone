import { useState, useEffect, useContext } from 'react';
import { getCurrentUserFirestoreData } from '../utils/firebaseUilts';
import UserContext from '../context/userContext';

export default function useUser() {
  const [activeUser, setActiveUser] = useState();
  const user = useContext(UserContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      const response = await getCurrentUserFirestoreData(user.uid);
      setActiveUser(response[0]);
    }
    if (user && user.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return activeUser;
}
