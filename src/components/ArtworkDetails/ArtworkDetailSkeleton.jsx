import React from "react";

const ArtworkDetailSkeleton = () => {
  return (
    <div className="min-h-[600px] mt-5 bg-base-100 text-base-content py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="card lg:card-side bg-base-200 shadow-xl animate-pulse">
          <figure className="w-full lg:w-1/2 h-80 lg:h-auto bg-gray-300 rounded-md"></figure>
          <div className="card-body lg:w-1/2 p-6 sm:p-8 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2 w-3/4">
                <div className="h-8 bg-gray-300 rounded w-2/3"></div>
                <div className="h-5 bg-gray-300 rounded w-1/3"></div>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>

            <div className="mt-4 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
              <div className="space-y-1 w-3/4">
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="h-6 bg-gray-300 rounded w-full"></div>
              <div className="h-6 bg-gray-300 rounded w-full"></div>
              <div className="h-6 bg-gray-300 rounded w-full"></div>
              <div className="h-6 bg-gray-300 rounded w-full"></div>
            </div>

            <div className="divider"></div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <div className="h-6 bg-gray-300 rounded w-20"></div>
                <div className="h-3 bg-gray-300 rounded w-12"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-10 w-24 bg-gray-300 rounded"></div>
                <div className="h-10 w-24 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailSkeleton;
