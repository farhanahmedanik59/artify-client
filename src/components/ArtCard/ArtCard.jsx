import { Heart, Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const ArtworkCard = ({ artwork }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`card bg-base-300 shadow-xl transition-all  duration-300 ${isHovered ? "transform -translate-y-2 shadow-2xl" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure className="relative overflow-hidden">
        <img src={artwork.imageURL} alt={artwork.title} className={`w-full h-64 object-cover transition-transform duration-500 ${isHovered ? "scale-105" : "scale-100"}`} />
        <div className="absolute top-3 right-3">
          <button className="btn btn-circle btn-sm bg-base-100/80 backdrop-blur-sm border-0 hover:scale-110 transition-transform duration-200">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </figure>

      <div className="card-body p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="card-title text-lg font-bold line-clamp-1">{artwork.title}</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="avatar">
                <div className="w-6 h-6 rounded-full">
                  <img src={artwork.artistImageURL} alt={artwork.artistName} />
                </div>
              </div>
              <span className="text-sm text-base-content/70">{artwork.artistName}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="badge badge-outline badge-primary">{artwork.category}</div>
          <div className="flex items-center gap-1 text-sm text-base-content/60">
            <Heart className="w-4 h-4" />
            <span>{artwork.likes}</span>
          </div>
        </div>

        <Link to={`arts/${artwork._id}`}>
          <button className="btn btn-primary btn-sm mt-4 gap-2 hover:scale-105 active:scale-95 transition-transform duration-300">
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ArtworkCard;
