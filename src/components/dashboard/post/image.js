import React from 'react';
import useFirebaseStorage from '../../../hooks/useFirebaseStorage';

export default function Image({ caption, imageSrc }) {
  const { photoFirebaseUrl } = useFirebaseStorage(imageSrc);
  return (
    <div>
      <img src={photoFirebaseUrl} alt={caption} />
    </div>
  );
}
