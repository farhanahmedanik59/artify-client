import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContex } from "../../contexts/AuthContex";
import useAxios from "../../hooks/useAxios";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../LoadingPage/LoadingPage";
import { Link } from "react-router";
import Swal from "sweetalert2";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const Favorites = () => {
  window.scrollTo(0, 0);
  const { user } = useContext(AuthContex);
  const axiosInstance = useAxios();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axiosInstance.get(`/favorites?email=${user?.email}`);
        setFavorites(res.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast.error("Failed to load favorites.");
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchFavorites();
  }, [user, axiosInstance]);

  const handleRemove = async (id) => {
    console.log(id);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this artwork from favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.delete(`/favorites/${id}?email=${user.email}&id=${id}`);
        if (res.data.deletedCount > 0) {
          setFavorites(favorites.filter((fav) => fav.artwordId !== id));
          toast.success("Removed from favorites!");
        }
      } catch (error) {
        console.error("Error removing favorite:", error);
        toast.error("Failed to remove item.");
      }
    }
  };

  if (loading) return <Loader />;
  console.log(favorites);
  return (
    <div className="min-h-[600px] mt-6 py-8 px-6 lg:px-10 bg-base-100 text-base-content transition-colors max-w-[90%] mx-auto duration-300">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-4xl font-bold mb-8 text-center">❤️ My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="text-center text-lg opacity-70">No favorites yet.</div>
      ) : (
        <motion.div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" variants={containerVariants} initial="hidden" animate="visible">
          <AnimatePresence>
            {favorites.map((fav) => (
              <motion.div
                key={fav._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                exit="exit"
                className="card bg-base-200 shadow-md border border-transparent hover:border-primary rounded-xl overflow-hidden dark:bg-base-300 dark:border-gray-700 cursor-pointer"
                style={{
                  transformOrigin: "center bottom",
                }}
              >
                <motion.figure whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="h-56 overflow-hidden">
                  <img src={fav.imageURL} alt={fav.title} className="w-full h-full object-cover" />
                </motion.figure>

                <div className="card-body flex flex-col justify-between p-4 sm:p-6">
                  <div>
                    <h2 className="card-title text-xl">{fav.title}</h2>
                    <p className="text-sm opacity-70">{fav.category}</p>
                    <p className="text-sm opacity-70">{fav.medium}</p>
                    <div className="mt-2 font-semibold text-primary">${fav.price}</div>
                  </div>

                  <div className="mt-4 flex justify-between items-center gap-2">
                    <div className="flex gap-2">
                      <Link to={`/arts/${fav.artwordId}`} className="btn btn-sm btn-outline btn-primary hover:scale-105 transition-transform duration-200">
                        View
                      </Link>
                      <button onClick={() => handleRemove(fav.artwordId)} className="btn btn-sm btn-error hover:scale-105 transition-transform duration-200">
                        Remove
                      </button>
                    </div>

                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-1">
                      <span className="text-lg">❤️</span>
                      <span className="text-sm">{fav.likes || 0}</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default Favorites;
