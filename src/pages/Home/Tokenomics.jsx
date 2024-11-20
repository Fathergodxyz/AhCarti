// src/pages/Home/Tokenomics.jsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import SwapModal from "../../components/swapmodal";
import { useWallet } from '../../context/WalletContext';

const Tokenomics = () => {
  const wrapper = useRef();
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const { walletAddress, connectWallet } = useWallet();

  useGSAP(
    () => {
      const items = wrapper.current.querySelectorAll(".slide-in-item");

      gsap.fromTo(
        items,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.3,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: wrapper.current,
            start: "25% bottom",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { dependencies: [], revertOnUpdate: true }
  );

  const handleSwapClick = async () => {
    try {
      if (!window?.phantom?.solana) {
        window.open('https://phantom.app/', '_blank');
        return;
      }

      if (!walletAddress) {
        await connectWallet();
      }
      
      setIsSwapModalOpen(true);
    } catch (err) {
      console.error('Failed to handle swap click:', err);
    }
  };

  return (
    <div className="relative">
      {/* Top cloud transition */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] transform -translate-y-[1px] z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] sm:h-[80px] md:h-[100px]"
        >
          <path
            d="M0,20
               C60,20 120,40 180,40
               C240,40 300,20 360,20
               C420,20 480,50 540,50
               C600,50 660,20 720,20
               C780,20 840,35 900,35
               C960,35 1020,20 1080,20
               C1140,20 1200,45 1260,45
               C1320,45 1380,20 1440,20
               L1440,0 L0,0 Z"
            fill="#ebeef2"
          />
        </svg>
      </div>

      <div ref={wrapper} className="bg-black section-wrapper">
        <div className="flex flex-col items-center max-w-[1536px] gap-10 sm:gap-12 md:gap-16 lg:gap-24 w-[90%] sm:w-[93%] mx-auto">
          <h2 className="uppercase text-[52px] xs:text-[60px] sm:text-[72px] md:text-[84px] lg:text-[100px] xl:text-[121px] 2xl:text-[147px] text-pale-gold !leading-[1.25] slide-in-item">
            Tokenomics
          </h2>

          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12 xl:gap-20 2xl:gap-32 w-full">
              <img
                src="/heaven-tokenomics.png"
                alt="heaven tokenomics"
                className="w-full md:w-1/2 slide-in-item"
              />

              <div className="text-xl sm:text-2xl md:text-[clamp(20px,2.6vw,28px)] lg:text-[28px] xl:text-[32px] 2xl:text-[40px] font-madimi text-white !leading-[1.3] text-center md:text-center w-full md:w-1/2 slide-in-item">
                <p>
                  Our token was crafted through the arcane mysteries of{" "}
                  <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="text-[red] underline">
                    pump.fun
                  </a>{" "}
                  . the liquidity pool has been cast into the eternal flames,
                  the contract&apos;s ownership renounced to the realm, with no
                  taxes upon trade, and a fixed supply of 976 million tokens.
                </p>

                <p className="text-[red]">
                  Only Those that keep $FATHER near may see their blessing in
                  $SOL
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 w-full text-center">
              <div
                style={{ backgroundSize: "100% 100%" }}
                className="w-full md:w-1/2 text-maroon font-raleway font-bold bg-[url(/wooden-bg.png)] bg-no-repeat flex flex-col justify-center items-center h-[120px] xs:h-[140px] md:h-[167px] pb-1 slide-in-item"
              >
                <h3 className="text-[36px] xs:text-[42px] lg:text-[56px] xl:text-[68px] 2xl:text-[86px] !leading-[1]">
                  Token Address
                </h3>
                <span className="md:text-xl 2xl:text-[25px] !leading-[1.2] xl:!leading-[1.76] break-all 2xl:break-normal w-[90%] 2xl:w-full text-center mt-1 xl:mt-0">
                  2mysC3fDxCUG4T6gBBWn35a8VkykqY1A9Hj7fkiApump
                </span>
              </div>

              <div
                style={{ backgroundSize: "100% 100%" }}
                className="w-full md:w-1/2 text-maroon font-raleway font-bold bg-[url(/wooden-bg.png)] bg-no-repeat flex flex-col justify-center items-center h-[120px] xs:h-[140px] md:h-[167px] pb-1 slide-in-item"
              >
                <h3 className="text-[36px] xs:text-[42px] lg:text-[56px] xl:text-[68px] 2xl:text-[86px] !leading-[1]">
                  Total Supply
                </h3>
                <span className="text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] 2xl:text-[46px] !leading-[1]">
                  974,154,643
                </span>
              </div>
            </div>

            <button
              onClick={handleSwapClick}
              className="bg-white text-maroon border-4 border-maroon text-2xl lg:text-[30px] 2xl:text-[38px] leading-[1.25] py-3 px-8 rotate-[3.02deg] uppercase mt-2 lg:mt-5 slide-in-item hover:scale-105 transition-transform animate-bounce"
            >
              {walletAddress ? 'Swap $father' : 'Connect Wallet To Swap'}
            </button>
          </div>
        </div>
      </div>

      <SwapModal
        isOpen={isSwapModalOpen}
        onClose={() => setIsSwapModalOpen(false)}
      />
    </div>
  );
};

export default Tokenomics;