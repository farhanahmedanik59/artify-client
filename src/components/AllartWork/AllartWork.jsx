import { useLoaderData, useNavigate } from "react-router";
import { useState, useMemo } from "react";

import { Fade } from "react-awesome-reveal";

const categories = ["Landscape", "Abstract", "Seascape", "Botanical", "Portrait", "Figurative", "Urban"];

export default function ArtworksPage() {
  const artworks = useLoaderData();
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  // Toggle category selection
  const toggleCategory = (category) => {
    setSelectedCategories((prev) => (prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]));
  };

  // Filter artworks based on search and selected categories
  const filteredArtworks = useMemo(() => {
    let result = artworks;

    // Filter by title (search)
    if (search.trim() !== "") {
      const searchLower = search.toLowerCase();
      result = result.filter((art) => art.title.toLowerCase().includes(searchLower));
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      const selectedLower = selectedCategories.map((cat) => cat.toLowerCase());
      result = result.filter((art) => selectedLower.includes(art.category.toLowerCase()));
    }

    return result;
  }, [artworks, search, selectedCategories]);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8 transition-colors duration-300">
        <Fade>
          <h1 className="text-3xl font-bold mb-6 text-center text-primary">Public Artworks</h1>
        </Fade>

        <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 mb-6">
          <input type="text" placeholder="Search by title or artist..." value={search} onChange={(e) => setSearch(e.target.value)} className="input input-bordered w-full md:w-1/2" />

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`btn btn-sm rounded-full transition-colors duration-200 ${selectedCategories.includes(cat) ? "btn-primary text-white" : "btn-outline btn-primary"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredArtworks.length > 0 ? (
          <div>
            <Fade>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredArtworks.map((art) => (
                  <div key={art._id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition">
                    <figure>
                      <img src={art.imageURL} alt={art.title} className="h-48 w-full object-cover" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{art.title}</h2>
                      <p className="text-sm">
                        <span className="font-medium">Artist:</span> {art.artistName}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Category:</span> {art.category}
                      </p>
                      <div className="card-actions justify-between items-center mt-2">
                        <span className="text-error">❤️ {art.likes}</span>
                        <button onClick={() => navigate(`/arts/${art._id}`)} className="btn btn-primary btn-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Fade>
          </div>
        ) : (
          <p className="text-center text-base-content/70 mt-10">No artworks found matching your search or category.</p>
        )}
      </div>
    </div>
  );
}
