import { useNavigate } from "react-router-dom";

const ShopMoreSection = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative md:min-h-[500px] min-h-[300px]  w-full bg-cover bg-center flex items-center justify-center"
      style={
        {
          // backgroundImage: `url('https://beinghijabi.com/cdn/shop/files/IMG_5839.jpg')`, // Replace with your own image URL
          // backgroundSize: 'cover', // Ensures the image covers the area
          // backgroundPosition: 'center top 22%',
          // backgroundAttachment: 'fixed', // This makes the background image fixed
          // backgroundRepeat: 'no-repeat',
        }
      }
    >
      {/* Overlay for dimming the background */}
      <video
        src="https://video.wixstatic.com/video/b6bc2e_65cdc655e45f4236967243cce79bbec6/1080p/mp4/file.mp4"
        className="absolute -z-10"
        autoPlay="true"
        loop
        muted
      ></video>
      {/* Content */}
      <div className="relative z-10 text-center space-y-6">
        {/* Line of text */}
        <p className="text-white text-3xl md:text-4xl lg:text-5xl font-normal">
          Discover the Latest Trends
        </p>

        {/* Shop More Button */}
        <button
          onClick={() => navigate("/productsforuser")}
          className="px-8 py-3 border border-white text-white text-lg font-medium rounded-md shadow-lg transition-transform duration-300 transform hover:scale-105"
        >
          Shop More
        </button>
      </div>
    </div>
  );
};

export default ShopMoreSection;
