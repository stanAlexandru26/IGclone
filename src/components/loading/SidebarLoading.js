import React from 'react';

export default function SidebarLoading() {
  const suggestions = [
    'sugestion1',
    'sugestion2',
    'sugestion3',
    'sugestion4',
    'sugestion5',
  ];
  return (
    <div>
      <div className=" bg-white  ">
        <div className="flex animate-pulse flex-col gap-2">
          {/* header */}
          <div className="flex items-center  gap-4 p-4 ">
            <div className="h-16 w-16 rounded-full bg-gray-200"></div>
            <div className="flex w-1/2 flex-col gap-4 ">
              <div className="h-3 w-10/12 rounded bg-gray-200"></div>
              <div className="h-2 w-8/12 rounded bg-gray-200"></div>
            </div>
          </div>
          {/* divider */}
          <div className="h-2 rounded bg-gray-200"></div>
          {/* divider */}

          {/* sugestion */}
          <div className="flex flex-col gap-2 p-2 ">
            {suggestions.map((sugestion) => (
              <div className="flex items-center  gap-2 " key={sugestion}>
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div className="flex w-1/2 flex-col gap-2 ">
                  <div className="h-3 w-10/12 rounded bg-gray-200"></div>
                  <div className="h-2 w-8/12 rounded bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
          {/* sugestion */}
        </div>
      </div>
    </div>
  );
}
