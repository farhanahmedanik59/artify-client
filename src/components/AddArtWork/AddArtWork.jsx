import React, { useContext } from "react";
import { AuthContex } from "../../contexts/AuthContex";
import useAxios from "../../hooks/useAxios";

import { toast, ToastContainer } from "react-toastify";

const AddArtWork = () => {
  const { user } = useContext(AuthContex);
  const axiosInstanse = useAxios();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newArt = {
      artistImageURL: user.photoURL,
      imageURL: form.imageURL.value,
      title: form.title.value,
      category: form.category.value,
      medium: form.medium.value,
      description: form.description.value,
      dimensions: form.dimensions.value,
      price: form.price.value || 0,
      likes: 0,
      visibility: form.visibility.value,
      artistName: form.userName.value,
      userEmail: form.userEmail.value,
      createdAt: new Date().toISOString(),
    };
    axiosInstanse
      .post("/add-art", newArt)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("successfully added ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.warning("Error while adding art ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        toast.error(`${error.message}`, {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });
        console.log(error);
      });
  };

  return (
    <div>
      <div className="min-h-screen bg-base-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-base-300 p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Add New Artwork</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium mb-2">Image URL</label>
              <input required name="imageURL" type="text" placeholder="Enter artwork image URL" className="input input-bordered w-full" />
            </div>

            <div>
              <label className="block font-medium mb-2">Title</label>
              <input required name="title" type="text" placeholder="Enter artwork title" className="input input-bordered w-full" />
            </div>

            <div>
              <label className="block font-medium mb-2">Category</label>
              <select name="category" className="select select-bordered w-full">
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
              <label className="block font-medium mb-2">Medium / Tools</label>
              <input name="medium" type="text" placeholder="e.g., Oil on Canvas, Digital" className="input input-bordered w-full" />
            </div>

            <div>
              <label className="block font-medium mb-2">Description</label>
              <textarea required name="description" rows="4" placeholder="Describe your artwork" className="textarea textarea-bordered w-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2">Dimensions (optional)</label>
                <input name="dimensions" type="text" placeholder="e.g., 24x36 inches" className="input input-bordered w-full" />
              </div>
              <div>
                <label className="block font-medium mb-2">Price (optional)</label>
                <input name="price" type="number" placeholder="Enter price" className="input input-bordered w-full" />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">Visibility</label>
              <select name="visibility" className="select select-bordered w-full">
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2">User Name</label>
                <input name="userName" type="text" value={user.displayName} readOnly className="input input-bordered text-base-400 w-full bg-base-100 cursor-not-allowed" />
              </div>
              <div>
                <label className="block font-medium mb-2">User Email</label>
                <input name="userEmail" type="email" value={user.email} readOnly className="input input-bordered w-full text-base-400 bg-base-100 cursor-not-allowed" />
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary w-full sm:w-auto">
                Add Artwork
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"></ToastContainer>
    </div>
  );
};

export default AddArtWork;
