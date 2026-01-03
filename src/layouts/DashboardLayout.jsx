// DashboardLayout.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { AuthContex } from "../contexts/AuthContex";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContex);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false); // Always closed on mobile by default
      } else {
        setSidebarOpen(true); // Always open on desktop by default
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target) && menuButtonRef.current && !menuButtonRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [sidebarOpen, isMobile]);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Mock user data
  const profile = {
    name: user.displayName,
    email: user.email,
    avatar: user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    role: "user",
    joinedDate: "2024-01-15",
    artworksCount: 24,
    favoritesCount: 12,
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutsideProfile = (event) => {
      if (profileDropdownOpen && !event.target.closest(".profile-dropdown-trigger") && !event.target.closest(".profile-dropdown")) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutsideProfile);
    return () => document.removeEventListener("click", handleClickOutsideProfile);
  }, [profileDropdownOpen]);

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Top Navbar */}
      <nav className="bg-base-200 border-b border-base-300 shadow-sm sticky top-0 z-40">
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Menu button and Logo */}
            <div className="flex items-center">
              <button ref={menuButtonRef} onClick={toggleSidebar} className="p-2 rounded-md text-base-content hover:bg-base-300 lg:hidden" aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <Link to="/" className="text-lg sm:text-xl font-bold text-primary ml-2 sm:ml-4 truncate max-w-[140px] sm:max-w-none">
                Artify Dashboard
              </Link>
            </div>

            {/* Right side - Profile dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center gap-2 sm:gap-3 p-1 sm:p-2 rounded-lg hover:bg-base-300 transition-colors profile-dropdown-trigger"
                aria-label="Profile menu"
              >
                <div className="avatar">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-primary ring-offset-1 ring-offset-base-200">
                    <img src={profile.avatar} alt={profile.name} className="w-full h-full" />
                  </div>
                </div>
                <div className="hidden sm:block text-left">
                  <div className="font-medium text-base-content text-sm sm:text-base truncate max-w-[100px]">{profile.name}</div>
                  <div className="text-xs text-base-content/70">{profile.role}</div>
                </div>
                <svg className={`w-4 h-4 transition-transform ${profileDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-base-100 rounded-lg shadow-xl border border-base-300 py-2 z-50 profile-dropdown">
                  {/* profile info */}
                  <div className="px-3 sm:px-4 py-3 border-b border-base-300">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                          <img src={profile.avatar} alt={profile.name} className="w-full h-full" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-base-content truncate">{profile.name}</div>
                        <div className="text-sm text-base-content/70 truncate">{profile.email}</div>
                        <div className="text-xs text-base-content/60 mt-1 truncate">Member since {new Date(profile.joinedDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex gap-3 sm:gap-4 mt-3">
                      <div className="text-center flex-1">
                        <div className="font-bold text-primary text-sm sm:text-base">{profile.artworksCount}</div>
                        <div className="text-xs text-base-content/70">Artworks</div>
                      </div>
                      <div className="text-center flex-1">
                        <div className="font-bold text-secondary text-sm sm:text-base">{profile.favoritesCount}</div>
                        <div className="text-xs text-base-content/70">Favorites</div>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown menu items */}
                  <Link to="/dashboard/user-info" className="block px-3 sm:px-4 py-2 hover:bg-base-200" onClick={() => setProfileDropdownOpen(false)}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-base-content/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-base-content text-sm sm:text-base truncate">Profile</div>
                        <div className="text-xs text-base-content/60 truncate">View and edit your profile</div>
                      </div>
                    </div>
                  </Link>

                  <Link to="/dashboard" className="block px-3 sm:px-4 py-2 hover:bg-base-200" onClick={() => setProfileDropdownOpen(false)}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-base-content/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-base-content text-sm sm:text-base truncate">Dashboard Home</div>
                        <div className="text-xs text-base-content/60 truncate">Back to dashboard overview</div>
                      </div>
                    </div>
                  </Link>

                  <div className="border-t border-base-300 mt-2 pt-2">
                    <button onClick={handleLogout} className="w-full px-3 sm:px-4 py-2 text-left hover:bg-base-200 text-error flex items-center gap-2 sm:gap-3">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm sm:text-base">Logout</div>
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

      <div className="flex relative">
        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={`fixed lg:relative inset-y-0 left-0 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 mt-14 md:mt-0 lg:z-auto w-64 bg-base-200 border-r border-base-300 min-h-[calc(100vh-4rem)] overflow-y-auto lg:w-64`}
        >
          <div className="p-4">
            {/* profile quick stats */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-3 sm:p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-200">
                    <img src={profile.avatar} alt={profile.name} className="w-full h-full" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-base-content truncate">{profile.name}</div>
                  <div className="text-xs text-base-content/70">Artify profile</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-base-100 rounded-lg p-2">
                  <div className="font-bold text-primary text-sm sm:text-base">{profile.artworksCount}</div>
                  <div className="text-xs text-base-content/70">Artworks</div>
                </div>
                <div className="bg-base-100 rounded-lg p-2">
                  <div className="font-bold text-secondary text-sm sm:text-base">{profile.favoritesCount}</div>
                  <div className="text-xs text-base-content/70">Favorites</div>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link key={item.name} to={item.path} className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300 transition-colors group" onClick={() => isMobile && setSidebarOpen(false)}>
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-base-content group-hover:text-primary transition-colors truncate text-sm sm:text-base">{item.name}</div>
                    <div className="text-xs text-base-content/60 truncate">{item.description}</div>
                  </div>
                  <svg
                    className="w-4 h-4 text-base-content/40 group-hover:text-primary transition-colors flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            {/* Analytics preview */}
            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-base-100 rounded-xl border border-base-300">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📈</span>
                <div className="font-medium text-base-content text-sm sm:text-base">Quick Stats</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-base-content/70">Weekly Views</span>
                  <span className="font-bold text-primary text-sm sm:text-base">↑ 24%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-base-content/70">Engagement</span>
                  <span className="font-bold text-secondary text-sm sm:text-base">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-base-content/70">New Followers</span>
                  <span className="font-bold text-accent text-sm sm:text-base">+12</span>
                </div>
              </div>
              <button
                onClick={() => {
                  navigate("/dashboard/statistics");
                  isMobile && setSidebarOpen(false);
                }}
                className="w-full mt-4 btn btn-sm btn-outline text-xs sm:text-sm"
              >
                View Full Analytics
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className={`flex-1 p-3 sm:p-4 md:p-6 lg:p-1 transition-all duration-300 min-h-[calc(100vh-4rem)] overflow-x-auto ${sidebarOpen && !isMobile ? "" : ""}`}>
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Mobile overlay */}
        {sidebarOpen && isMobile && <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setSidebarOpen(false)} />}
      </div>
    </div>
  );
};

export default DashboardLayout;
