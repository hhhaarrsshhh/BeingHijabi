import React, { useState, useContext, useEffect, useRef } from "react";
import { FiShoppingCart, FiX, FiSearch, FiMenu } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { IoBagOutline } from "react-icons/io5";

import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../contexts/usercontext";
import axios from "../utils/axios";
import { ImCancelCircle, ImMenu } from "react-icons/im";
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
  FaHamburger,
} from "react-icons/fa";

const Header = () => {
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
  const [showOffer, setShowOffer] = useState(true);
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

  const routes = [
    { name: "Home", path: "/" },
    {
      name: <p className="font-bold">Fragrance Families</p>,
      root: [
        { name: "Fresh", path: "/shopfresh" },
        { name: "Floral", path: "/shopfloral" },
        { name: "Fruity", path: "/shopfruity" },
        { name: "Oriental", path: "/shoporiental" },
        { name: "Woody", path: "/shopwoody" },
      ],
    },
    {
      name: <p className="font-bold">Categories</p>,
      root: [
        { name: "Attars", path: "/shopattars" },
        { name: "Perfumes (Eau De Perfum)", path: "/shopperfum" },
      ],
    },
    {
      name: <p className="font-bold">Collections</p>,
      root: [
        { name: "Exclusive Fragrance ", path: "/shopexclusive" },
        { name: <p>Classic Fragrance &nbsp; &nbsp; </p>, path: "/shopclassic" },
      ],
    },
    { name: "Bakhur", path: "/bakhur" },
    { name: "All Products", path: "/all-products" },
    {
      name: "more...",
      root: [
        { name: "Our Story", path: "/about" },
        { name: "Contact us", path: "/contact-us" },
      ],
    },
  ];
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
    <div className="fixed top-0 left-0 w-full z-[1000] ">
      {showOffer && (
        <div className="bg-white text-center  relative py-4   ]">
          <div className="font-bold relative font--forum md:text-xl text-base ">
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-[999]">
          <div className="relative p-6 bg-[#333333] text-white rounded-lg shadow-lg max-w-sm max-sm:mb-40 text-center space-y-4">
            <p className="text-lg font-semibold">
              Use code <span className="text-yellow-500 text-2xl font-bold">MARHABA</span> for Flat 10% off 💰
            </p>
            <p className="text-lg">
              Plus, enjoy free gifts 🎁 on all prepaid orders!
            </p>

            {/* Close Icon */}
            <ImCancelCircle
              className="absolute top-0 right-2   text-white hover:text-white cursor-pointer"
              onClick={() => setShowOffer(false)}
              size={24}
            />
          </div>
        </div>
          
          </div>
        </div>
      )}
      <header className="bg-white  px-4 sm:px-6  ">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center  ">
          <Link to={"/"} className="inline-block">
            <img
              src="https://static.wixstatic.com/media/b6bc2e_7e30de46c7e044a48b5a902607416de4~mv2.png/v1/crop/x_384,y_200,w_1209,h_689/fill/w_170,h_97,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo.png"
              alt=""
            />
          </Link>
          {/* Left Menu */}
          <div className="hidden  sm:flex items-center space-x-8 lg:space-x-8 cursive--font">
            <nav className="cursive--font p-4">
              <ul className="flex space-x-10">
                {routes.map((route, index) => (
                  <li key={index}>
                    {route.path && (
                      <NavLink
                      to={route.path}
                      className={({ isActive }) =>
                        `font-bold ${isActive ? "text-yellow-500" : "hover:text-yellow-500 text-[#848584]"}`
                      }
                      end
                    >
                      {route.name}
                    </NavLink>
                    
                    )}
                    {route.root && <RootRoute route={route} />}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Logo */}

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
                      <div className="max-w-sm rounded overflow-hidden bg-white p-4 mb-2">
                        <img
                          className="w-26 h-26 rounded-full mx-auto"
                          src={
                            profile.profile ||
                            "https://th.bing.com/th?id=OIP.TpqSE-tsrMBbQurUw2Su-AHaHk&w=247&h=252&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                          } // Use default photo if no profile pic
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
                    <div className=" items-center space-y-6  p-4  mr-2 rounded ">
  {/* User is not authenticated: Show Sign In, Sign Up, and Admin Login links */}
  
  <Link
    to="/login"
    className="flex items-center   text-black hover:bg-gray-200 rounded transition duration-150 ease-in-out"
  >
    <FaSignInAlt className="mr-2" /> {/* Sign In Icon */}
    <span className="font-medium">Sign In</span>
  </Link>

  <Link
    to="/register"
    className="flex items-center  text-black hover:bg-gray-200 rounded transition duration-150 ease-in-out"
  >
    <FaUserPlus className="mr-1" /> {/* Sign Up Icon */}
    <span className="font-medium">Sign Up</span>
  </Link>

  <Link
    to="/loginadmin"
    className="flex items-center  text-black hover:bg-gray-200 rounded transition duration-150 ease-in-out"
  >
    <FaUserShield className="mr-1" /> {/* Admin Icon */}
    <span className="font-medium">Admin</span>
  </Link>
</div>


                  )}
                </div>
              )}
            </div>

            {/* Cart with item count */}
            <div className="relative">
              <IoBagOutline
                className="text-black cursor-pointer"
                onClick={() => navigate("/viewcart")}
                size={24}
              />
              {cart > 0 && (
                <span className="absolute top-[-7px] right-[-10px] bg-red-500 text-[12px] text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {cart}
                </span>
              )}
            </div>

            {/* Hamburger Menu for Mobile */}
            <ImMenu
              className="text-black sm:hidden cursor-pointer"
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
              <nav className="cursive--font p-4">
                <ul className="space-y-4">
                  {routes.map((route, index) => (
                    <li key={index}>
                      <NavLink
            to={route.path}
            className={({ isActive }) =>
              `font-bold ${isActive ? "text-yellow-500" : "hover:text-yellow-500 text-[#848584]"}`
            }
            end
          >
            {route.name}
          </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

const RootRoute = ({ route = {} }) => {
  const rootRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    gsap.from(rootRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.5,
    });
  }, [isOpen]);
  return (
    <div
      className="cursor-pointer relative z-[100] "
      onMouseEnter={toggleIsOpen}
      onMouseLeave={toggleIsOpen}
    >
      <span className="text-[#848584]">{route?.name}</span>

      {isOpen && (
        <div
          className="flex flex-col space-y-4 opacity-100 text-center absolute w-56 bg-white  border-black  rounded border-b-4 border- px-0 py-4 z-[100] "
          ref={rootRef.current}
        >
          {route.root.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={item.path}
               
            className={({ isActive }) =>
              `font-semibold ${isActive ? "text-yellow-500 " : "hover:text-yellow-500 text-[#848584]"}`
            }
                end
              >
                {item.name}
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Header;
