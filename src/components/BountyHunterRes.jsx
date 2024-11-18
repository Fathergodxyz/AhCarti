import { BLESSINGS, GOAL_MARKET_CAP, GRAPH_URL } from "../constants/VALUES";
import Header from "../layout/Header";
import { useEffect, useRef, useState } from "react";
import Tooltip from "./Tooltip";
import { Fireworks } from "@fireworks-js/react";
import Timer from "./Timer";

import HEADER_SCROLL from "../assets/images/HeaderScroll.png";
import CURRENT_MARKET_CAP_GRAPH_BG from "../assets/images/CurrentMarketCapGraphBG.png";
import BLESSING_IN_SOL_BG from "../assets/images/BlessingInSolBG.png";
import BLESSINGS_TEXT_BORDER from "../assets/images/BlessingsTextBorder.png";
import MARKET_CAP_TEXT_BORDER from "../assets/images/MarketCapTextBorder.png";
import MARKET_CAP_HEADER_BORDER from "../assets/images/MarketCapHeaderBorder.png";
import POWERED_BY from "../assets/images/PoweredByBG.png";
import KNOB from "../assets/images/knob.png";
import BUY_BUTTON from "../assets/images/BuyButtonBG.png";

import "./BountyHunter.css";

const BountyHunter = () => {
  const ref = useRef(null);
  const [marketCap, setMarketCap] = useState(0);
  const [formattedMarketCap, setFormattedMarketCap] = useState(0);

  const [showScroll, setShowScroll] = useState(false);

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
    maximumFractionDigits: 4,
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

  useEffect(() => {
    document.body.style.backgroundColor = "#2D2C28";
    return () => {
      document.body.style.backgroundColor = "#5a5d5e";
    };
  }, []);

  return (
    <div className="bg-[#2D2C28] w-full">
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
      />{" "}
      <Header
        notFixed
        isGoalReached={marketCap >= GOAL_MARKET_CAP}
        onHuntClick={() => {
          console.log("clicked");
          setShowScroll(true);
        }}
      />
      <div className="container mx-auto px-4 max-w-[800px] ">
        <div className="flex items-center justify-center relative">
          <img src={HEADER_SCROLL} alt="Header Scroll" className="w-[400px]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-[#000] text-3xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl font-bold">
              Bounty Hunter
            </p>
          </div>
        </div>

        <div className="grid  xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
          <div className="xs:col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 relative z-20">
            {/* <div className="relative"> */}
            <img
              src={CURRENT_MARKET_CAP_GRAPH_BG}
              alt="Current Market Cap Graph BG"
              className="absolute h-full w-full"
              style={{
                pointerEvents: "none",
              }}
            />
            <iframe
              className="h-[100%] w-[100%] hover:scale-150 transition-transform duration-200 hover:z-40 -z-10"
              src={GRAPH_URL}
              title="Dexscreener embed"
            />
            {/* </div> */}
          </div>
          <div>
            <div className="relative ">
              <img
                src={BLESSING_IN_SOL_BG}
                alt="Blessing in SOL BG"
                className="h-auto w-full"
              />
              <Tooltip
                isAbsolute
                text="In the $FATHER token ecosystem, when the target market capitalization is achieved, a prize pool denominated in $SOL, known as 'Blessings in $SOL', is distributed to participants. Holders of $FATHER tokens are eligible for this distribution, with winners selected through a random snapshot of token holders. After the prize distribution, there is a one-week cooldown period before setting the next market cap goal."
                color="#fff"
                top="0"
                left="90%"
              />
              <p className="uppercase text-4xl absolute inset-10 text-center font-['Empire'] flex items-center justify-center">
                BLESSINGS IN $ SOL{" "}
              </p>
            </div>
            <br />
            <div className="relative bg-[#2D2C29]">
              <img
                src={BLESSINGS_TEXT_BORDER}
                alt="Blessings Text Border"
                className="h-auto w-full"
              />
              <p className="uppercase text-red-500 text-6xl absolute inset-5 text-center font-['DS-Digital'] hover:bg-[#333333] hover:scale-150  flex items-center justify-center">
                {formattedBlessings}
              </p>
            </div>
          </div>
        </div>
        <br />
        <div className="grid  xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          <div className="relative w-full">
            <img
              src={MARKET_CAP_HEADER_BORDER}
              alt="Current Cap Header Border"
              className="w-full"
            />
            <p className="uppercase text-2xl absolute inset-5 text-center font-['Empire'] market-cap-text ">
              Current MarketCap
            </p>
          </div>
          <div className="relative w-full">
            <img
              src={MARKET_CAP_HEADER_BORDER}
              alt="Current Cap Header Border"
              className=" w-full"
            />
            <div className="flex justify-center">
              <p className="uppercase text-2xl absolute inset-5 text-center font-['Empire'] market-cap-text ">
                Goal MarketCap
              </p>
              <Tooltip
                isAbsolute
                text="The goal market cap represents the target market cap we aim to reach to trigger the next prize event. Once this goal is met, an event will be triggered, allowing holders of $FATHER the chance to win a prize in $SOL. A random snapshot will be taken to determine eligible participants among the holders."
                color="#fff"
                top="20px"
                left="85%"
              />
            </div>
          </div>
        </div>

        <div className="grid  xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-2">
          <div className="relative bg-[#2D2C29]">
            <img
              src={MARKET_CAP_TEXT_BORDER}
              alt="Current Cap Text Border"
              className="w-full"
            />
            <p className="uppercase text-red-500 text-6xl absolute inset-7 text-center font-['DS-Digital'] hover:bg-[#333333] hover:scale-150 hover:bg-[#333333] ">
              {formattedMarketCap}
            </p>
          </div>
          <div className="relative bg-[#2D2C29]">
            <img
              src={MARKET_CAP_TEXT_BORDER}
              alt="Current Cap Text Border"
              className=" w-full"
            />
            <p className="uppercase text-red-500  text-6xl absolute inset-7 text-center font-['DS-Digital'] hover:bg-[#333333] hover:scale-150 hover:bg-[#333333] ">
              {formattedGoalMarketCap}
            </p>
          </div>
        </div>

        <div className="grid  xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-2">
          <div className="relative">
            <img
              src={POWERED_BY}
              alt="Powered By"
              className="absolute w-full top-0 left-0 z-10"
            />

            <a
              href="https://dexscreener.com/solana/txg2f4ihgqeyx4ipy5thksuzqumzywywy6t1siufsnz"
              target="_blank"
              className=" text-2xl text-center font-['Empire'] flex items-center justify-center z-20 relative  h-[70%] "
            >
              Powered By <br />
              Dexscreener
            </a>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <div className="flex flex-col w-full">
              <img src={KNOB} alt="Knob" className="h-16 w-16  mt-2" />
              <img src={KNOB} alt="Knob" className="h-16 w-16" />
            </div>
            <div className="flex flex-col mt-4 w-full">
              <img src={KNOB} alt="Knob" className="h-16 w-16" />
              <img src={KNOB} alt="Knob" className="h-16 w-16" />
            </div>
            <div className="flex flex-col mt-4 w-full justify-center">
              <img src={KNOB} alt="Knob" className="h-16 w-16  " />
              <img src={KNOB} alt="Knob" className="h-16 w-16" />
            </div>
          </div>
          <div className="relative">
            <img src={BUY_BUTTON} alt="Buy Button" className=" w-full h-full" />
            <a
              href="https:dexscreener.com/solana/txg2f4ihGQeyX4iPY5thkSUzQUmZYwYY6T1SiUFsnz"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-[#8fa98b] absolute inset-14  flex items-center justify-center  hover:-translate-y-[1px] active:translate-y-[1px] cursor-pointer  z-10"
            >
              BUY HERE
            </a>
          </div>
        </div>
      </div>
      {showScroll && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center p-4 sm:p-12"
          onClick={() => setShowScroll(false)}
        >
          <div
            className="relative bg-maroon p-4 sm:p-12 border-2 border-[#e8d2a0] shadow-inner w-full  max-h-[90vh] overflow-y-auto"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex items-center justify-end mb-4">
              <div
                className="text-[#e8d2a0] text-lg cursor-pointer border-2 border-[#e8d2a0] px-2 py-1"
                onClick={() => setShowScroll(false)}
              >
                Close
              </div>
            </div>
            <p className="text-[#e8d2a0] text-base sm:text-lg">
              Huzzah! The Marketcap Quest has been fulfilled! The next grand
              target shall be set once the sands in the hourglass run dry. When
              the countdown strikes zero, the chosen victor shall be proclaimed!
            </p>
            <p className="text-[#e8d2a0] text-base sm:text-lg my-4">
              Take heed! A mystical snapshot shall be cast at a random moment
              ere the sands are spent, thus all true holders of $Father may yet
              claim a chance to join the noble fray. Every 1000 $Father held
              bestows upon thee a single ballot in this grand raffle.
            </p>

            <p className="text-[#e8d2a0] text-base sm:text-lg mb-4">
              The winning wallet shall be revealed anon, and the chosen must
              declare themselves within a fortnight—either in the town square of
              Telegram or upon the banners of Twitter—to claim their prize. Any
              prize unclaimed after this time shall be added to the next prize
              pool, growing the rewards of future champions. Be present on
              Twitter or Telegram to secure thy prize, lest suspicion of dark
              sorcery cast a shadow on the proceedings.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <p className="text-[#e8d2a0] text-xl sm:text-2xl">COUNTDOWN</p>
              <Timer textColor="text-[#e8d2a0]" />
              <Tooltip
                direction="top"
                color="#e8d2a0"
                text={
                  <div>
                    <p>
                      Great news! The Marketcap goal has been reached! A new
                      target will be set when the countdown hits zero, and
                      that’s when the winner will be announced!
                    </p>

                    <p>
                      Heads up! A snapshot will be taken at a random time before
                      the countdown ends, so as long as you’re holding $Father,
                      you’re in with a chance. Every 1000 $Father you hold gives
                      you one entry in the raffle.
                    </p>

                    <p>
                      The winning wallet address will be shared, and the winner
                      has two weeks to confirm on Telegram or Twitter to claim
                      their prize. Any unclaimed prizes after that period will
                      roll over into the next prize pool, making it even bigger!
                      Be sure to stay active on Twitter or Telegram to secure
                      your reward (This also prevents foul play). Note**: winner
                      may only receive the reward with the wallet address that
                      wins.
                    </p>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BountyHunter;
