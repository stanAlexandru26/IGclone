import React from 'react';

export default function SidebarLoading() {
  const suggestions = ["sugestion1", "sugestion2", "sugestion3", "sugestion4", "sugestion5"];
  return (
    <div>
      <div className=" bg-white  ">
        <div className="animate-pulse flex flex-col gap-2">
          {/* header */}
          <div className="flex items-center  p-4 gap-4 ">
            <div className="rounded-full bg-gray-200 w-16 h-16"></div>
            <div className="flex flex-col w-1/2 gap-4 ">
              <div className="w-10/12 h-3 bg-gray-200 rounded"></div>
              <div className="w-8/12 h-2 bg-gray-200 rounded"></div>
            </div>
          </div>
          {/* divider */}
          <div className="h-2 bg-gray-200 rounded"></div>
          {/* divider */}

          {/* sugestion */}
          <div className="flex flex-col p-2 gap-2 ">
            {suggestions.map((sugestion) => (
              <div className="flex items-center  gap-2 " key={sugestion}>
                <div className="rounded-full bg-gray-200 w-10 h-10"></div>
                <div className="flex flex-col w-1/2 gap-2 ">
                  <div className="w-10/12 h-3 bg-gray-200 rounded"></div>
                  <div className="w-8/12 h-2 bg-gray-200 rounded"></div>
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
