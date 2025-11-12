import React, { useState, useEffect, useContext } from "react";
import { useLoaderData } from "react-router";
import useAxios from "../../hooks/useAxios";
import { AuthContex } from "../../contexts/AuthContex";
import { toast, ToastContainer } from "react-toastify";

const ArtworkDetail = () => {
  const [likeCount, setLikeCount] = useState(35);
  const [artistArtCount, setArtistArtCount] = useState(0);
  const artworkData = useLoaderData();
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContex);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchArtistArtCount = async () => {
      try {
        const res = await axiosInstance.get(`/arts/count/${artworkData.userEmail}`);
        if (res.data.count !== undefined) {
          setArtistArtCount(res.data.count);
        }
      } catch (error) {
        console.error("Failed to fetch artist artwork count:", error);
      }
    };

    if (artworkData?.userEmail) {
      fetchArtistArtCount();
    }
  }, [artworkData, axiosInstance]);

  const handleLike = async () => {
    try {
      const res = await axiosInstance.patch(`/arts/like/${artworkData._id}`);
      if (res.data.success) {
        setLikeCount(res.data.likes);
        toast.success("You liked this artwork ❤️");
      } else {
        toast.error("Failed to update like count.");
      }
    } catch (error) {
      console.error("Error liking artwork:", error);
      toast.error("Something went wrong while liking this artwork.");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleAddToFavorites = async () => {
    setAdding(true);
    const favoriteItem = {
      favorite: `${user.email}`,
      artwordId: artworkData._id,
      artistImageURL: user.photoURL,
      imageURL: artworkData.imageURL,
      title: artworkData.title,
      category: artworkData.category,
      medium: artworkData.medium,
      description: artworkData.description,
      dimensions: artworkData.dimensions,
      price: artworkData.price || 0,
      likes: 0,
      visibility: artworkData.visibility,
      artistName: artworkData.userName,
      userEmail: artworkData.userEmail,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosInstance.post("/favorites", favoriteItem);
      if (res.data.insertedId) {
        toast.success("Added to favorites!");
      } else if (res.data.message === "Already added") {
        toast.info("Already added");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast.error("Failed to add to favorites. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-[600px] mt-5 bg-base-100 text-base-content py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="card lg:card-side bg-base-200 shadow-xl h-auto lg:h-[600px] overflow-hidden">
          <figure className="w-full lg:w-1/2 h-80 lg:h-full">
            <img src={artworkData.imageURL} alt={artworkData.title} className="w-full h-full object-cover" />
          </figure>
          <div className="card-body lg:w-1/2 p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="card-title text-3xl font-bold">{artworkData.title}</h1>
                  <p className="text-lg opacity-70">{artworkData.category}</p>
                </div>
                <button onClick={handleLike} className="btn btn-ghost btn-circle text-error transition-transform duration-200 hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
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
                  <p className="text-sm mt-1 opacity-70">
                    Total Artworks: <span className="font-semibold">{artistArtCount}</span>
                  </p>
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
            </div>
            <div>
              <div className="divider"></div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-2xl font-bold">${artworkData.price}</p>
                  <p className="text-sm opacity-70">Price</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleAddToFavorites} disabled={adding} className="btn btn-primary">
                    {adding ? "Adding..." : "Add to Favorites"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable theme="light" />
    </div>
  );
};

export default ArtworkDetail;
