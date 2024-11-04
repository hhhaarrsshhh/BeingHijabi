import Card from "./cards/Card";
const HomeBestSellers = () => {
const products = [
  {
    id: 1,
    productName: "Zafran",
    price: "1699",
    image:
      "https://static.wixstatic.com/media/b6bc2e_f610cd51adb24bf294516d8380e8dfa3~mv2.jpg/v1/fill/w_321,h_321,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/b6bc2e_f610cd51adb24bf294516d8380e8dfa3~mv2.jpg",
  },
  {
    id: 2,
    productName: "Saffron Delight",
    price: "1899",
    image:
      "https://static.wixstatic.com/media/b6bc2e_f610cd51adb24bf294516d8380e8dfa3~mv2.jpg/v1/fill/w_321,h_321,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/b6bc2e_f610cd51adb24bf294516d8380e8dfa3~mv2.jpg",
  },
  {
    id: 3,
    productName: "Spice Treasure",
    price: "2099",
    image:
      "https://static.wixstatic.com/media/b6bc2e_f610cd51adb24bf294516d8380e8dfa3~mv2.jpg/v1/fill/w_321,h_321,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/b6bc2e_f610cd51adb24bf294516d8380e8dfa3~mv2.jpg",
  },
  {
    id: 4,
    productName: "Golden Saffron",
    price: "2499",
    image:
      "https://static.wixstatic.com/media/b6bc2e_f610cd51adb24bf294516d8380e8dfa3~mv2.jpg/v1/fill/w_321,h_321,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/b6bc2e_f610cd51adb24bf294516d8380e8dfa3~mv2.jpg",
  },
];


  return (
    <div className="bg-[#bebfbe] py-12 mb-[1px]">
      <h3 className="cursive--font font-extrabold text-center text-black md:text-6xl text-4xl">
        Best Sellers
      </h3>
      <div className="mt-12 bg-white">
        <h2 className="text-xl cursive--font text-center py-6">Best Sellers</h2>
        <div className="flex gap-4 mx-auto max-w-7xl overflow-hidden overflow-x-auto scroll-hidden">
          {products.map((product, index) => (
            <Card
              key={index}
              productName={product.productName}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center pt-12">
        <button className="bg-transparent text-black font-semibold border-black border-2 rounded-full p-2 px-6 hover:bg-black hover:text-white duration-150 transition-all mx-auto">
          Shop all
        </button>
      </div>
    </div>
  );
};

export default HomeBestSellers;
