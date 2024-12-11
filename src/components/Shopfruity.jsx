import FragranceFamilyCard from "./cards/FragnancefamilyCard";
import PageTitle from "./sub-components/PageTitle";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const Shopfruity = () => {
  const location = useLocation(); 
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location]); 

  return (
    <div>
      <PageTitle pageTitle={"Fragrence Fruity"} />
      <FragranceFamilyCard/>
    </div>
  );
}

export default Shopfruity