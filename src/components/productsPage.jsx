import  { useEffect, useState } from 'react';
import axios from '../utils/axios'; // Ensure axios is configured properly
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaArrowLeft, FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [itemsPerPage] = useState(8); // Number of products per page
  const [selectedCategory, setSelectedCategory] = useState('All'); // Selected category
  const [noProductsFound, setNoProductsFound] = useState(false); // Check if no products found
  const navigate = useNavigate();

  const fetchProducts = async (page = 1) => {
    try {
      const endpoint = selectedCategory === "All" ?
        `/products/all?page=${page}&limit=${itemsPerPage}` :
        `/products/category?category=${selectedCategory}&page=${page}&limit=${itemsPerPage}`;

      const response = await axios.get(endpoint);
      setProducts(response.data.products);
      // console.log(response.data.products);
      setTotalPages(response.data.pagination.totalPages); // Set total pages from response
      setNoProductsFound(response.data.products.length === 0);
    } catch (error) {
      toast.info('No products found for this category.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage); // Fetch products on current page change
  }, [currentPage, selectedCategory]); // Trigger on current page or selected category change

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleDelete = async (productId) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    if (token) {
      try {
        await axios.delete(`/products/product/delete/${productId}?token=${token}`);
        setProducts(products.filter(product => product._id !== productId));
        toast.success('Product deleted successfully.');
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product.');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (noProductsFound) return <div>No products found in this category.</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="products-page p-4">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-16 left-0 mt-4 ml-4 flex items-center text-gray-700 px-4 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300"
        >
          <FaArrowLeft className="mr-2" />
        </button>
        <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

        {/* Product listing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="product-card bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-contain mb-4 rounded"
              />
              <h2 className="text-xl font-semibold mb-2 line-clamp-1">{product.name}</h2>
              <p className="text-gray-600 mb-2 line-clamp-3">{product.description}</p>
              <p className="text-lg font-bold">{product.price}</p>
              {product.discount > 0 && (
                <p className="text-sm text-red-500 mb-2">Discount: {product.discount}%</p>
              )}
              <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>
              <div className="flex space-between mt-1 gap-3">
                <p className={`text-sm mb-2 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                </p>
                <div className="flex gap-4">
                  <Link
                    to={`/updateproduct/${product._id}`} // Pass the product ID to the update page
                    className="text-black hover:text-yellow-600 transition-colors duration-300"
                  >
                    <FaEdit size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)} // Handle product deletion
                    className="text-black hover:text-red-600 transition-colors duration-300"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`mx-2 ${currentPage === 1 ? 'text-gray-400' : 'text-black'} transition-colors`}
          >
            <FaArrowCircleLeft size={30} />
          </button>
          <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`mx-2 ${currentPage === totalPages ? 'text-gray-400' : 'text-black'} transition-colors`}
          >
            <FaArrowCircleRight size={30} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
