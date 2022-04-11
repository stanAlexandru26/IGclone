import React from 'react';
import ProfilePost from './ProfilePost';

export default function ProfileTimeline({ profilePhotos }) {
  return (
    <div className="border-gray mt-12 h-16 border-t pt-4">
      <div className="mt-4 mb-12 grid grid-cols-3 gap-8">
        {!profilePhotos ? (
          <>
            <p>Add Photos</p>
          </>
        ) : profilePhotos && profilePhotos.length > 0 ? (
          profilePhotos &&
          profilePhotos.map((photo) => (
            <ProfilePost key={photo.id} photo={photo} />
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
