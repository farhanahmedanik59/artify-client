import React, { useContext, useState } from "react";
import { AuthContex } from "../../contexts/AuthContex";
import useAxios from "../../hooks/useAxios";
import { toast, ToastContainer } from "react-toastify";

const AddArtWork = () => {
  const { user } = useContext(AuthContex);
  const axiosInstanse = useAxios();
  const [previewImage, setPreviewImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const url = e.target.value;
    setPreviewImage(url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

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

    try {
      const res = await axiosInstanse.post("/add-art", newArt);
      if (res.data.insertedId) {
        toast.success("🎨 Artwork published successfully!");
        form.reset();
        setPreviewImage("");
      }
    } catch (error) {
      toast.error("Failed to add artwork. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-base-content mb-4">Create New Artwork</h1>
          <p className="text-base-content/60 text-lg">Share your masterpiece with the world</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-base-200 rounded-2xl p-4 mb-6">
                <h3 className="font-semibold text-base-content mb-4">Preview</h3>
                <div className="aspect-square rounded-xl bg-base-300 border-2 border-dashed border-base-content/10 flex items-center justify-center overflow-hidden">
                  {previewImage ? (
                    <img src={previewImage} alt="Artwork preview" className="w-full h-full object-cover rounded-xl" onError={() => setPreviewImage("")} />
                  ) : (
                    <div className="text-center text-base-content/30">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm">Image preview</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                <h3 className="font-semibold text-primary mb-3">Tips</h3>
                <ul className="space-y-2 text-sm text-base-content/70">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Use high-resolution images
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Add detailed descriptions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Choose accurate categories
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-base-200  rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6 p-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-base-content mb-2">Image URL *</label>
                    <input
                      required
                      name="imageURL"
                      type="url"
                      onChange={handleImageChange}
                      placeholder="https://images.com/your-artwork.jpg"
                      className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder-base-content/40"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-base-content mb-2">Artwork Title *</label>
                    <input
                      required
                      name="title"
                      type="text"
                      placeholder="Enter artwork title"
                      className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder-base-content/40"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">Category *</label>
                    <select
                      required
                      name="category"
                      className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    >
                      <option value="">Select category</option>
                      <option>Landscape</option>
                      <option>Abstract</option>
                      <option>Portrait</option>
                      <option>Seascape</option>
                      <option>Urban</option>
                      <option>Digital</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">Medium *</label>
                    <select
                      required
                      name="medium"
                      className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    >
                      <option value="">Select medium</option>
                      <option>Oil on Canvas</option>
                      <option>Acrylic</option>
                      <option>Watercolor</option>
                      <option>Digital Art</option>
                      <option>Charcoal</option>
                      <option>Mixed Media</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">Description *</label>
                  <textarea
                    required
                    name="description"
                    rows={4}
                    placeholder="Describe your artwork, inspiration, and techniques..."
                    className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder-base-content/40 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">Dimensions</label>
                    <input
                      name="dimensions"
                      type="text"
                      placeholder="24×36 in"
                      className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder-base-content/40"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">Price</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40">$</span>
                      <input
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full pl-10 pr-4 py-3 bg-base-100 border border-base-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder-base-content/40"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">Visibility</label>
                    <select
                      name="visibility"
                      className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    >
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">Artist</label>
                    <input
                      name="userName"
                      type="text"
                      value={user?.displayName || "Unknown Artist"}
                      readOnly
                      className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-xl text-base-content/60 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">Email</label>
                  <input
                    name="userEmail"
                    type="email"
                    value={user?.email || "No email"}
                    readOnly
                    className="w-full px-4 py-3 bg-base-200 border border-base-300 rounded-xl text-base-content/60 cursor-not-allowed"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Publishing...
                      </div>
                    ) : (
                      "Publish Artwork"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArtWork;
