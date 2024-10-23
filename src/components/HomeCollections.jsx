import Card from "./cards/Card";

const HomeCollections = () => {
  return (
    <div className="bg-black py-12 mb-[1px]">
      <h3 className="cursive--font text-center text-white md:text-6xl text-4xl">
        Exclusive Fragrance Collection
      </h3>
      <div className="flex gap-4 max-w-7xl mx-auto mt-12">
        <Card
          productName={"Zafran"}
          price={"1699"}
          image={
            "https://static.wixstatic.com/media/b6bc2e_f610cd51adb24bf294516d8380e8dfa3~mv2.jpg/v1/fill/w_321,h_321,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/b6bc2e_f610cd51adb24bf294516d8380e8dfa3~mv2.jpg"
          }
        />
        <Card
          productName={"Zafran"}
          price={"1699"}
          image={
            "https://static.wixstatic.com/media/b6bc2e_f610cd51adb24bf294516d8380e8dfa3~mv2.jpg/v1/fill/w_321,h_321,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/b6bc2e_f610cd51adb24bf294516d8380e8dfa3~mv2.jpg"
          }
        />
        <Card
          productName={"Zafran"}
          price={"1699"}
          image={
            "https://static.wixstatic.com/media/b6bc2e_f610cd51adb24bf294516d8380e8dfa3~mv2.jpg/v1/fill/w_321,h_321,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/b6bc2e_f610cd51adb24bf294516d8380e8dfa3~mv2.jpg"
          }
        />
        <Card
          productName={"Zafran"}
          price={"1699"}
          image={
            "https://static.wixstatic.com/media/b6bc2e_f610cd51adb24bf294516d8380e8dfa3~mv2.jpg/v1/fill/w_321,h_321,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/b6bc2e_f610cd51adb24bf294516d8380e8dfa3~mv2.jpg"
          }
        />
      </div>
      <div className="flex justify-center pt-12">
        <button className="bg-black text-white border-white border-2 rounded-full p-2 px-6 hover:bg-white hover:text-black duration-150 transition-all mx-auto">
          Shop all
        </button>
      </div>
    </div>
  );
};

export default HomeCollections;
