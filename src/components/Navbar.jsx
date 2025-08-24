import { Link, NavLink, useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import useAuth from "../hooks/useAuth";
import logo from "/foddie.svg";
import { toast } from "react-toastify";
import { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import useTheme from "../hooks/useTheme";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const { darkMode, handleDarkModeToggle } = useTheme();

  const navigate = useNavigate();

  //  Handle User Logout
  const handleSignOut = async () => {
    await logOut();
    toast.success("Sign Out successfully");
    navigate("/login");
  };

  // Navigation Links
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/foods">Foods</NavLink>
      </li>
      <li>
        <NavLink to="/gallery">Gallery</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

  // Admin Links
  const adminLinks = (
    <>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>

      <li>
        <button onClick={handleSignOut} className="mt-3 bg-base-200">
          <GoSignOut /> Logout
        </button>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 h-20 flex backdrop-blur-lg">
      <div className="container mx-auto navbar">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>

          <Link to="/">
            {/* <img className="w-32" src={logo} alt="Logo" />--- */}
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          <div className="text-2xl mr-3">
            <button onClick={handleDarkModeToggle}>
              {darkMode ? <MdLightMode /> : <MdDarkMode />}
            </button>
          </div>
          {/* Show Loading State */}
          {loading ? (
            <span className="loading loading-ring loading-lg"></span>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {/* <img
                    alt="User Avatar"
                    
                    src={user?.photoURL || userInfo?.photo}
                  /> */}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {adminLinks}
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-warning">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
