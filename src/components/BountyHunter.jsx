import BACKGROUND_IMAGE from "../assets/images/appScreen.png";
import Header from "../layout/Header";
import "./BountyHunter.css";
import { useEffect, useState } from "react";

const BountyHunter = () => {
  const [marketCap, setMarketCap] = useState(0);

  useEffect(() => {
    updateMarketCap();
  }, []);

  async function updateMarketCap() {
    try {
      const response = await fetch(
        "https://api.dexscreener.com/latest/dex/tokens/2mysC3fDxCUG4T6gBBWn35a8VkykqY1A9Hj7fkiApump"
      );
      const data = await response.json();

      const marketCap = data.pairs[0].marketCap;

      const formattedMarketCap = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(marketCap);

      setMarketCap(formattedMarketCap);
    } catch (error) {
      console.error("Error fetching market cap:", error);
    }
  }
  return (
    <div className="flex flex-col items-center justify-end h-screen ">
      <div className="fireworks-container fixed inset-0 pointer-events-none w-full h-full" />

      <Header />

      <div className="w-[700px] h-[700px] relative mt-[100px]">
        <img
          src={BACKGROUND_IMAGE}
          alt="lottery system"
          className="w-full h-full object-contain absolute top-0 left-0"
        />
        <p className="absolute top-[255px] right-[95px] w-[158px] h-[55px] text-red-500 text-center flex items-center justify-center text-[45px] font-['DS-Digital'] hover:scale-150 hover:bg-[#2c2b28] hover:shadow-2xl rounded-md cursor-default">
          $20,000
        </p>

        <p className="absolute top-[480px] left-[102px]  w-[232px] h-[50px] text-red-500 text-center flex items-center justify-center text-[45px] font-['DS-Digital'] p-0 m-0 hover:scale-150 hover:bg-[#2c2b28] hover:shadow-2xl rounded-md cursor-default">
          {marketCap}
        </p>

        <p className="absolute top-[480px] right-[95px] w-[232px] h-[50px] text-red-500 text-center flex items-center justify-center text-[45px] font-['DS-Digital'] p-0 m-0 hover:scale-150 hover:bg-[#2c2b28] hover:shadow-2xl rounded-md cursor-default">
          $100,000
        </p>

        <a
          href="https:dexscreener.com/solana/txg2f4ihGQeyX4iPY5thkSUzQUmZYwYY6T1SiUFsnz"
          target="_blank"
          rel="noopener noreferrer"
          className="buy-here-button  text-[#8fa98b] absolute bottom-[69px] right-[102px] w-[144px] h-[36px] flex items-center justify-center rounded-[4px] hover:-translate-y-[1px] active:translate-y-[1px] cursor-pointer hover:shadow-lg"
        >
          BUY HERE
        </a>

        <iframe
          className="absolute top-[150px] left-[96px]  h-[199px] w-[320px] -z-[1]"
          src="https:dexscreener.com/solana/txg2f4ihGQeyX4iPY5thkSUzQUmZYwYY6T1SiUFsnz?embed=1&theme=dark&trades=0&info=0"
          title="Dexscreener embed"
        />
      </div>
    </div>
  );
};

export default BountyHunter;
