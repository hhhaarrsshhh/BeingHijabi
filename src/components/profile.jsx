import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import Header2 from './header2';

const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    dob: '',
    gender: '',
    phonenumber: '',
    email: '',
    profile: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // To show loading state
  const [error, setError] = useState(''); // For handling error messages
  const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
  const navigate = useNavigate();

  // Fetch profile data dynamically without refreshing the page
  const fetchProfile = async () => {
    setLoading(true); // Start loading
    setError(''); // Clear any previous error
    try {
      const response = await axios.get(`/users/user/profile?token=${token}`);
      setProfile(response.data.user); // Set the fetched profile
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to fetch profile data. Please try again later.');
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  // Fetch the profile when component mounts
  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle file change
  const handleFileChange = async (e) => {
    const selectedImage = e.target.files[0]; // Get the selected image file
    if (!selectedImage) {
      setError('Please select an image to upload.');
      return;
    }

    setImage(selectedImage);
    setLoading(true); // Start loading when image is selected
    setError(''); // Clear any previous error

    // Create FormData to send the image
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.put(`/users/user/edit/profile?token=${token}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct content type for file upload
        },
      });
      
      // Fetch the updated profile after uploading the image
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again later.');
    } finally {
      setLoading(false); // Stop loading after response
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader when submitting form
    try {
      await axios.put(`/users/user/update?token=${token}`, {
        dob: profile.dob,
        gender: profile.gender,
        phonenumber: profile.phonenumber,
      });
      // Fetch the updated profile after successful update
      fetchProfile();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to update profile. Please try again later.');
    } finally {
      setLoading(false); // Stop loading after response
    }
  };

  const handlePlaceOrder = () => {
    navigate('/resetpassword');
  };

  return (
    <>
      <Header2 />
      <div className="min-h-screen flex justify-center items-center p-6">
      <button 
                onClick={() => navigate(-1)} 
                className="absolute top-16 left-0 mt-4 ml-4 flex items-center  text-gray-700 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300">
                <FaArrowLeft className="mr-2" />
                
            </button>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          {/* Loading state */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Profile Image or Loader */}
          <div className="flex justify-center mb-6 relative">
            <div className="relative">
              {loading ? (
                <div className="w-28 h-28 flex justify-center items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : (
                <img
                  src={profile.profile}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover"
                />
              )}
              <label className="absolute bottom-0 right-0 bg-gray-200 hover:bg-gray-400 p-2 rounded-full cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 13.5V8.25m-7.5 5.25V8.25m-3 12.75h16.5a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5H4.5A2.25 2.25 0 002.25 6.75v13.5A2.25 2.25 0 004.5 22.5z"
                  />
                </svg>
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
                className="w-full p-3 mt-1 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="Username"
                disabled
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleInputChange}
                className="w-full p-3 mt-1 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm text-gray-700">Gender</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleInputChange}
                className="w-full p-3 mt-1 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm text-gray-700">Phone Number</label>
              <input
                type="number"
                name="phonenumber"
                value={profile.phonenumber}
                onChange={handleInputChange}
                className="w-full p-3 mt-1 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="Phone Number"
              />
            </div>

            {/* Password Reset Button */}
            <div>
              <button
                type="button"
                className="w-full p-3  text-black border border-black rounded-lg hover:text-white hover:bg-black"
                onClick={handlePlaceOrder}
              >
                Reset Password
              </button>
            </div>

            {/* Submit Button */}
            <div>
            <button
    type="submit"
    className="w-full p-3  text-black border border-black rounded-lg hover:text-white hover:bg-black"
>
    Update Profile
</button>

            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
