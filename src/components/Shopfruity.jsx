import FragranceFamilyCard from "./cards/FragnancefamilyCard";
import PageTitle from "./sub-components/PageTitle";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const Shopfruity = () => {
  const location = useLocation(); // Get the current location

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, [location]); // This will run when the location changes

  return (
    <div>
      <PageTitle pageTitle={"Fragrence Fruity"} />
      <FragranceFamilyCard/>
    </div>
  );
}

export default Shopfruity