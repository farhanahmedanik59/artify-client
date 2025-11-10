import React, { useState, useEffect, useContext } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { AuthContex } from "../../contexts/AuthContex";
import { Heart } from "lucide-react";
import Loading from "../LoadingPage/LoadingPage";
import { Link, Navigate } from "react-router";
import { Fade } from "react-awesome-reveal";

const GalleryPage = () => {
  const { user } = useContext(AuthContex);
  const axiosInstance = useAxios();

  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [artworkToEdit, setArtworkToEdit] = useState(null);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/my-arts?email=${user.email}`);
      console.log(res);
      setArtworks(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load artworks", "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const handleDelete = (artId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/delete-art/${artId}`).then((res) => console.log(res));
          Swal.fire("Deleted!", "Artwork has been deleted.", "success");
          fetchArtworks();
        } catch (err) {
          Swal.fire("Error", "Failed to delete artwork", "error");
        }
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const artData = {
      artistImageURL: user.photoURL,
      imageURL: form.imageURL.value,
      title: form.title.value,
      category: form.category.value,
      medium: form.medium.value,
      description: form.description.value,
      dimensions: form.dimensions.value,
      price: Number(form.price.value) || 0,
      likes: 0,
      visibility: form.visibility.value,
      artistName: user.displayName,
      userEmail: user.email,
    };

    try {
      if (artworkToEdit) {
        await axiosInstance.patch(`/update-art/${artworkToEdit._id}`, artData);
        Swal.fire("Success", "Artwork updated!", "success");
      }
      setModalOpen(false);
      fetchArtworks();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to save artwork", "error");
    }
  };

  const handleEdit = (art) => {
    setArtworkToEdit(art);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setArtworkToEdit(null);
  };

  return (
    <div className="max-w-7xl mx-auto min-h-[70vh] px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Gallery</h1>
        <Link to={"/add-artwork"}>
          <button className="btn btn-primary" onClick={handleAdd}>
            Add New Artwork
          </button>
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : artworks.length === 0 ? (
        <p className="text-center text-gray-500">No artworks found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <Fade>
              <div key={art._id} className="relative card bg-base-300 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col">
                <figure className="relative overflow-hidden">
                  <img src={art.imageURL} alt={art.title} className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105" />
                  <div className="absolute top-3 right-3">
                    <button className="btn btn-circle btn-sm bg-base-100/80 backdrop-blur-sm border-0 hover:scale-110 transition-transform duration-200">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </figure>
                <div className="card-body p-4 flex-1">
                  <h3 className="card-title text-lg font-bold line-clamp-1">{art.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="avatar">
                      <div className="w-6 h-6 rounded-full">
                        <img src={art.artistImageURL} alt={art.artistName} />
                      </div>
                    </div>
                    <span className="text-sm text-base-content/70">{art.artistName}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="badge badge-outline badge-primary">{art.category}</div>
                    <div className="flex items-center gap-1 text-sm text-base-content/60">
                      <Heart className="w-4 h-4" />
                      <span>{art.likes}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between p-4 border-t border-base-200">
                  <button className="btn btn-sm btn-warning" onClick={() => handleEdit(art)}>
                    Update
                  </button>
                  <button className="btn btn-sm btn-error" onClick={() => handleDelete(art._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-xl w-full max-w-lg relative">
            <button className="btn btn-sm btn-circle absolute top-3 right-3" onClick={() => setModalOpen(false)}>
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{artworkToEdit ? "Update Artwork" : "Add New Artwork"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Image URL</label>
                <input type="text" name="imageURL" defaultValue={artworkToEdit?.imageURL || ""} className="input input-bordered w-full" required />
              </div>
              <div>
                <label className="label">Title</label>
                <input type="text" name="title" defaultValue={artworkToEdit?.title || ""} className="input input-bordered w-full" required />
              </div>
              <div>
                <label className="label">Category</label>
                <select name="category" className="select select-bordered w-full" defaultValue={artworkToEdit?.category || "Landscape"}>
                  <option>Landscape</option>
                  <option>Abstract</option>
                  <option>Seascape</option>
                  <option>Botanical</option>
                  <option>Portrait</option>
                  <option>Figurative</option>
                  <option>Urban</option>
                </select>
              </div>
              <div>
                <label className="label">Medium / Tools</label>
                <input type="text" name="medium" defaultValue={artworkToEdit?.medium || ""} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea name="description" rows="3" defaultValue={artworkToEdit?.description || ""} className="textarea textarea-bordered w-full" required></textarea>
              </div>
              <div>
                <label className="label">Dimensions</label>
                <input type="text" name="dimensions" defaultValue={artworkToEdit?.dimensions || ""} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="label">Price</label>
                <input type="number" name="price" defaultValue={artworkToEdit?.price || 0} className="input input-bordered w-full" />
              </div>
              <div>
                <label className="label">Visibility</label>
                <select name="visibility" className="select select-bordered w-full" defaultValue={artworkToEdit?.visibility || "Public"}>
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                {artworkToEdit ? "Update Artwork" : "Add Artwork"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;

// have to do favourite
