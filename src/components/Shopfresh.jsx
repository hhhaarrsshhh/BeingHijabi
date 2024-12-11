import PageTitle from "./sub-components/PageTitle";
import FragranceFamilyCard from "./cards/FragnancefamilyCard";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const Shopfresh = () => {
  const location = useLocation(); 

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location]); 

 

  return (<>
   <PageTitle pageTitle={"Fragrance Fresh"} />
   <FragranceFamilyCard/>

   </>
  
  );
}

export default Shopfresh;
