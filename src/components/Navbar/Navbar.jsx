import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "hover:text-primary")}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/explore" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "hover:text-primary")}>
          Explore
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-artwork" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "hover:text-primary")}>
          Add Artwork
        </NavLink>
      </li>
      <li>
        <NavLink to="/gallery" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "hover:text-primary")}>
          My Gallery
        </NavLink>
      </li>
      <li>
        <NavLink to="/favorites" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "hover:text-primary")}>
          Favorites
        </NavLink>
      </li>
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
          <NavLink className="btn btn-primary btn-sm rounded-lg text-white transition-colors duration-300" to="/login">
            Login
          </NavLink>
          <NavLink className="btn btn-primary btn-sm rounded-lg text-white transition-colors duration-300" to="/register">
            Register
          </NavLink>
        </div>

        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle transition-colors duration-300">
            ☰
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 shadow-lg font-medium transition-colors duration-300">
            {navLinks}
            <div className="divider my-1"></div>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
