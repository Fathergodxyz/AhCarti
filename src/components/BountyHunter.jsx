import BACKGROUND_IMAGE from "../assets/images/appScreen.png";
import { BLESSINGS, GOAL_MARKET_CAP, GRAPH_URL } from "../constants/VALUES";
import Header from "../layout/Header";
import { useEffect, useRef, useState } from "react";
import Tooltip from "./Tooltip";
import { Fireworks } from "@fireworks-js/react";
import Timer from "./Timer";

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
    <div className="overflow-y-hidden flex flex-col items-center justify-end h-screen bg-[url(/hero-bg.png)] bg-cover bg-center">
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
      <Header
        isGoalReached={marketCap >= GOAL_MARKET_CAP}
        onHuntClick={() => {
          console.log("clicked");
          setShowScroll(true);
        }}
      />
      -
      <div className="w-[700px] h-[700px] relative mt-[100px]">
        <img
          style={{
            pointerEvents: "none",
          }}
          src={BACKGROUND_IMAGE}
          alt="lottery system"
          className="w-full h-full object-contain absolute top-0 left-0 z-10"
        />
        <Tooltip
          text="In the $FATHER token ecosystem, when the target market capitalization is achieved, a prize pool denominated in $SOL, known as 'Blessings in $SOL', is distributed to participants. Holders of $FATHER tokens are eligible for this distribution, with winners selected through a random snapshot of token holders. After the prize distribution, there is a one-week cooldown period before setting the next market cap goal."
          top="113px"
          left="590px"
          color="#fff"
          isAbsolute
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
          isAbsolute
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
          className="absolute top-[150px] left-[96px] h-[199px] w-[320px] hover:scale-150 transition-transform duration-200 hover:z-20"
          src={GRAPH_URL}
          title="Dexscreener embed"
        />
      </div>
      {showScroll && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center p-4 sm:p-12"
          onClick={() => setShowScroll(false)}
        >
          <div
            className="relative bg-maroon p-4 sm:p-12 border-2 border-[#e8d2a0] shadow-inner max-w-[95%] sm:max-w-2xl max-h-[90vh] overflow-y-auto"
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
