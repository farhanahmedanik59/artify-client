import { Heart, Eye } from "lucide-react";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router";

const ArtworkCard = ({ artwork }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Fade>
      <div
        className={`card bg-base-300  h-[550px] shadow-xl rounded-lg p-3 overflow-hidden transition-all duration-300 ${isHovered ? "transform -translate-y-2 shadow-2xl" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <figure className="relative h-90 overflow-hidden">
          <img src={artwork.imageURL} alt={artwork.title} className={`w-full h-full rounded-md object-cover transition-transform duration-500 ${isHovered ? "scale-105" : "scale-100"}`} />
          <div className="absolute top-3 right-3">
            <button className="btn btn-circle btn-sm bg-base-100/80 backdrop-blur-sm border-0 hover:scale-110 transition-transform duration-200">
              <Heart className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </figure>

        <div className="card-body p-4 flex flex-col justify-between h-[calc(100%-16rem)]">
          <div>
            <h3 className="card-title text-xl font-semibold line-clamp-1 mb-2">{artwork.title}</h3>

            <div className="flex items-center gap-3 mb-4">
              <div className="avatar">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img src={artwork.artistImageURL} alt={artwork.artistName} />
                </div>
              </div>
              <span className="text-sm text-base-content/70">{artwork.artistName}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="badge badge-outline badge-primary">{artwork.category}</div>
              <div className="flex items-center gap-1 text-sm text-base-content/60">
                <Heart className="w-4 h-4" />
                <span>{artwork.likes}</span>
              </div>
            </div>
          </div>

          <Link to={`arts/${artwork._id}`} className="mt-4">
            <button className="btn btn-primary w-full gap-2 hover:scale-105 active:scale-95 transition-transform duration-300">
              <Eye className="w-4 h-4" />
              View Details
            </button>
          </Link>
        </div>
      </div>
    </Fade>
  );
};

export default ArtworkCard;
