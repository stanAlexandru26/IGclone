import React from 'react';

export default function TimelineLoading() {
  return (
    <div className=" mb-8 rounded border bg-white ">
      <div className="flex animate-pulse flex-col ">
        {/* header */}
        <div className="mt-5 flex items-center gap-4 border-b p-4">
          <div className="h-10 w-10 rounded-full bg-gray-200"></div>
          <div className="h-4 w-2/12 rounded bg-gray-200"></div>
        </div>
        {/* body */}
        <div className=" h-96 bg-gray-200"></div>
        {/* footer */}
        <div className="mt-5 flex flex-col gap-2 p-4">
          <div className=" h-4 rounded bg-gray-200"></div>
          <div className=" h-3 w-10/12 rounded bg-gray-200"></div>
          <div className=" h-3 w-10/12 rounded bg-gray-200"></div>
          <div className=" h-3 w-10/12 rounded bg-gray-200"></div>
          <div className=" h-3 w-8/12 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
