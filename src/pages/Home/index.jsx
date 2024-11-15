import React from "react";
import Hero from "./Hero";
import Utilities from "./Utilities";
import HowToBuy from "./HowToBuy";
import Tokenomics from "./Tokenomics";
import Marquee from "react-fast-marquee";

const Home = () => {
  return (
    <>
      <Hero />

      <Marquee
        className="bg-[#e8d2a0] text-white text-[22px] sm:text-[26px] lg:text-[32px] 2xl:text-[40px] font-madimi !leading-[1.3] py-5"
        autoFill
      >
        <div className="px-[0.7em]">
          {" "}
          Father is with Me, Father is with You, Father is with Us!
        </div>
      </Marquee>

      <Utilities />
      <HowToBuy />
      <Marquee
        className="bg-[#BDCAD250] text-maroon text-[22px] sm:text-[26px] lg:text-[32px] 2xl:text-[40px] font-madimi !leading-[1.3] py-5"
        autoFill
      >
        <div className="px-[0.7em]">
          {" "}
          Father is with Me, Father is with You, Father is with Us!
        </div>
      </Marquee>
      <Tokenomics />
      <Marquee
        className="bg-black text-white text-[22px] sm:text-[26px] lg:text-[32px] 2xl:text-[40px] font-madimi !leading-[1.3] py-5"
        autoFill
      >
        <div className="px-[0.7em]">
          {" "}
          Father is with Me, Father is with You, Father is with Us!
        </div>
      </Marquee>
    </>
  );
};

export default Home;
