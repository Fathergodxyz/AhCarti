import React, { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Divider = () => (
  <svg width="100%" height="40" viewBox="0 0 1200 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <line x1="0" y1="20" x2="240" y2="20" stroke="black" stroke-width="12" stroke-linecap="round"/>
    <line x1="240" y1="20" x2="480" y2="20" stroke="#808080" stroke-width="12" stroke-linecap="round"/>
    <line x1="480" y1="20" x2="720" y2="20" stroke="black" stroke-width="12" stroke-linecap="round"/>
    <line x1="720" y1="20" x2="960" y2="20" stroke="#808080" stroke-width="12" stroke-linecap="round"/>
    <line x1="960" y1="20" x2="1200" y2="20" stroke="black" stroke-width="12" stroke-linecap="round"/>
  </svg>
);

const Utilities = () => {
  const wrapper = useRef();

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

  return (
    <div className="relative">
      {/* Top transition */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] transform -translate-y-[1px] z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="relative block w-full h-[40px] sm:h-[80px] md:h-[100px]"
        >
          <path
            d="M0,20 C60,20 120,40 180,40 C240,40 300,20 360,20 C420,20 480,50 540,50 C600,50 660,20 720,20 C780,20 840,35 900,35 C960,35 1020,20 1080,20 C1140,20 1200,45 1260,45 C1320,45 1380,20 1440,20 L1440,0 L0,0 Z"
            fill="#e4e6e0"
          />
        </svg>
      </div>

      <div className="relative">
        <div ref={wrapper} className="bg-[#e4e6e0] section-wrapper">
          <div className="flex flex-col items-center justify-center min-h-[80vh] sm:min-h-screen w-full px-4">
            <div className="w-full max-w-[95vw] xl:max-w-[1400px] mx-auto slide-in-item">
              <a 
                href="https://dexscreener.com/solana/93tjgwff5ac5thymi8c4wejvvqq4tumemuyw1leyz7bu"
                target="_blank"
                rel="noopener noreferrer"
                className="block transform transition-transform duration-300 hover:scale-105 relative"
              >
                <img 
                  src="/chillguy.jpeg" 
                  alt="Cartoon dog character" 
                  className="w-full h-auto object-contain"
                />
                <img 
                  src="/Advisory.svg" 
                  alt="Advisory" 
                  className="absolute bottom-4 right-4 w-16 sm:w-60 md:w-72 lg:w-80 h-auto z-10"
                />
              </a>
            </div>
            
            <div className="w-full max-w-[95vw] xl:max-w-[1400px] mx-auto mt-8 sm:mt-16 slide-in-item">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-2">
                <div>
                  <h1 className="text-4xl sm:text-7xl md:text-8xl font-bold text-black font-['Raleway']">MrOwl</h1>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl text-black mt-2 font-['Raleway']">Memecoin lit</h2>
                </div>
                <div className="mt-2 sm:mb-2">
                  <p className="text-lg sm:text-2xl md:text-3xl text-gray-600 font-['Raleway']">shitcoin • token • pump fun</p>
                </div>
              </div>
              <Divider />
            </div>
          </div>
        </div>

        {/* Bottom transition */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="relative block w-full h-[40px] sm:h-[80px] md:h-[100px]"
          >
            <path
              d="M0,70 C120,70 180,40 240,40 C300,40 360,70 420,70 C480,70 540,30 600,30 C660,30 720,70 780,70 C840,70 900,50 960,50 C1020,50 1080,70 1140,70 C1200,70 1260,40 1320,40 C1380,40 1410,70 1440,70 L1440,100 L0,100 Z"
              fill="#e4e6e0"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Utilities;