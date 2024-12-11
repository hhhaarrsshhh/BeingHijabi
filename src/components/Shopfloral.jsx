import FragranceFamilyCard from "./cards/FragnancefamilyCard";
import PageTitle from "./sub-components/PageTitle";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const Shopfloral = () => {
  const location = useLocation(); 

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location]); 

  return (
    <div>
      <PageTitle pageTitle={"Fragrence Floral"} />
      <FragranceFamilyCard/>
    </div>
  );
}

export default Shopfloral