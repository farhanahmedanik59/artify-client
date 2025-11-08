import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { Sun, Moon, LogOut } from "lucide-react";
import { AuthContex } from "../../contexts/AuthContex";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase.config";

export default function Navbar() {
  const { user } = useContext(AuthContex);
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const hideTimeout = useRef(null);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const handleLogout = () => {
    signOut(auth);
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="hover:text-primary">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/explore" className="hover:text-primary">
          Explore
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/add-artwork" className="hover:text-primary">
              Add Artwork
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallery" className="hover:text-primary">
              My Gallery
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className="hover:text-primary">
              Favorites
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-6 transition-colors duration-300">
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold transition-colors duration-300">
          🎨 Artify
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium transition-colors duration-300">{navLinks}</ul>
      </div>

      <div className="navbar-end flex items-center gap-2">
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle hover:bg-base-200 transition-colors duration-300">
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <div
              className="relative"
              onMouseEnter={() => {
                if (hideTimeout.current) clearTimeout(hideTimeout.current);
                setShowDropdown(true);
              }}
              onMouseLeave={() => {
                hideTimeout.current = setTimeout(() => setShowDropdown(false), 300);
              }}
            >
              <img src={user.photoURL || "https://via.placeholder.com/40"} alt="User Avatar" className="w-10 h-10 rounded-full cursor-pointer" onMouseEnter={() => setShowDropdown(true)} />
              <div
                className={`absolute right-0 mt-2 w-48 bg-base-200 rounded-lg shadow-lg p-3 flex flex-col gap-2 transition-opacity duration-300 ease-in-out ${
                  showDropdown ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <span className="font-medium text-base-content">{user.displayName || user.email}</span>
                <button onClick={handleLogout} className="btn btn-outline btn-sm gap-2 justify-start">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Link className="btn btn-primary btn-sm rounded-lg text-white transition-colors duration-300" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary btn-sm rounded-lg text-white transition-colors duration-300" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle transition-colors duration-300">
            ☰
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 shadow-lg font-medium transition-colors duration-300">
            {navLinks}
            <div className="divider my-1"></div>
            {/*  */}
          </ul>
        </div>
      </div>
    </div>
  );
}
