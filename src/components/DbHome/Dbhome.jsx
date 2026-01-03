// DashboardHome.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { AuthContex } from "../../contexts/AuthContex";

const DashboardHome = () => {
  const { user } = useContext(AuthContex);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    name: "John Doe",
    email: "john@example.com",
    joinedDate: "2024-01-15",
    artworksCount: 0,
    favoritesCount: 0,
    recentArts: [],
    topArts: [],
  });
  const [quickStats, setQuickStats] = useState({
    totalViews: 0,
    engagementRate: 0,
    newFollowers: 0,
    monthlyGrowth: 0,
  });

  // Mock user data - replace with actual API calls
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        setTimeout(() => {
          setUserStats({
            name: user.displayName,
            email: user.email,
            joinedDate: "2024-01-15",
            artworksCount: 24,
            favoritesCount: 12,
            recentArts: [
              { id: 1, title: "Sunset Dreams", category: "Digital", likes: 45, views: 120, date: "2024-01-20" },
              { id: 2, title: "Ocean Waves", category: "Traditional", likes: 32, views: 98, date: "2024-01-18" },
              { id: 3, title: "Urban Sketch", category: "Sketch", likes: 28, views: 76, date: "2024-01-15" },
            ],
            topArts: [
              { id: 1, title: "Digital Portrait", likes: 89, category: "Digital" },
              { id: 2, title: "Abstract Colors", likes: 67, category: "Abstract" },
              { id: 3, title: "Landscape", likes: 54, category: "Traditional" },
            ],
          });

          setQuickStats({
            totalViews: 1250,
            engagementRate: 85,
            newFollowers: 12,
            monthlyGrowth: 24,
          });

          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Chart data
  const weeklyData = [
    { day: "Mon", views: 120, likes: 45 },
    { day: "Tue", views: 180, likes: 67 },
    { day: "Wed", views: 150, likes: 52 },
    { day: "Thu", views: 210, likes: 89 },
    { day: "Fri", views: 190, likes: 76 },
    { day: "Sat", views: 240, likes: 98 },
    { day: "Sun", views: 220, likes: 85 },
  ];

  const categoryData = [
    { name: "Digital", value: 40, color: "#8B5CF6" },
    { name: "Traditional", value: 25, color: "#10B981" },
    { name: "Abstract", value: 20, color: "#F59E0B" },
    { name: "Sketch", value: 15, color: "#3B82F6" },
  ];

  const COLORS = ["#8B5CF6", "#10B981", "#F59E0B", "#3B82F6", "#EC4899"];

  const quickActions = [
    {
      title: "Upload Artwork",
      description: "Add new artwork to your collection",
      icon: "📤",
      color: "from-blue-500 to-cyan-500",
      path: "/dashboard/artworks/add",
      action: () => navigate("/add-artwork"),
    },
    {
      title: "View Analytics",
      description: "Check your artwork performance",
      icon: "📊",
      color: "from-purple-500 to-pink-500",
      path: "/dashboard/analytics",
      action: () => navigate("/dashboard/statistics"),
    },
    {
      title: "Edit Profile",
      description: "Update your profile information",
      icon: "👤",
      color: "from-amber-500 to-orange-500",
      path: "/dashboard/profile",
      action: () => navigate("/dashboard/profile"),
    },
    {
      title: "Explore Community",
      description: "Discover other artists",
      icon: "👥",
      color: "from-emerald-500 to-teal-500",
      path: "/dashboard/community",
      action: () => navigate("#"),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content/70">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4">
      {/* Hero Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 md:p-8 border border-primary/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
              Welcome back, <span className="text-primary">{userStats.name}</span>! 👋
            </h1>
            <p className="text-base-content/70 mb-4 max-w-2xl">
              Here's what's happening with your art collection today. You have {userStats.artworksCount} artworks and {userStats.favoritesCount} favorites.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="badge badge-primary">Member since {new Date(userStats.joinedDate).toLocaleDateString()}</div>
              <div className="badge badge-outline">{userStats.email}</div>
              <div className="badge badge-success">Active</div>
            </div>
          </div>
          <div className="avatar">
            <div className="w-20 h-20 rounded-full ring-4 ring-primary/20 ring-offset-2 ring-offset-base-100">
              <img src={user.photoURL} alt={userStats.name} className="rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-base-content">{userStats.artworksCount}</div>
                <div className="text-base-content font-medium">Artworks</div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-2xl">🎨</div>
            </div>
            <div className="text-sm text-base-content/60 mt-2">Total uploaded artworks</div>
            <Link to="/explore" className="btn btn-sm btn-outline mt-4">
              View All
            </Link>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-base-content">{userStats.favoritesCount}</div>
                <div className="text-base-content font-medium">Favorites</div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center text-2xl">❤️</div>
            </div>
            <div className="text-sm text-base-content/60 mt-2">Artworks you've favorited</div>
            <Link to="/favorites" className="btn btn-sm btn-outline mt-4">
              View Favorites
            </Link>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-base-content">{quickStats.totalViews}</div>
                <div className="text-base-content font-medium">Total Views</div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center text-2xl">👁️</div>
            </div>
            <div className="text-sm text-base-content/60 mt-2">All-time artwork views</div>
            <div className="badge badge-success badge-sm mt-4">+{quickStats.monthlyGrowth}% this month</div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-base-content">{quickStats.engagementRate}%</div>
                <div className="text-base-content font-medium">Engagement</div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-2xl">📈</div>
            </div>
            <div className="text-sm text-base-content/60 mt-2">Average engagement rate</div>
            <div className="badge badge-info badge-sm mt-4">+{quickStats.newFollowers} new followers</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Performance Chart */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between mb-6">
              <h3 className="card-title text-base-content">Weekly Performance</h3>
              <select className="select select-sm select-bordered">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                  <Legend />
                  <Bar dataKey="views" fill="#8B5CF6" name="Views" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="likes" fill="#10B981" name="Likes" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between mb-6">
              <h3 className="card-title text-base-content">Category Distribution</h3>
              <div className="text-sm text-base-content/60">{userStats.artworksCount} artworks</div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <span className="text-sm text-base-content/70">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-bold text-base-content mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button key={index} onClick={action.action} className={`card bg-gradient-to-br ${action.color} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
              <div className="card-body p-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="text-3xl mb-3">{action.icon}</div>
                  <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h4 className="card-title text-white mb-2">{action.title}</h4>
                <p className="text-white/80 text-sm">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity & Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-scroll">
        {/* Recent Artworks */}
        <div className="card bg-base-100 shadow-lg overflow-scroll ">
          <div className="card-body">
            <div className="flex items-center justify-between mb-6">
              <h3 className="card-title text-base-content">Recent Artworks</h3>
              <Link to="/explore" className="btn btn-sm btn-ghost">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {userStats.recentArts.map((art) => (
                <div key={art.id} className="flex items-center gap-4 p-3 hover:bg-base-200 rounded-lg transition-colors group">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-lg">
                      <div className="bg-gradient-to-br from-primary/20 to-secondary/20 w-full h-full rounded-lg flex items-center justify-center">
                        <span className="text-lg">🎨</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-base-content group-hover:text-primary transition-colors">{art.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-base-content/60">
                      <span className="badge badge-outline badge-sm">{art.category}</span>
                      <span>{art.likes} likes</span>
                      <span>{art.views} views</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-base-content/70">{new Date(art.date).toLocaleDateString()}</div>
                    <button className="btn btn-ghost btn-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Artworks */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between mb-6">
              <h3 className="card-title text-base-content">Top Performing</h3>
              <div className="badge badge-primary">This Month</div>
            </div>
            <div className="space-y-4">
              {userStats.topArts.map((art, index) => (
                <div key={art.id} className="flex items-center gap-4 p-3 hover:bg-base-200 rounded-lg transition-colors">
                  <div className="flex items-center justify-center w-8">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        index === 0 ? "bg-gradient-to-br from-amber-500 to-orange-500" : index === 1 ? "bg-gradient-to-br from-gray-400 to-gray-600" : "bg-gradient-to-br from-amber-700 to-amber-900"
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-base-content">{art.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-base-content/60">
                      <span className="badge badge-outline badge-sm">{art.category}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">{art.likes} likes</div>
                    <div className="text-xs text-base-content/60">Engagement</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-base-300">
              <div className="flex items-center justify-between text-sm">
                <span className="text-base-content/70">Overall Performance Score</span>
                <div className="flex items-center gap-2">
                  <div className="rating rating-sm">
                    {[...Array(5)].map((_, i) => (
                      <input key={i} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked={i < 4} readOnly />
                    ))}
                  </div>
                  <span className="font-bold text-base-content">4.2/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <div className="card-body">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-base-content mb-2">Join the Artify Community</h3>
              <p className="text-base-content/70 mb-4">Connect with other artists, share your work, and get inspired by thousands of creative minds.</p>
              <div className="flex flex-wrap gap-3">
                <div className="stat">
                  <div className="stat-title text-base-content/70">Community Size</div>
                  <div className="stat-value text-primary">10K+</div>
                  <div className="stat-desc">Active Artists</div>
                </div>
                <div className="stat">
                  <div className="stat-title text-base-content/70">Total Artworks</div>
                  <div className="stat-value text-secondary">50K+</div>
                  <div className="stat-desc">Uploaded Pieces</div>
                </div>
                <div className="stat">
                  <div className="stat-title text-base-content/70">Daily Activity</div>
                  <div className="stat-value text-accent">1K+</div>
                  <div className="stat-desc">New Interactions</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button className="btn btn-primary">
                Explore Community
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button className="btn btn-outline">
                Join Challenges
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
