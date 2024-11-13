import Card from "./cards/Card";
import PageTitle from "./sub-components/PageTitle";
import bakhurData from "./ProductData/bakhurData";
const Bakhur = () => {
  return (
    <div className=" ">
      <PageTitle pageTitle={"Bakhur"} />
      <div className="flex flex-wrap max-sm:justify-center max-sm:align-center max-sm:ml-20 max-sm:mt-10">
      {bakhurData.map((product, index) => (
          <Card key={index} {...product} />
        ))}
      </div>
     
    </div>
  );
  
};

export default Bakhur;
