import React from 'react';
import ProfilePost from './ProfilePost';

export default function ProfileTimeline({ profilePhotos }) {
  return (
    <div className="h-16 border-t border-gray mt-12 pt-4">
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
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
