import React from 'react';
import { Link } from 'react-router-dom';
import useFirebaseStorage from '../../hooks/useFirebaseStorage';

export default function ProfileTimelinePost({ photo, postsArray }) {
  const { photoFirebaseUrl } = useFirebaseStorage(photo.imageSrc);

  return (
    <>
      <Link to={`/p/${photo.docId}`} state={postsArray} >
        <img
          className="h-72 w-72 bg-gray-100 object-contain  "
          src={photoFirebaseUrl}
          alt={photo.caption}
        />
      </Link>
    </>
  );
}
