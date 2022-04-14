import React from 'react';
import { Link } from 'react-router-dom';
import useFirebaseStorage from '../../hooks/useFirebaseStorage';

export default function ProfilePost({ photo }) {
  const { photoFirebaseUrl } = useFirebaseStorage(photo.imageSrc);

  return (
    <div className="">
      <Link to={`/p/${photo.docId}`}>
        <img src={photoFirebaseUrl} alt={photo.caption} />
      </Link>
    </div>
  );
}
