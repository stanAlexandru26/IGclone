import React from 'react';

export default function TimelineLoading() {
  return (
    <div className=" bg-white rounded border mb-8 ">
      <div className="animate-pulse flex flex-col ">
        {/* header */}
        <div className="flex items-center mt-5 p-4 gap-4 border-b">
          <div className="rounded-full bg-gray-200 w-10 h-10"></div>
          <div className="w-2/12 h-4 bg-gray-200 rounded"></div>
        </div>
        {/* body */}
        <div className=" h-96 bg-gray-200"></div>
        {/* footer */}
        <div className="flex flex-col mt-5 p-4 gap-2">
          <div className=" h-4 bg-gray-200 rounded"></div>
          <div className=" w-10/12 h-3 bg-gray-200 rounded"></div>
          <div className=" w-10/12 h-3 bg-gray-200 rounded"></div>
          <div className=" w-10/12 h-3 bg-gray-200 rounded"></div>
          <div className=" w-8/12 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
