import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { FaArrowLeft } from 'react-icons/fa';
import { FiMinus, FiPlus } from 'react-icons/fi';  // For quantity control buttons
import Header2 from '../components/header2';

const Wishlist = () => {
    const [cart, setCart] = useState([]);
    const [loadingCart, setLoadingCart] = useState(true);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    useEffect(() => {
        const fetchProducts = async () => {

            if (token) {
                try {
                    const response = await axios.get(`/user/wishlist/view?token=${token}`);
                    setCart(response.data.wishlist);
                    setRecommendedProducts(response.data.randomProducts);
                } catch (error) {
                    setError('Failed to load products.');
                    toast.error('Error fetching products.');
                } finally {
                    setLoadingCart(false);
                    setLoadingProducts(false);
                }
            } else {
                setLoadingCart(false);
                setLoadingProducts(false);
                toast.error('User does not have a token.');
            }
        };

        fetchProducts();
    }, []);
    const handleBuyNow = async (productId) => {
        try {
            await handleAddToCart(productId);
            navigate('/viewcart'); // Redirect to cart page
        } catch (error) {
            console.error('Error buying product:', error);
            toast.error('Failed to buy product.');
        }
    };
    const handleAddToCart = async (productId) => {
        if (!token) {
            toast.info('Please log in first to add products to the cart.');
            alert("Please log in first to add products to the cart.");
            navigate("/login")
            return; // Exit the function if no token is present
        }
        try {
          const {data} =  await axios.post(`/users/user/cart/add?token=${token}`, { productId });
          console.log(data.cart.items);
            setCart(data.cart.items.length);
            toast.success('Product added successfully!');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Failed to add product to cart.');
        }
    };

    const handleRemove = async (id) => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

        if (token) {
            try {
                const response = await axios.put(`/user/wishlist/remove?token=${token}`, {
                    productId: id 
                });

                if (response.data.message) {
                    setCart(cart.filter(item => item._id !== id));
                    toast.success('Item removed from wishlist.');
                } else {
                    toast.error('Failed to remove item from wishlist.');
                }
            } catch (error) {
                toast.error('Error removing item from wishlist.');
            }
        } else {
            toast.error('User does not have a token.');
        }
    };

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity >= 1) {
            setCart(cart.map(item => item._id === id ? { ...item, quantity: newQuantity } : item));
        } else {
            toast.error('Quantity cannot be less than 1.');
        }
    };

    return (
        <>
            <Header2 />
            <div className="flex flex-col min-h-screen bg-gray-50">
            <button 
                onClick={() => navigate(-1)} 
                className="absolute top-16 left-0 mt-4 ml-4 flex items-center  text-gray-700 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300">
                <FaArrowLeft className="mr-2" />
                
            </button>
                <main className="flex-1 p-4 lg:p-6">
                    {loadingCart ? (
                        <div className="flex justify-center items-center h-64">
                            <ClipLoader color="#3B82F6" size={50} />
                        </div>
                    ) : cart && cart.length === 0 ? (
                        <div className="text-center text-gray-600">
                            <p className="text-lg font-semibold">No products in the wishlist.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {cart.map(item => (
                                <div key={item._id} className="bg-white p-4 mt-10 rounded-lg shadow-md relative">
                                    {/* Cross Icon to Remove Item */}
                                    <button
                                        onClick={() => handleRemove(item._id)}
                                        className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                                    >
                                        <FiX size={20} />
                                    </button>
                                    
                                    {/* Product Image */}
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="w-full h-48 object-cover rounded-md mb-4"
                                    />

                                    {/* Product Name */}
                                    <h3 className="text-lg font-semibold text-center mb-2">{item.name}</h3>

                                    {/* Discount and Price Information */}
                                    <div className="text-center">
                                        <span className="text-red-500 font-semibold">{item.discount}% OFF</span>
                                        <span className="line-through text-gray-400 ml-2">₹{item.price}</span>
                                    </div>
                                    <p className="text-green-600 font-semibold text-center mb-4">
                                        Final Price: ₹{item.priceAfterDiscount}
                                    </p>

                                    {/* Quantity Controls */}
                                    {/* <div className="flex justify-center items-center mb-4">
                                        <button
                                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                            className="bg-gray-300 p-1 rounded-full"
                                        >
                                            <FiMinus />
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                            className="bg-gray-300 p-1 rounded-full"
                                        >
                                            <FiPlus />
                                        </button>
                                    </div> */}

                                    {/* Add to Cart Button */}
                                    <button
                                    onClick={() => handleBuyNow(item._id)}
                                        className="w-full py-2 text-black border border-black rounded-lg hover:text-white hover:bg-black "
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Recommended Products */}
                    {recommendedProducts && recommendedProducts.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">Recommended Products</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {loadingProducts ? (
                                    <div className="flex justify-center items-center h-64">
                                        <ClipLoader color="#3B82F6" size={50} />
                                    </div>
                                ) : (
                                    recommendedProducts.map(product => (
                                        <div key={product._id} className="bg-white cursor-pointer p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="w-full h-48 mb-4 rounded-md object-contain"
                                            />
                                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                            <p className="text-gray-600">₹{product.priceAfterDiscount}</p>
                                            <button
                                                onClick={() => navigate(`/singleproduct/${product._id}`)}
                                                className="mt-2 px-3 py-1 text-sm bg-black text-white rounded-md hover:bg-blue-700"
                                            >
                                                View Product
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </main>
                
            </div>
        </>
    );
};

export default Wishlist;
