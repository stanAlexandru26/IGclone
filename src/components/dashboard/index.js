import React from 'react';
import Sidebar from './sidebar';
import TimelineLoading from '../loading/TimelineLoading';
import useTimelinePosts from '../../hooks/useTimelinePosts';
import Post from '../post';
export default function Dashboard() {
  const { posts } = useTimelinePosts();

  return (
    <div className="mx-auto flex max-w-screen-lg  justify-between gap-7">
      {/* Timeline */}

      <div className="mx-auto md:basis-3/4 ">
        {!posts ? (
          <>
            {[...new Array(4)].map((index) => (
              <TimelineLoading key={index} />
            ))}
          </>
        ) : posts && posts.length > 0 ? (
          posts.map((content) => (
            <Post key={content.docId} content={content} horizontal={false} />
          ))
        ) : (
          <p className="text-center text-2xl">Follow people to see posts!</p>
        )}
      </div>

      <Sidebar />
    </div>
  );
}
