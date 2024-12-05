import { useState } from "react";
import Card from "./cards/Card";
import PageTitle from "./sub-components/PageTitle";
import ProductDetail from "./cards/ProductDetail"
import bakhurData from "./ProductData/bakhurData";

const Bakhur = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <PageTitle pageTitle={"Bakhur"} />
      <div className="flex flex-wrap max-sm:justify-center max-sm:align-center max-sm:ml-20 max-sm:mt-10">
        {bakhurData.map((product, index) => (
          <div key={index} onClick={() => handleCardClick(product)}>
            <Card {...product} />
          </div>
        ))}
      </div>

      {isModalOpen && selectedProduct && (
        <ProductDetail
          closeModal={closeModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Bakhur;
