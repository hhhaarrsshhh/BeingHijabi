// import  { useContext, useState, useRef } from 'react';
// import {  useNavigate } from 'react-router-dom';
// import axios from '../utils/axios';
// import { toast } from 'react-toastify';
// import UserContext from '../contexts/usercontext';
import Header from "./Header";

import Homeproduct from "./homeProducts";
import Footer from "./Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShopMoreSection from "./ShopMoreSection";
import { useRef } from "react";
import ShopNowSection from "./ShopNowSection";
import ShopCarousel from "./ShopCarousel";
import Reviews from "./Reviews";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  // const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);
  // const navigate = useNavigate();

  // References for each section
  const headerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const homeProductRef = useRef(null);
  const categoryLinksRef = useRef(null);
  const footerRef = useRef(null);
  const ShopMoreSectionRef = useRef(null);

  // // Function to handle logout
  // const logout = async () => {
  //   const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
  //   if (token) {
  //     try {
  //       await axios.get(`/users/user/logout?token=${token}`);
  //       document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
  //       setIsAuthenticated(false);
  //       navigate('/login');
  //     } catch (error) {
  //       console.error('Logout error:', error);
  //       toast.error('Error during logout. Please try again.');
  //     }
  //   } else {
  //     toast.info('Please sign in to sign out.');
  //   }
  // };

  return (
    <div className="home  text-gray-800 overflow-x-hidden overflow-y-auto">
      {/* Header */}
      <div ref={headerRef}>
        <Header />
      </div>

      {/* Category Links */}
      <div ref={categoryLinksRef}>{/* <CategoryLinks /> */}</div>
      <div ref={ShopMoreSectionRef}>
        <ShopMoreSection />
      </div>

      <ShopNowSection />
      <ShopCarousel />
      {/* Featured Products */}
      <div ref={homeProductRef}>
        <Homeproduct />
      </div>
      <Reviews />
      {/* Footer */}
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
