import React from 'react';
import ProfilePost from './ProfilePost';

export default function ProfileTimeline({ profilePhotos }) {
  return (
    <div className="mx-auto w-8/12 ">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {!profilePhotos ? (
          <>
            <p>Add Photos</p>
          </>
        ) : profilePhotos && profilePhotos.length > 0 ? (
          profilePhotos &&
          profilePhotos.map((photo) => (
            <ProfilePost key={photo.docId} photo={photo} />
          ))
        ) : null}
      </div>

      {!profilePhotos ||
        (profilePhotos && profilePhotos.length === 0 && (
          <p className="text-center text-2xl">No Photos Yet</p>
        ))}
    </div>
  );
}
