import React, { useContext } from "react";
import { AuthContex } from "../../contexts/AuthContex";

const AddArtWork = () => {
  const { user } = useContext(AuthContex);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = {
      imageURL: form.imageURL.value,
      title: form.title.value,
      category: form.category.value,
      medium: form.medium.value,
      description: form.description.value,
      dimensions: form.dimensions.value,
      price: form.price.value,
      visibility: form.visibility.value,
      userName: form.userName.value,
      userEmail: form.userEmail.value,
    };
    console.log("Form Data:", formData);
  };

  return (
    <div>
      <div className="min-h-screen bg-base-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-base-300 p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Add New Artwork</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium mb-2">Image URL</label>
              <input name="imageURL" type="text" placeholder="Enter artwork image URL" className="input input-bordered w-full" />
            </div>

            <div>
              <label className="block font-medium mb-2">Title</label>
              <input name="title" required type="text" placeholder="Enter artwork title" className="input input-bordered w-full" />
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
              <textarea name="description" rows="4" placeholder="Describe your artwork" className="textarea textarea-bordered w-full" />
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
                <input name="userName" type="text" value={user.displayName} readOnly className="input input-bordered w-full bg-gray-100 cursor-not-allowed" />
              </div>
              <div>
                <label className="block font-medium mb-2">User Email</label>
                <input name="userEmail" type="email" value={user.email} readOnly className="input input-bordered w-full bg-gray-100 cursor-not-allowed" />
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
    </div>
  );
};

export default AddArtWork;
