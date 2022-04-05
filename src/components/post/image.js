import React from 'react';
import useFirebaseStorage from '../../hooks/useFirebaseStorage';

export default function Image({ caption, docId }) {
  const { photoFirebaseUrl } = useFirebaseStorage(docId);
  return (
    <div>
      <img src={photoFirebaseUrl} alt={caption} />
    </div>
  );
}
