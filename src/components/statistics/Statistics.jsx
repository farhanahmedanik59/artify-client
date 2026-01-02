// StatisticsSection.jsx
import React, { useState, useEffect } from "react";

const StatisticsSection = () => {
  const [statistics, setStatistics] = useState({
    allArts: 0,
    favourite: 0,
    loading: true,
    error: null,
  });

  const API_URL = "https://artify-server-iota.vercel.app/statistics";

  const fetchStatistics = async () => {
    try {
      setStatistics((prev) => ({ ...prev, loading: true, error: null }));
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStatistics({
        allArts: data.allArts,
        favourite: data.favourite,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setStatistics((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load statistics",
      }));
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const regularArts = statistics.allArts - statistics.favourite;
  const favoritePercent = statistics.allArts > 0 ? Math.round((statistics.favourite / statistics.allArts) * 100) : 0;

  if (statistics.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (statistics.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error shadow-lg max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-bold">Error loading statistics!</h3>
            <div className="text-xs">{statistics.error}</div>
            <button onClick={fetchStatistics} className="btn btn-sm btn-outline mt-2">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-4">Artify Statistics</h1>
          <p className="text-base-content/70 max-w-2xl mx-auto">Real-time overview of your art collection. Data updates automatically.</p>
        </div>

        {/* Statistics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {/* Total Arts Card */}
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="card-title text-base-content/70 text-sm md:text-base">Total Arts</h3>
                  <p className="text-2xl md:text-4xl font-bold text-primary mt-1 md:mt-2">{statistics.allArts}</p>
                </div>
                <div className="p-2 md:p-3 rounded-full bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-2 md:mt-4">
                <div className="text-xs md:text-sm text-base-content/70">All uploaded artworks</div>
              </div>
            </div>
          </div>

          {/* Favorites Card */}
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="card-title text-base-content/70 text-sm md:text-base">Favorites</h3>
                  <p className="text-2xl md:text-4xl font-bold text-secondary mt-1 md:mt-2">{statistics.favourite}</p>
                </div>
                <div className="p-2 md:p-3 rounded-full bg-secondary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-2 md:mt-4">
                <div className="text-xs md:text-sm text-base-content/70">Arts marked with ❤️</div>
              </div>
            </div>
          </div>

          {/* Regular Arts Card */}
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="card-title text-base-content/70 text-sm md:text-base">Regular Arts</h3>
                  <p className="text-2xl md:text-4xl font-bold text-accent mt-1 md:mt-2">{regularArts}</p>
                </div>
                <div className="p-2 md:p-3 rounded-full bg-accent/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-2 md:mt-4">
                <div className="text-xs md:text-sm text-base-content/70">Not marked as favorite</div>
              </div>
            </div>
          </div>

          {/* Favorite Ratio Card */}
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="card-title text-base-content/70 text-sm md:text-base">Favorite Ratio</h3>
                  <p className="text-2xl md:text-4xl font-bold text-info mt-1 md:mt-2">{favoritePercent}%</p>
                </div>
                <div className="p-2 md:p-3 rounded-full bg-info/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
              </div>
              <div className="mt-2 md:mt-4">
                <div className="text-xs md:text-sm text-base-content/70">Percentage of favorite arts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-base-content mb-4 md:mb-6">Distribution Overview</h2>

              <div className="space-y-6 md:space-y-8">
                {/* Favorite Progress */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
                    <div>
                      <span className="font-medium text-base-content text-sm md:text-base">Favorite Arts Progress</span>
                      <span className="text-xs md:text-sm text-base-content/70 ml-2">
                        ({statistics.favourite} out of {statistics.allArts})
                      </span>
                    </div>
                    <span className="font-medium text-base-content text-sm md:text-base">{favoritePercent}%</span>
                  </div>
                  <progress className="progress progress-primary w-full h-3 md:h-4" value={favoritePercent} max="100"></progress>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                  <div className="bg-base-100 rounded-lg p-4 md:p-6">
                    <div className="text-xs md:text-sm text-base-content/70 mb-1 md:mb-2">Total Collection</div>
                    <div className="text-xl md:text-2xl font-bold text-base-content">{statistics.allArts}</div>
                    <div className="text-xs text-base-content/60 mt-1 md:mt-2">All artworks</div>
                  </div>
                  <div className="bg-base-100 rounded-lg p-4 md:p-6">
                    <div className="text-xs md:text-sm text-base-content/70 mb-1 md:mb-2">Favorites</div>
                    <div className="text-xl md:text-2xl font-bold text-secondary">{statistics.favourite}</div>
                    <div className="text-xs text-base-content/60 mt-1 md:mt-2">Selected favorites</div>
                  </div>
                  <div className="bg-base-100 rounded-lg p-4 md:p-6">
                    <div className="text-xs md:text-sm text-base-content/70 mb-1 md:mb-2">Regular</div>
                    <div className="text-xl md:text-2xl font-bold text-accent">{regularArts}</div>
                    <div className="text-xs text-base-content/60 mt-1 md:mt-2">Standard artworks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="text-center">
          <button onClick={fetchStatistics} className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Statistics
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
