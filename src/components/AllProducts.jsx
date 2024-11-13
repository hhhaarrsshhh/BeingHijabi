import PageTitle from "./sub-components/PageTitle";
import AllProdcutCard from "../components/cards/AllProductCard";
const AllProducts = () => {
  return (
    <div>
      <PageTitle pageTitle={"All Products"} />
      <AllProdcutCard/>
    </div>
  );
};

export default AllProducts;
