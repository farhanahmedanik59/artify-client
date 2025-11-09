import { useLoaderData, useNavigate } from "react-router";
import { useState, useMemo } from "react";

export default function ArtworksPage() {
  const artworks = useLoaderData();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredArtworks = useMemo(() => {
    return artworks.filter((art) => art.title.toLowerCase().includes(search.toLowerCase()) || art.artistName.toLowerCase().includes(search.toLowerCase()));
  }, [artworks, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Public Artworks</h1>

      <div className="flex justify-center mb-8">
        <input type="text" placeholder="Search by title or artist..." value={search} onChange={(e) => setSearch(e.target.value)} className="input input-bordered w-full md:w-1/2" />
      </div>

      {filteredArtworks.length > 0 ? (
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
      ) : (
        <p className="text-center text-base-content/70 mt-10">No artworks found matching your search.</p>
      )}
    </div>
  );
}
