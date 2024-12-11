import React, { useState, useEffect, useRef } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';

const Homeproduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const productRefs = useRef([]);
    const navigate = useNavigate();
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/products/all?token=${token}`);
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products.');
            toast.error('Error fetching products.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddToCart = async (productId) => {
        if (!token) {
            toast.info('Please log in first to add products to the cart.');
            navigate("/login");
            return;
        }

        try {
            await axios.post(`/users/user/cart/add?token=${token}`, { productId });
            toast.success('Product added successfully!');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Failed to add product to cart.');
        }
    };

    const handleAddToWishlist = async (productId) => {
        if (!token) {
            toast.info('Please log in first to add products to the wishlist.');
            navigate("/login");
            return;
        }

        try {
            await axios.put(`/user/wishlist/add?token=${token}`, { productId });
            fetchProducts();  // Update product state after adding to wishlist
        } catch (error) {
            console.error('Error adding product to wishlist:', error);
            toast.error('Failed to add product to wishlist.');
        }
    };

    const topRated = products.sort((a, b) => b.salesCount - a.salesCount).slice(0, 8);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const renderProductCard = (product, index) => (
        <div
            key={index}
            ref={(el) => (productRefs.current[index] = el)}
            className="group relative overflow-hidden"
        >
            {/* Product Image */}
            <div onClick={() => navigate(`/singleproduct/${product._id}`)} className="cursor-pointer">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-t-lg"
                />
                {product.stock === 0 && (
                    <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-full">
                        Sold Out
                    </span>
                )}
            </div>
    
            {/* Product Info */}
            <div className="p-4">
  <h2 className="relative text-lg font-light font-custom text-gray-700 mb-2">
    {product.name}
    <span className="block h-[2px] w-0 bg-black transition-all duration-500 ease-in-out group-hover:w-full absolute left-0 bottom-0"></span>
  </h2>

  <div className="text-lg font-light text-black">
    {product.price !== product.priceAfterDiscount && (
      <span className="text-gray-500 line-through mr-2">Rs. {product.price}</span>
    )}
    <span className="text-lg text-black">Rs. {product.priceAfterDiscount}</span>
  </div>
</div>

        </div>
    );

    return (
        <section className="py-8 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Top Rated Section */}
                <div className="mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {topRated.map((product, index) => renderProductCard(product, index))}
                    </div>
                </div>
                
                {/* Centered Button at the Bottom */}
                <div className="flex justify-center mt-8">
                    <button 
                        onClick={() => navigate('/productsforuser')} // Adjust the navigation path as needed
                        className="px-6 py-2 bg-black text-white border font-medium border-black rounded-2xl hover:bg-white hover:text-black transition duration-300"
                    >
                        View More 
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Homeproduct;
