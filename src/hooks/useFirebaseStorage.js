import { getDownloadURL, ref } from 'firebase/storage';
import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebaseContext';

export default function useFirebaseStorage(imageSrc, type) {
  const { storage } = useContext(FirebaseContext);

  const [photoFirebaseUrl, setPhotoFirebaseUrl] = useState('');

  useEffect(() => {
    const getImgUrl = (imageSrc) => {
      const storageRef =
        type === 'avatar'
          ? ref(storage, `avatars/${imageSrc}.jpg`)
          : ref(storage, `images/${imageSrc}.jpg`);

      getDownloadURL(storageRef)
        .then((url) => {
          setPhotoFirebaseUrl(url);
        })
        .catch((error) => {
          if (error.code === 'storage/object-not-found') {
            getImgUrl('default_avatar', 'avatar');
          }
        });
    };
    if (imageSrc) {
      getImgUrl(imageSrc);
    }
  }, [imageSrc]);

  return { photoFirebaseUrl };
}
