import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { Sun, Moon, LogOut, LayoutDashboard, User, Settings, Bell } from "lucide-react";
import { AuthContex } from "../../contexts/AuthContex";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase.config";
import { Fade } from "react-awesome-reveal";
import userPng from "../../assets/user.png";

export default function Navbar() {
  const { user } = useContext(AuthContex);
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [notifications, setNotifications] = useState(3); // Mock notification count
  const hideTimeout = useRef(null);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const handleLogout = () => signOut(auth);

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="hover:text-primary">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/explore" className="hover:text-primary">
          Explore Artwork
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-artwork" className="hover:text-primary">
          Add Artwork
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/gallery" className="hover:text-primary">
              My Gallery
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className="hover:text-primary">
              My Favorites
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100/95 backdrop-blur-sm shadow-md sticky top-0 z-50 px-4 sm:px-6 transition-all duration-300">
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold transition-colors duration-300">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">🎨</div>
          <span className="hidden sm:inline">Artify</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium gap-1">{navLinks}</ul>
      </div>

      <div className="navbar-end flex items-center gap-2 sm:gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle hover:bg-base-200 transition-all duration-300 hover:scale-105"
          title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Notifications */}
        {user && (
          <div className="relative">
            <button className="btn btn-ghost btn-circle hover:bg-base-200 transition-all duration-300 hover:scale-105" title="Notifications">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-content text-xs rounded-full flex items-center justify-center animate-pulse">{notifications}</span>
              )}
            </button>
          </div>
        )}

        {/* User Section - Desktop */}
        <div className="hidden lg:flex items-center">
          {user ? (
            <div
              className="relative"
              onMouseEnter={() => {
                if (hideTimeout.current) clearTimeout(hideTimeout.current);
                setShowDropdown(true);
              }}
              onMouseLeave={() => {
                hideTimeout.current = setTimeout(() => setShowDropdown(false), 200);
              }}
            >
              <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200 transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={user.photoURL || userPng}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-base-100 group-hover:ring-primary/60 transition-all duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-base-100"></div>
                </div>
                <div className="text-left hidden xl:block">
                  <div className="font-medium text-base-content truncate max-w-[120px]">{user.displayName || user.email?.split("@")[0]}</div>
                  <div className="text-xs text-base-content/60">Premium Member</div>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Enhanced Dropdown */}
              {showDropdown && (
                <Fade cascade direction="down" triggerOnce>
                  <div className="absolute right-0 mt-2 w-64 bg-base-100 rounded-xl shadow-2xl border border-base-300 overflow-hidden z-50">
                    {/* User Info Header */}
                    <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-base-300">
                      <div className="flex items-center gap-3">
                        <img src={user.photoURL || userPng} alt="User Avatar" className="w-12 h-12 rounded-full ring-2 ring-primary/50 ring-offset-2 ring-offset-base-100" />
                        <div className="flex-1">
                          <div className="font-bold text-base-content truncate">{user.displayName || "Artify User"}</div>
                          <div className="text-sm text-base-content/70 truncate">{user.email}</div>
                          <div className="text-xs text-base-content/60 mt-1">Joined 2024</div>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-3 pt-3 border-t border-base-300/50">
                        <div className="text-center">
                          <div className="font-bold text-primary">0</div>
                          <div className="text-xs text-base-content/70">Artworks</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-secondary">0</div>
                          <div className="text-xs text-base-content/70">Favorites</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-accent">85%</div>
                          <div className="text-xs text-base-content/70">Engagement</div>
                        </div>
                      </div>
                    </div>

                    {/* Dropdown Menu Items */}
                    <div className="py-2">
                      <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-base-200 transition-colors duration-200 group" onClick={() => setShowDropdown(false)}>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30">
                          <LayoutDashboard size={18} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-base-content">Dashboard</div>
                          <div className="text-xs text-base-content/60">Overview & analytics</div>
                        </div>
                      </Link>

                      <Link to="/dashboard/user-info" className="flex items-center gap-3 px-4 py-3 hover:bg-base-200 transition-colors duration-200 group" onClick={() => setShowDropdown(false)}>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/30">
                          <User size={18} className="text-blue-500" />
                        </div>
                        <Link to={"/dashboard/user-info"}>
                          {" "}
                          <div>
                            <div className="font-medium text-base-content">My Profile</div>
                            <div className="text-xs text-base-content/60">Edit profile & settings</div>
                          </div>
                        </Link>
                      </Link>

                      <div className="border-t border-base-300 my-2"></div>

                      <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 hover:bg-error/10 text-error transition-colors duration-200 w-full group">
                        <div className="w-8 h-8 rounded-lg bg-error/10 flex items-center justify-center group-hover:bg-error/20">
                          <LogOut size={18} />
                        </div>
                        <div>
                          <div className="font-medium">Logout</div>
                          <div className="text-xs opacity-70">Sign out of your account</div>
                        </div>
                      </button>
                    </div>

                    {/* Quick Stats Footer */}
                    <div className="px-4 py-3 bg-base-200 border-t border-base-300">
                      <div className="text-xs text-base-content/60">Quick Stats</div>
                      <div className="flex gap-4 mt-2">
                        <div className="text-center flex-1">
                          <div className="text-sm font-bold text-primary">12K</div>
                          <div className="text-xs text-base-content/60">Views</div>
                        </div>
                        <div className="text-center flex-1">
                          <div className="text-sm font-bold text-secondary">245</div>
                          <div className="text-xs text-base-content/60">Likes</div>
                        </div>
                        <div className="text-center flex-1">
                          <div className="text-sm font-bold text-accent">89%</div>
                          <div className="text-xs text-base-content/60">Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fade>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link className="btn btn-ghost hover:bg-base-200 transition-colors duration-300" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary rounded-lg text-white transition-all duration-300 hover:shadow-lg" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-72 shadow-2xl border border-base-300 font-medium transition-colors duration-300 p-4">
            {/* Mobile User Info */}
            {user && (
              <div className="mb-4 pb-4 border-b border-base-300">
                <div className="flex items-center gap-3">
                  <img src={user.photoURL || userPng} alt="User Avatar" className="w-12 h-12 rounded-full ring-2 ring-primary/50" />
                  <div>
                    <div className="font-bold text-base-content">{user.displayName || user.email?.split("@")[0]}</div>
                    <div className="text-sm text-base-content/70">Premium Member</div>
                  </div>
                </div>
              </div>
            )}

            {navLinks}

            <div className="divider my-2"></div>

            {/* Mobile Dashboard Links */}
            {user && (
              <>
                <li>
                  <Link to="/dashboard" className="flex items-center gap-3 py-3">
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/user-info" className="flex items-center gap-3 py-3">
                    <User size={18} />
                    <span>My Profile</span>
                  </Link>
                </li>

                <div className="divider my-2"></div>
              </>
            )}

            {user ? (
              <li>
                <button onClick={handleLogout} className="btn btn-outline btn-error btn-sm gap-2 justify-start w-full">
                  <LogOut size={16} /> Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link className="btn btn-primary btn-sm rounded-lg text-white w-full mb-2" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="btn btn-outline btn-sm rounded-lg w-full" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
