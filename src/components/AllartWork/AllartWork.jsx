import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import { Fade } from "react-awesome-reveal";
import useAxios from "../../hooks/useAxios";
import LoadingPage from "../LoadingPage/LoadingPage";

const categories = ["Landscape", "Abstract", "Seascape", "Botanical", "Portrait", "Figurative", "Urban"];

export default function ArtworksPage() {
  const axiosInstance = useAxios();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    let isMounted = true;
    setLoading(true);
    axiosInstance
      .get("/allarts")
      .then((res) => {
        if (isMounted) setArtworks(res.data);
      })
      .catch((err) => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [axiosInstance]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => (prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]));
  };

  const filteredArtworks = useMemo(() => {
    let result = artworks;
    if (search.trim() !== "") {
      const searchLower = search.toLowerCase();
      result = result.filter((art) => art.title.toLowerCase().includes(searchLower));
    }
    if (selectedCategories.length > 0) {
      const selectedLower = selectedCategories.map((cat) => cat.toLowerCase());
      result = result.filter((art) => selectedLower.includes(art.category.toLowerCase()));
    }
    return result;
  }, [artworks, search, selectedCategories]);

  if (loading) return <LoadingPage />;
  if (error) return <p className="text-center text-red-500 mt-10">Failed to load artworks.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 transition-colors duration-300">
      <Fade direction="up" triggerOnce>
        <h1 className="text-4xl font-bold mb-6 text-center text-primary">Public Artworks</h1>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Fade>
            {filteredArtworks.map((art) => (
              <div key={art._id} className="card bg-base-200 shadow-xl transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl">
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
          </Fade>
        </div>
      ) : (
        <p className="text-center text-base-content/70 mt-10">No artworks found matching your search or category.</p>
      )}
    </div>
  );
}
