import React from 'react';
import useFirebaseStorage from '../../hooks/useFirebaseStorage';

export default function Image({ caption, imageSrc }) {
  const { photoFirebaseUrl } = useFirebaseStorage(imageSrc);
  return (
    <img
      src={photoFirebaseUrl}
      alt={caption}
      className=" object-fit max-h-full max-w-full"
    />
  );
}
