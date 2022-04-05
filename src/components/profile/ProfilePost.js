import React from 'react';
import useFirebaseStorage from '../../hooks/useFirebaseStorage';

export default function ProfilePost({ photo }) {
  const { photoFirebaseUrl } = useFirebaseStorage(photo.docId);
  return (
    <div>
      <img src={photoFirebaseUrl} alt={photo.caption} />
    </div>
  );
}
