import React from 'react';

export default function ProfileTimeline({ profilePhotos }) {
  return (
    <div className="h-16 border-t border-gray mt-12 pt-4">
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
        {!profilePhotos ? (
          <>
            <p>Thats life</p>
          </>
        ) : profilePhotos && profilePhotos.length > 0 ? (
          profilePhotos &&
          profilePhotos.map((photo) => (
            <div key={photo.docId} className="relative group">
              <img
                src={require(`../../assets${photo.imageSrc}`)}
                alt={photo.caption}
              />
            </div>
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
