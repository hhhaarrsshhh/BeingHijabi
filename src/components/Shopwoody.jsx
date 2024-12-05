import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import FragranceFamilyCard from "./cards/FragnancefamilyCard";
import PageTitle from "./sub-components/PageTitle";

const Shopwoody = () => {
  const location = useLocation(); // Get the current location

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, [location]); // This will run when the location changes

  return (
    <div>
      <PageTitle pageTitle={"Woody Fragrances"} />
      <FragranceFamilyCard />
    </div>
  );
};

export default Shopwoody;
