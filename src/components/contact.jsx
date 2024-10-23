import React, { useState } from "react";
import Header from "./Header";
import { FaArrowLeft } from "react-icons/fa";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    comment: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace 'https://api.example.com/contact' with your actual API endpoint
      const response = await axios.post(
        "/users/user/contacts/message",
        formData
      );
      alert("Form submitted successfully!");
      console.log(response.data); // Log response from the server (optional)
      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        comment: "",
      });
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert("Form submission failed. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen relative flex flex-col lg:flex-col gap-12 justify-center bg-gray-50 p-4">
        <div className="absolute top-0 left-0">
          <img
            src="https://static.wixstatic.com/media/b6bc2e_c493cc0c078548fc806a9bb2610a061a~mv2.jpg/v1/fill/w_1583,h_446,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/b6bc2e_c493cc0c078548fc806a9bb2610a061a~mv2.jpg"
            alt=""
          />
        </div>
        <div className="max-w-4xl mx-auto bg-white p-10 mt-32  z-[100] flex gap-6 w-full md:h-[26rem] border-b-[2px] border-black/90 ">
          <div className="w-full space-y-12 ">
            <h1 className="text-3xl cursive--font md:text-5xl font-semibold">
              Hello from Fatir
            </h1>
            <p className="text-secondary">
              Are you a person with questions, Then {"let's"} hear it from you
            </p>
            <div className="flex  justify-start gap-6 w-full cursive--font">
              <div className="flex flex-col">
                <span>Phone</span>
                <span className="text-secondary text-sm">+91-8878472152</span>
              </div>
              <div className="flex flex-col">
                <span>Email</span>
                <span className="text-secondary text-sm">
                  fatirapparelsandperfumes@gmail.com
                </span>
              </div>
            </div>
          </div>
          <div className="w-full space-y-12">
            <div className="max-w-lg mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="border border-black px-2 py-1"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="lastName" className="text-sm mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="border border-black px-2 py-1"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col mt-4">
                  <label htmlFor="email" className="text-sm mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-black px-2 py-1"
                    required
                  />
                </div>

                <div className="flex flex-col mt-4">
                  <label htmlFor="message" className="text-sm mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="border border-black px-2 py-1 h-24"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full bg-[#8C2331] text-white py-2 font-semibold"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-12 max-w-4xl mx-auto bg-white mb-4 ">
          <h1 className="text-4xl font-semibold mb-4 cursive--font">
            Visit Us
          </h1>
          <p className="text-base text-secondary mb-6">
            This is your Contact section paragraph. Encourage your reader to
            reach out with any questions, comments, or to take a different
            action specific to your site. You can also click on the contact form
            to customize the fields.
          </p>

          {/* Address Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 cursive--font">
              Address
            </h2>
            <p className="text-md text-base text-secondary">
              15, Fatir Apparels & Perfumes, Shop no. 1, <br />
              besides Rosy Dry Cleaners, Itwara Road, <br />
              Bhopal, Madhya Pradesh 462001
            </p>
          </div>

          {/* Opening Hours Section */}
          <div className="cursive--font ">
            <h2 className="text-xl font-semibold mb-2 cursive--font">
              Opening Hours
            </h2>
            <ul className="text-md">
              <li className="mb-1">
                <strong>Mon - Fri:</strong> 10:00 am – 9:00 pm
              </li>
              <li className="mb-1">
                <strong>Saturday:</strong> 10:00 am – 9:00 pm
              </li>
              <li>
                <strong>Sunday:</strong> CLOSED
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-7xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58649.39360423953!2d77.32792624863278!3d23.258107699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c68215dadb317%3A0xeb91cf73b0f91836!2sFatir%20Apparels%20%26%20Perfumes!5e0!3m2!1sen!2sin!4v1729677816904!5m2!1sen!2sin"
            height="450"
            width={"900"}
            style={{ border: 0 }}
            allowFullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;

// <button
//         onClick={() => navigate(-1)}
//         className="absolute top-16 left-0 mt-12 ml-4 flex items-center  text-gray-700 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300"
//       >
//         <FaArrowLeft className="mr-2" />
//       </button>
//       <div className="z-[100] w-full">
//         {/* Contact Information Section */}
//         <section className="w-full lg:w-1/2 mb-12 lg:mb-0 z-[100]">
//           <div className=" p-6 rounded-lg ">
//             <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
//               Get in Touch
//             </h2>
//             <div className="grid grid-cols-1 gap-8">
//               <div className="flex flex-col">
//                 <h3 className="text-xl font-semibold mb-4 text-gray-700">
//                   Contact Information
//                 </h3>
//                 <p className="text-md text-gray-600 mb-2">
//                   <i className="fas fa-envelope mr-2"></i>
//                   Email:{" "}
//                   <a
//                     href="mailto:info@ecommerce.com"
//                     className="text-blue-500 hover:underline"
//                   >
//                     info@ecommerce.com
//                   </a>
//                 </p>
//                 <p className="text-md text-gray-600 mb-2">
//                   <i className="fas fa-phone mr-2"></i>
//                   Phone: +91 9109792700
//                 </p>
//                 <p className="text-md text-gray-600">
//                   <i className="fas fa-map-marker-alt mr-2"></i>
//                   Address: Koh-e-Fiza, Bhopal (M.P.)
//                 </p>
//               </div>
//               <div className="w-full">
//                 <h3 className="text-xl font-semibold mb-4 text-gray-700">
//                   Find Us
//                 </h3>
//                 <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
//                   <iframe
//                     title="Company Location"
//                     className="w-full h-full"
//                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.2745228629445!2d77.3984592749191!3d23.264924981699048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c694f8fbe169d%3A0x14f2e5fcf91d9f6a!2sD55%20BDA%20Colony%2C%20Koh-e-Fiza%2C%20Bhopal%2C%20Madhya%20Pradesh%20462003!5e0!3m2!1sen!2sin!4v1691777016094!5m2!1sen!2sin"
//                     allowFullScreen
//                     loading="lazy"
//                   ></iframe>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Contact Form Section */}
//         <form
//           onSubmit={handleSubmit}
//           className="w-full lg:h-[450px] lg:w-1/2 max-w-lg p-8 rounded-lg z-[100]"
//         >
//           <h2 className="text-3xl font-semibold mb-6 text-gray-800">
//             Contact Us
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {/* Name */}
//             <div>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email *"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//               />
//             </div>
//           </div>

//           {/* Phone Number */}
//           <div className="mt-4">
//             <input
//               type="tel"
//               name="phoneNumber"
//               placeholder="Phone number"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
//             />
//           </div>

//           {/* Comment */}
//           <div className="mt-4">
//             <textarea
//               name="comment"
//               placeholder="Comment"
//               value={formData.comment}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black h-32"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="mt-6">
//             <button
//               type="submit"
//               className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-white border border-black hover:text-black transition duration-300"
//             >
//               Send
//             </button>
//           </div>
//         </form>
//       </div>
