import React from 'react';
import TimelineLoading from './loading/timelineLoading';
import useTimelinePosts from '../hooks/useTimelinePosts';
import Post from './post/post';

export default function Timeline() {
  const { posts } = useTimelinePosts();

  return (
    <div className="container col-span-2">
      {!posts ? (
        <>
          {[...new Array(4)].map((index) => (
            <TimelineLoading key={index} />
          ))}
        </>
      ) : posts && posts.length > 0 ? (
        posts.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see posts!</p>
      )}
    </div>
  );
}
