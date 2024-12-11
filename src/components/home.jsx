// import  { useContext, useState, useRef } from 'react';
// import {  useNavigate } from 'react-router-dom';
// import axios from '../utils/axios';
// import { toast } from 'react-toastify';
// import UserContext from '../contexts/usercontext';
import Header from "./Header";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import Homeproduct from "./homeProducts";


import Footer from "./Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShopMoreSection from "./ShopMoreSection";
import { useRef } from "react";
import ShopNowSection from "./ShopNowSection";
import Reviews from "./Reviews";
import HomeCollections from "./HomeCollections";
import HomeBestSellers from "./HomeBestSellers";
import HomeShopByFragrance from "./HomeShopByFragrance";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  
  // const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);
  // const navigate = useNavigate();

  // References for each section
  const headerRef = useRef(null);
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
      <div ref={headerRef} className="${}"></div>
      {/* Category Links */}
      <div ref={categoryLinksRef}>{/* <CategoryLinks /> */}</div>
      <div ref={ShopMoreSectionRef}>
        <ShopMoreSection />
      </div>
      <HomeShopByFragrance />

      <HomeCollections />
      <ShopNowSection />
      <HomeBestSellers />
      <Reviews />
      <div ref={footerRef}>
        <Footer />
      </div>
      <div>
        <div className="rounded-full p-4 z-[1000] bg-black text-2xl md:hidden block text-white w-fit fixed bottom-4 right-4">
          <HiOutlineDotsHorizontal />
        </div>
      </div>
    </div>
  );
};

export default Home;
