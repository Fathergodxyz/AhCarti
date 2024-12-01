import Hero from "./Hero";
import Utilities from "./Utilities";
import HowToBuy from "./HowToBuy";
import Marquee from "react-fast-marquee";

const Home = () => {
  return (
    <main className="flex flex-col">
      <Hero />

      <Marquee
      className="bg-[#e4e4dc]"
      autoFill
    >
      <div className="px-3 font-madimi text-[25px] uppercase text-stroke-black text-white">
        Carti-Ahh! by mrowl
      </div>
    </Marquee>


      <Utilities />
      <HowToBuy />
      <Marquee
      className="bg-[#e4e4dc]"
      autoFill
    >
      <div className="px-3 font-madimi text-[25px] uppercase text-stroke-black text-white">
        Mrowl walked, so we can Run!
      </div>
    </Marquee>
    </main>
  );
};

export default Home;