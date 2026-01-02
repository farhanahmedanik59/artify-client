// DashboardLayout.jsx
import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    role: "user",
    joinedDate: "2024-01-15",
    artworksCount: 24,
    favoritesCount: 12,
  };

  const handleLogout = () => {
    // Your logout logic here
    console.log("Logging out...");
    navigate("/login");
  };

  // Menu items for user role
  const menuItems = [
    {
      name: "Dashboard Home",
      icon: "🏠",
      path: "/dashboard",
      description: "Overview and quick stats",
    },
    {
      name: "User Info",
      icon: "👤",
      path: "/dashboard/user-info",
      description: "Your profile and account details",
    },
    {
      name: "Statistics",
      icon: "📈",
      path: "/dashboard/statistics",
      description: "Detailed statistics and metrics",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Top Navbar */}
      <nav className="bg-base-200 border-b border-base-300 shadow-sm sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md text-base-content hover:bg-base-300 lg:hidden">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <Link to="/" className="text-xl font-bold text-primary ml-4">
                Artify Dashboard
              </Link>
            </div>

            {/* Right side - Profile dropdown */}
            <div className="relative">
              <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-300 transition-colors">
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-200">
                    <img src={user.avatar} alt={user.name} />
                  </div>
                </div>
                <div className="hidden md:block text-left">
                  <div className="font-medium text-base-content">{user.name}</div>
                  <div className="text-xs text-base-content/70">{user.role}</div>
                </div>
                <svg className={`w-4 h-4 transition-transform ${profileDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-base-100 rounded-lg shadow-xl border border-base-300 py-2 z-50">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-base-300">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                          <img src={user.avatar} alt={user.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-base-content">{user.name}</div>
                        <div className="text-sm text-base-content/70">{user.email}</div>
                        <div className="text-xs text-base-content/60 mt-1">Member since {new Date(user.joinedDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-3">
                      <div className="text-center">
                        <div className="font-bold text-primary">{user.artworksCount}</div>
                        <div className="text-xs text-base-content/70">Artworks</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-secondary">{user.favoritesCount}</div>
                        <div className="text-xs text-base-content/70">Favorites</div>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown menu items */}
                  <Link to="/dashboard/profile" className="block px-4 py-3 hover:bg-base-200">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-base-content/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <div>
                        <div className="font-medium text-base-content">Profile</div>
                        <div className="text-xs text-base-content/60">View and edit your profile</div>
                      </div>
                    </div>
                  </Link>

                  <Link to="/dashboard" className="block px-4 py-3 hover:bg-base-200">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-base-content/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      <div>
                        <div className="font-medium text-base-content">Dashboard Home</div>
                        <div className="text-xs text-base-content/60">Back to dashboard overview</div>
                      </div>
                    </div>
                  </Link>

                  <div className="border-t border-base-300 mt-2 pt-2">
                    <button onClick={handleLogout} className="w-full px-4 py-3 text-left hover:bg-base-200 text-error flex items-center gap-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <div>
                        <div className="font-medium">Logout</div>
                        <div className="text-xs opacity-70">Sign out of your account</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "w-64" : "w-0"} bg-base-200 border-r border-base-300 min-h-[calc(100vh-4rem)] transition-all duration-300 overflow-hidden lg:w-64 lg:block`}>
          <div className="p-4">
            {/* User quick stats */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-200">
                    <img src={user.avatar} alt={user.name} />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-base-content truncate">{user.name}</div>
                  <div className="text-xs text-base-content/70">Artify User</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-base-100 rounded-lg p-2">
                  <div className="font-bold text-primary">{user.artworksCount}</div>
                  <div className="text-xs text-base-content/70">Artworks</div>
                </div>
                <div className="bg-base-100 rounded-lg p-2">
                  <div className="font-bold text-secondary">{user.favoritesCount}</div>
                  <div className="text-xs text-base-content/70">Favorites</div>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link key={item.name} to={item.path} className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300 transition-colors group">
                  <span className="text-xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-base-content group-hover:text-primary transition-colors">{item.name}</div>
                    <div className="text-xs text-base-content/60">{item.description}</div>
                  </div>
                  <svg className="w-4 h-4 text-base-content/40 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            {/* Analytics preview */}
            <div className="mt-8 p-4 bg-base-100 rounded-xl border border-base-300">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📈</span>
                <div className="font-medium text-base-content">Quick Stats</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/70">Weekly Views</span>
                  <span className="font-bold text-primary">↑ 24%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/70">Engagement</span>
                  <span className="font-bold text-secondary">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/70">New Followers</span>
                  <span className="font-bold text-accent">+12</span>
                </div>
              </div>
              <button onClick={() => navigate("/dashboard/analytics")} className="w-full mt-4 btn btn-sm btn-outline">
                View Full Analytics
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className={`flex-1 p-4 md:p-6 lg:p-8 transition-all duration-300 ${sidebarOpen ? "lg:ml-0" : ""}`}>
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default DashboardLayout;
