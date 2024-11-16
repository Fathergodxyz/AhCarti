import BACKGROUND_IMAGE from "../assets/images/appScreen.png";
import { BLESSINGS, GOAL_MARKET_CAP, GRAPH_URL } from "../constants/VALUES";
import Header from "../layout/Header";
import { useEffect, useRef, useState } from "react";
import Tooltip from "./Tooltip";
import { Fireworks } from "@fireworks-js/react";

import "./BountyHunter.css";

const BountyHunter = () => {
  const ref = useRef(null);
  const [marketCap, setMarketCap] = useState(0);
  const [formattedMarketCap, setFormattedMarketCap] = useState(0);

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

      setFormattedMarketCap(formattedMarketCap);

      setMarketCap(marketCap);
    } catch (error) {
      console.error("Error fetching market cap:", error);
    }
  }

  const formattedBlessings = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(BLESSINGS);

  const formattedGoalMarketCap = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(GOAL_MARKET_CAP);

  useEffect(() => {
    if (!ref.current) return;
    if (marketCap >= GOAL_MARKET_CAP) {
      ref.current?.start();
    } else {
      ref.current?.stop();
      ref.current?.clear();
    }
  }, [marketCap, ref]);

  return (
    <div className="overflow-hidden flex flex-col items-center justify-end h-screen bg-[url(/hero-bg.png)] bg-cover bg-center">
      <Fireworks
        ref={ref}
        options={{ opacity: 0.5 }}
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "fixed",
          zIndex: 999,
          pointerEvents: "none",
        }}
      />

      <Header />

      <div className="w-[700px] h-[700px] relative mt-[100px]">
        <img
          src={BACKGROUND_IMAGE}
          alt="lottery system"
          className="w-full h-full object-contain absolute top-0 left-0 z-10"
        />
        <Tooltip
          text="In the $FATHER token ecosystem, when the target market capitalization is achieved, a prize pool denominated in $SOL, known as 'Blessings in $SOL', is distributed to participants. Holders of $FATHER tokens are eligible for this distribution, with winners selected through a random snapshot of token holders. After the prize distribution, there is a one-week cooldown period before setting the next market cap goal."
          top="113px"
          left="590px"
          color="#fff"
        />
        <p className="absolute top-[255px] right-[95px] w-[158px] h-[55px] text-red-500 text-center flex items-center justify-center text-[45px] font-['DS-Digital'] hover:scale-150 hover:bg-[#2c2b28] hover:shadow-2xl rounded-md cursor-default z-10">
          {formattedBlessings}
        </p>

        <p className="absolute top-[480px] left-[102px]  w-[232px] h-[50px] text-red-500 text-center flex items-center justify-center text-[45px] font-['DS-Digital'] p-0 m-0 hover:scale-150 hover:bg-[#2c2b28] hover:shadow-2xl rounded-md cursor-default z-10">
          {formattedMarketCap}
        </p>

        <a
          href="https://dexscreener.com/solana/txg2f4ihgqeyx4ipy5thksuzqumzywywy6t1siufsnz"
          target="_blank"
          className="absolute  bottom-[55px] left-[100px] w-[180px] h-[80px] z-10"
        />

        <Tooltip
          text="The goal market cap represents the target market cap we aim to reach to trigger the next prize event. Once this goal is met, an event will be triggered, allowing holders of $FATHER the chance to win a prize in $SOL. A random snapshot will be taken to determine eligible participants among the holders."
          top="420px"
          left="575px"
          color="#fff"
        />
        <p className="absolute top-[480px] right-[95px] w-[232px] h-[50px] text-red-500 text-center flex items-center justify-center text-[45px] font-['DS-Digital'] p-0 m-0 hover:scale-150 hover:bg-[#2c2b28] hover:shadow-2xl rounded-md cursor-default z-10">
          {formattedGoalMarketCap}
        </p>

        <a
          href="https:dexscreener.com/solana/txg2f4ihGQeyX4iPY5thkSUzQUmZYwYY6T1SiUFsnz"
          target="_blank"
          rel="noopener noreferrer"
          className="buy-here-button text-[#8fa98b] absolute bottom-[69px] right-[102px] w-[144px] h-[36px] flex items-center justify-center rounded-[4px] hover:-translate-y-[1px] active:translate-y-[1px] cursor-pointer hover:shadow-lg z-10"
        >
          BUY HERE
        </a>

        <iframe
          className="absolute top-[150px] left-[96px] h-[199px] w-[320px] z-0"
          src={GRAPH_URL}
          title="Dexscreener embed"
        />
      </div>
    </div>
  );
};

export default BountyHunter;
