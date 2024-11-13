import  { useState } from 'react';
import PageTitle from "./sub-components/PageTitle";
import img from '../assets/bakhur.png'
import img2 from '../assets/oud.png.webp'

const Shopfresh = () => {
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(img);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
  };

  return (
    <div>
      <PageTitle pageTitle={"Fragrance Fresh"} />
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="text-center text-gray-500 mb-4">
          <p>
            Use code <span className="font-semibold">MARHABA</span> for Flat 10% off 💍 | Free gifts 🎁 on prepaid orders
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <img 
              src={currentImage} 
              alt="Product" 
              className="w-full md:w-96 border-2 border-black" 
            />
            <div className="flex mt-2 space-x-2">
              <img 
                src={img} 
                alt="Thumbnail" 
                className="w-12 h-16 border rounded cursor-pointer hover:border-gray-500"
                onClick={() => setCurrentImage(img)}
              />
              <img 
                src={img2}   
                alt="Thumbnail" 
                className="w-12 h-12 border rounded cursor-pointer hover:border-gray-500"
                onClick={() => setCurrentImage(img2)}
              />
            </div>
          </div>

          <div className="text-left w-full md:w-1/4">
            <h1 className="text-xl font-semibold mb-1">Fresh</h1>
            <p className="text-base pb-2">From ₹799.00</p>
            <p className="text-xs text-gray-500 mb-2">Taxes Included | <span className="underline">Free Shipping</span></p>

            <div className="mb-2">
              <label htmlFor="size" className="block font-semibold text-xs mb-0.5">Size</label>
              <select id="size" className="border w-full p-1 rounded text-sm">
                <option value="">Select</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="customText" className="block font-semibold text-xs mb-0.5">What Name would you like to have on your bottle?</label>
              <input
                type="text"
                id="customText"
                maxLength="100"
                className="border w-full p-1 rounded text-sm"
                placeholder="Enter name"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="quantity" className="block font-semibold text-xs mb-0.5">Quantity</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="border w-full p-1 rounded text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <button className="bg-[#9A2A48] text-white py-2  hover:bg-[#7d2239]">Add to Cart</button>
              <button className="bg-black text-white py-2  hover:bg-gray-800">Buy Now</button>
            </div>

            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-500">🔗</a>
              <a href="#" className="text-gray-500">🔗</a>
              <a href="#" className="text-gray-500">🔗</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shopfresh;
