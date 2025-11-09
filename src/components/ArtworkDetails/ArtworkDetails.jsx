import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";

const ArtworkDetail = () => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(35);
  const artworkData = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-[600px] mt-5 bg-base-100 text-base-content py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="card lg:card-side bg-base-200 shadow-xl">
          <figure className="w-full lg:w-1/2 h-80 lg:h-auto">
            <img src={artworkData.imageURL} alt={artworkData.title} className="w-full h-full object-cover" />
          </figure>
          <div className="card-body lg:w-1/2 p-6 sm:p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="card-title text-3xl font-bold">{artworkData.title}</h1>
                <p className="text-lg opacity-70">{artworkData.category}</p>
              </div>
              <button onClick={handleLike} className={`btn btn-ghost btn-circle ${liked ? "text-error" : "text-base-content/50"} transition-transform duration-200 hover:scale-110`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <div className="avatar">
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={artworkData.artistImageURL} alt={artworkData.artistName} />
                </div>
              </div>
              <div>
                <p className="font-medium text-lg">{artworkData.artistName}</p>
                <p className="text-sm opacity-70">{artworkData.userEmail}</p>
              </div>
            </div>
            <p className="mt-4 leading-relaxed">{artworkData.description}</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <span className="font-medium opacity-70">Medium</span>
                <p>{artworkData.medium}</p>
              </div>
              <div>
                <span className="font-medium opacity-70">Dimensions</span>
                <p>{artworkData.dimensions}</p>
              </div>
              <div>
                <span className="font-medium opacity-70">Created</span>
                <p>{formatDate(artworkData.createdAt)}</p>
              </div>
              <div>
                <span className="font-medium opacity-70">Category</span>
                <p>{artworkData.category}</p>
              </div>
            </div>
            <div className="divider"></div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-2xl font-bold">${artworkData.price}</p>
                <p className="text-sm opacity-70">Price</p>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-outline">Contact Artist</button>
                <button className="btn btn-primary">Purchase</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
