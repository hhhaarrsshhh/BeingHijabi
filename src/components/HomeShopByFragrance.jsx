import { Link } from "react-router-dom";
const HomeShopByFragrance = () => {
  const fragranceFamilies = [
    {
      name: "Floral",
      image: "/floral.jpg", // Assuming your image is in the public/images folder
      route: "/shopfloral",
    },
    {
      name: "Fresh",
      image: "/fresh.jpg",
      route: "/shopfresh",
    },
    {
      name: "Woody",
      image: "/woody.jpg",
      route: "/shopwoody",
    },
    {
      name: "Oriental",
      image: "/oriental.jpg",
      route: "/shoporiental",
    },
    {
      name: "Fruity",
      image: "/fruity.jpg",
      route: "/shopfruity",
    },
  ];

  return (
    <div className="bg-[#cacbca] py-12">
      <div className="text-4xl cursive--font font-semibold  text-center mb-12 ">
        Shop the luxury by Fragrance Family
      </div>
      <div className="flex flex-nowrap flex-row  overflow-hidden max-w-[90rem] mx-auto overflow-x-auto gap-8 scroll-hidden">
        {fragranceFamilies.map((family, index) => (
          <Link
            to={family.route}
            key={index}
            className="w-[330px] h-96 relative group inline-block min-w-[330px]"
          >
            <img
              src={family.image}
              alt={family.name}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 duration-150 transition">
              <div className="text-white text-2xl font-bold">{family.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeShopByFragrance;
