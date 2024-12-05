import PageTitle from "./sub-components/PageTitle";
import FragranceFamilyCard from "./cards/FragnancefamilyCard";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const Shopfresh = () => {
  const location = useLocation(); // Get the current location

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, [location]); // This will run when the location changes

 

  return (<>
   <PageTitle pageTitle={"Fragrance Fresh"} />
   <FragranceFamilyCard/>

   </>
  
  );
}

export default Shopfresh;
