import React from 'react';
import ProfileTimelinePost from './ProfileTimelinePost';

export default function ProfileTimeline({ posts }) {
  return (
    <div className="mx-auto w-8/12 ">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-4">
        {!posts ? (
          <>
            <p>Add Posts</p>
          </>
        ) : posts && posts.length > 0 ? (
          posts &&
          posts.map((photo) => <ProfileTimelinePost key={photo.docId} photo={photo} />)
        ) : null}
      </div>

      {!posts ||
        (posts && posts.length === 0 && (
          <p className="text-center text-2xl">No Posts Yet</p>
        ))}
    </div>
  );
}
