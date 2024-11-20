import Hero from "./Hero";
import Utilities from "./Utilities";
import HowToBuy from "./HowToBuy";
import Tokenomics from "./Tokenomics";
import Marquee from "react-fast-marquee";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

const Home = () => {
  return (
<<<<<<< HEAD
    <>
      <Header />
=======
    <main className="flex flex-col">
>>>>>>> ddf59e5 (swap feature added, cleaned up bounty hunter app)
      <Hero />

      <Marquee
        className="bg-[#e8d2a0] text-white text-[22px] sm:text-[26px] lg:text-[32px] 2xl:text-[40px] font-madimi !leading-[1.3] py-5"
        autoFill
      >
        <div className="px-[0.7em]">
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
          Father is with Me, Father is with You, Father is with Us!
        </div>
      </Marquee>
      <Tokenomics />
      <Marquee
        className="bg-black text-white text-[22px] sm:text-[26px] lg:text-[32px] 2xl:text-[40px] font-madimi !leading-[1.3] py-5"
        autoFill
      >
        <div className="px-[0.7em]">
          Father is with Me, Father is with You, Father is with Us!
        </div>
      </Marquee>
<<<<<<< HEAD

      <Footer />
    </>
=======
    </main>
>>>>>>> ddf59e5 (swap feature added, cleaned up bounty hunter app)
  );
};

export default Home;