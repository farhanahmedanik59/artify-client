import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { Fade } from "react-awesome-reveal";

const TopArtists = () => {
  const [timeframe, setTimeframe] = useState("week");
  const axiosInstance = useAxios();
  const [topArtists, setTopartists] = useState([]);

  useEffect(() => {
    axiosInstance.get("/arts/topartists").then((res) => {
      setTopartists(res.data);
    });
  }, []);

  return (
    <div className="bg-base-200 text-base-content rounded-2xl shadow-lg p-6 transition-colors duration-300 max-w-[80%] mx-auto mb-9">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Top Artists</h2>
          <p className="opacity-70 mt-1">Most popular creators this {timeframe}</p>
        </div>
        <div className="flex space-x-2 bg-base-300 rounded-lg p-1 mt-3 sm:mt-0">
          {["week"].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${timeframe === period ? "bg-primary text-primary-content shadow-sm" : "hover:bg-base-100 opacity-80"}`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {topArtists && topArtists.length > 0 ? (
        <div className="space-y-4">
          <Fade>
            {topArtists.map((artist, index) => (
              <div key={artist.id || index} className="flex items-center p-4 rounded-xl bg-base-100 border border-base-300 hover:border-primary/40 hover:bg-base-300 transition-all duration-200">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-primary-content font-bold text-lg mr-4">
                  {index + 1}
                </div>
                <div className="flex-shrink-0 mr-4">
                  <div className="relative">
                    <img src={artist.artistImageURL} alt={artist.name} className="w-14 h-14 rounded-full object-cover border-2 border-base-200 shadow" />
                    {artist.isTrending && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-success-content" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold">{artist.artistName}</h3>
                      <p className="text-sm opacity-70">{artist.specialty}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                      <div className="text-center">
                        <p className="text-sm font-medium">{artist.price}</p>
                        <p className="text-xs opacity-70">Sales</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">5</p>
                        <p className="text-xs opacity-70">Rating</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs opacity-70 mb-1">
                      <span>Performance</span>
                      <span className={`font-medium ${artist.change?.includes("+") ? "text-success" : "text-error"}`}>{artist.change}</span>
                    </div>
                    <progress className="progress progress-primary w-full" value={(artist.sales / topArtists[0].sales) * 100} max="100"></progress>
                  </div>
                </div>
              </div>
            ))}
          </Fade>
        </div>
      ) : (
        <p className="text-center opacity-70 mt-4">Loading top artists...</p>
      )}

      <div className="mt-6 text-center">
        <button className="btn btn-outline rounded-full gap-2">
          View All Artists
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TopArtists;
