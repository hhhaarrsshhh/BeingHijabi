import React, { useState, useContext, useEffect, useRef } from "react";
import { FiShoppingCart, FiX, FiSearch, FiMenu } from "react-icons/fi";
import { FaRegUser, FaHeart } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/usercontext";
import axios from "../utils/axios";
import CartContext from "../contexts/cartcontext";
import gsap from "gsap";
import {
  FaUser,
  FaKey,
  FaSignOutAlt,
  FaHome,
  FaShoppingBag,
  FaPhone,
  FaSignInAlt,
  FaUserPlus,
  FaUserShield,
} from "react-icons/fa";

const Header2 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState(false);
  const navigate = useNavigate();

  const { cart, setCart } = useContext(CartContext);

  const fetchCartData = async () => {
    try {
      const { data } = await axios.get(
        `/users/user/currentuser?token=${token}`
      );
      if (data) {
        setCart(data.user.mycart.length);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      try {
        const response = await axios.get(
          `/products/searchproducts?query=${value}`
        );
        setSuggestions(
          response.data.length ? response.data.products : ["No products found"]
        );
        setError("");
      } catch (error) {
        setSuggestions([]);
        setError("Server error, please try again later.");
      }
    } else {
      setSuggestions([]);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const logout = async () => {
    if (token) {
      try {
        await axios.get(`/users/user/logout?token=${token}`);
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        setIsAuthenticated(false);
        navigate("/login");
      } catch (error) {
        alert("Error during logout. Please try again.");
      }
    } else {
      alert("Please sign in to sign out.");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownVisible(!isProfileDropdownVisible);
  };

  const [profile, setProfile] = useState({
    username: "",
    dob: "",
    gender: "",
    phonenumber: "",
    email: "",
    profile: "",
  });
  const [loading, setLoading] = useState(false);
  const fetchProfile = async () => {
    setLoading(true);
    setError(""); 
    try {
      const response = await axios.get(`/users/user/profile?token=${token}`);
      setProfile(response.data.user); 
      console.log(response.data.user); 
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to fetch profile data. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const profileCardRef = useRef(null);
  useEffect(() => {
    // Animation  GSAP 
    gsap.fromTo(
      profileCardRef.current,
      { x: "100%", opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1000, ease: "power3.out" } 
    );
  }, []);

  return (
    <header className="bg-white w-full px-4 sm:px-6 ">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Left Menu */}
        <div>
          <img
            src="https://static.wixstatic.com/media/b6bc2e_7e30de46c7e044a48b5a902607416de4~mv2.png/v1/crop/x_384,y_200,w_1209,h_689/fill/w_170,h_97,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo.png"
            alt=""
          />
        </div>
        <div className="hidden sm:flex items-center space-x-4 lg:space-x-6">
          <Link to="/" className="text-black text-base font-light">
            Home
          </Link>
          <div className="relative group">
            <Link
              to="/productsforuser"
              className="text-black text-base font-light"
            >
              Shop
            </Link>
          </div>
          <Link to="/contact" className="text-black text-base font-light">
            Contact
          </Link>
        </div>

        {/* Right Menu */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          <div className="hidden sm:block text-black text-sm font-light">
            INR ₹ | India
          </div>
          <FiSearch
            className="text-black cursor-pointer"
            onClick={() => navigate("/search")}
            size={20}
          />
          <FaHeart
            className="text-black cursor-pointer"
            onClick={() => navigate("/wishlist")}
            size={20}
          />

          {/* Profile with Dropdown */}
          <div className="relative">
            <FaRegUser
              className="text-black cursor-pointer"
              size={20}
              onClick={toggleProfileDropdown}
            />
            {isProfileDropdownVisible && (
              <div className="absolute lg:right-[-100px] lg:w-70 top-10 right-[-90px] mt-2 w-70 bg-white rounded  py-2 z-50">
                {/* Check if token is present */}
                {token ? (
                  <>
                    <div
                      className="max-w-sm rounded overflow-hidden  bg-white p-4 mb-2"
                    >
                      <img
                        className="w-26 h-26 rounded-full mx-auto"
                        src={
                          profile.profile ||
                          "https://th.bing.com/th?id=OIP.TpqSE-tsrMBbQurUw2Su-AHaHk&w=247&h=252&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                        }
                        alt="Profile Pic"
                      />
                      <div className="text-center mt-4">
                        <h2 className="text-xl font-semibold">
                          {profile.username}
                        </h2>
                        <p className="text-gray-600">{profile.email}</p>
                        <p className="text-gray-600">{profile.gender}</p>
                        <p className="text-gray-600">{profile.dob}</p>
                      </div>
                    </div>

                    {/* User is authenticated: Show Profile, Reset Password, and Logout */}
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-black hover:bg-gray-100"
                    >
                      <FaUser className="mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/order"
                      className="flex items-center px-4 py-2 text-black hover:bg-gray-100"
                    >
                      <FaUser className="mr-2" />
                      Orders
                    </Link>
                    <Link
                      to="/resetpassword"
                      className="flex items-center px-4 py-2 text-black hover:bg-gray-100"
                    >
                      <FaKey className="mr-2" />
                      Reset Password
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="">
                    <Link
                      to="/login"
                      className="flex  items-center px-4 py-2 text-black hover:bg-gray-100"
                    >
                      <FaSignInAlt className="mr-2" /> {/* Sign In Icon */}
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center px-4 py-2 text-black hover:bg-gray-100"
                    >
                      <FaUserPlus className="mr-2" /> {/* Sign Up Icon */}
                      Sign Upp
                    </Link>
                    <Link
                      to="/loginadmin"
                      className="flex items-center px-4 py-2 text-black hover:bg-gray-100"
                    >
                      <FaUserShield className="mr-2" />{" "}
                      {/* Sign in as Admin Icon */}
                      AdminNNN
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart with item count */}
          <div className="relative">
            <FiShoppingCart
              className="text-white cursor-pointer"
              onClick={() => navigate("/viewcart")}
              size={20}
            />
            {cart > 0 && (
              <span className="absolute top-[-7px] right-[-10px] bg-red-500 text-[12px] text-white rounded-full w-4 h-4 flex items-center justify-center">
                {cart}
              </span>
            )}
          </div>

          {/* Hamburger Menu for Mobile */}
          <FiMenu
            className="text-white sm:hidden cursor-pointer"
            size={24}
            onClick={toggleSidebar}
          />
        </div>
      </div>

      {/* Sidebar Menu for Mobile */}
      <div
        className={`sm:hidden absolute top-0 left-0 bg-black w-64 h-screen z-50 p-8 sidebar ${
          isSidebarOpen ? "sidebar-open" : ""
        }`}
      >
        {isSidebarOpen && (
          <>
            <FiX
              className="text-white cursor-pointer mb-6"
              size={24}
              onClick={toggleSidebar}
            />
            <nav className="space-y-6">
              <Link
                to="/"
                className="flex items-center text-white text-xl"
                onClick={toggleSidebar}
              >
                <FaHome className="mr-2" />
                Home
              </Link>
              <Link
                to="/shop"
                className="flex items-center text-white text-xl"
                onClick={toggleSidebar}
              >
                <FaShoppingBag className="mr-2" />
                Shop
              </Link>
              <Link
                to="/contact"
                className="flex items-center text-white text-xl"
                onClick={toggleSidebar}
              >
                <FaPhone className="mr-2" />
                Contact
              </Link>
              <Link
                to="/profile"
                className="flex items-center text-white text-xl"
                onClick={toggleSidebar}
              >
                <FaUser className="mr-2" />
                Profile
              </Link>
            </nav>
          </>
        )}
      </div>
    </header>
  );
};

export default Header2;
