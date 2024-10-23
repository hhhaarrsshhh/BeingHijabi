import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AppRoutes from "./routes/approutes";
import { useState } from "react";

const App = () => {
  const [intro, setIntro] = useState(false);

  const tl = gsap.timeline({
    onComplete: () => {
      setIntro(true);
    },
  });

  useGSAP(() => {
    tl.to(".show", {
      height: "100%",
      duration: 1,
      ease: "circ.inOut",
    })
      .to(".heading", {
        opacity: 1,
        y: -30,
        duration: 3,
      })
      
      // .to(".heading-2", {
      //   opacity: 1,
      //   y: -30,
      //   duration: 1,
      // })
      // .to("heading-2", {
      //   x: 10,
      //   ease: "circ.inOut",
      //   stagger: 0.2, // Staggering duration
      //   duration: 0.6, // Duration of opacity animation
      // })
      // .to(".heading-2 span", {
      //   stagger: 0.1, // Staggering duration
      //   duration: 0.2, // Duration of opacity animation
      //   x: -5,
      //   opacity: 0,
      // })
      .to(".show", {
        // ease: "elastic.inOut",
        x: -10000,
        duration: 8,
        // opacity: 0,
        display: "none",
      });
  }, []);
  return (
    <>
      {!intro && (
        <>
         
            <div className="line  show bg-white bg-primary/90  h-screen fixed inset-0  z-[10000] flex justify-center items-center overflow-hidden w-screen ">
              <div className="flex gap-2 sm:text-[3vw] font-medium heading opacity-0 block-head text-2xl  absolute top-[50%] left-[50%] -translate-x-[50%]  -translate-y-[50%] text-white dark:text-[#060C1B]">
                <img
                  src="https://static.wixstatic.com/media/b6bc2e_c61cda5066204dfbb74b8290b9a41f13~mv2.png/v1/fill/w_240,h_156,al_c,usm_0.66_1.00_0.01/b6bc2e_c61cda5066204dfbb74b8290b9a41f13~mv2.png"
                  className="opacity-1"
                  alt=""
                />
              </div>
            </div>
        </>
      )}
      <AppRoutes />
    </>
  );
};

export default App;
