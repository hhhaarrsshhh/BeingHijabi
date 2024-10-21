import React, { useState, useContext } from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash,FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import UserContext from '../contexts/usercontext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Header from './Header';
import Header2 from './header2';

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useContext(UserContext);
  const [response, setresponse] = useState("")
  // const [googleapiresponse, setgoogleapiresponse] = useState("")
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/users/user/login', {
        email: formData.email,
        password: formData.password,
      });

      setresponse(response)
      console.log('Login successful:', response.data);
      Cookies.set('token', response.data.token, { expires: 1 / 24 });
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError('Email or password is incorrect. Please try again.');
      toast.error(response.data.message)
      setTimeout(() => {
        setError(null);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const data = jwtDecode(credentialResponse.credential);
      const response = await axios.post('/users/user/google/login', {
        username: data.name,
        email: data.email,
        isAdmin: false,
      });
      // googleapiresponse(response)

      console.log('Google login successful:', response.data);
      Cookies.set('token', response.data.token, { expires: 1 / 24 });
      setIsAuthenticated(true);
      console.log(response)
      if(response.data.user.isAdmin){
        navigate('/admin');
      }else{

        navigate('/');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      setError('Google login failed. Please try again.');
      // toast.error(googleapiresponse.data.message)
    }
  };

  return (
    <>
    <Header2/>

      <div className="flex items-center justify-center h-full  px-4 py-8">
      <button 
                onClick={() => navigate(-1)} 
                className="absolute top-16 left-0 mt-4 ml-4 flex items-center  text-gray-700 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300">
                <FaArrowLeft className="mr-2" />
                
            </button>
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg md:shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6 text-left">Login to Your Account</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email" // Updated to use "name" instead of "id"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="example@domain.com"
                disabled={loading}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password" // Updated to use "name" instead of "id"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-12"
                placeholder="••••••••"
                disabled={loading}
              />
              <Link to="/forgotpassword" className="text-black hover:text-black text-sm font-medium transition-colors duration-300">
                Forgot Password?
              </Link>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 mt-8 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className={`w-full py-3 text-white rounded-lg mt-4 flex items-center justify-center transition-all duration-300 ${loading ? 'bg-[#8763F6]' : 'bg-black hover:bg-black'
                }`}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                'Login'
              )}
            </button>
          </form>
          <p className="mt-4 text-gray-600 text-center">
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')} className="text-black cursor-pointer">
            Register
          </span>
        </p>
          <div className="flex items-center justify-between mt-4">
            <hr className="w-full border-gray-300" />
            <span className="text-gray-500 px-4">or</span>
            <hr className="w-full border-gray-300" />
          </div>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              console.log('Login Failed');
              setError('Google login failed. Please try again.');
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
