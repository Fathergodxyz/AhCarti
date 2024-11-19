import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import PropTypes from "prop-types";

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
            fill="#e8d2a0"
          />
        </svg>
      </div>

      <div className="relative">
        <div ref={wrapper} className="bg-[url(/map-bg.png)] section-wrapper">
          <div className="flex flex-col items-center gap-8 sm:gap-12 xl:gap-16 w-[90%] sm:w-[93%]">
            <div className="text-center">
              <h2 className="uppercase text-[48px] xs:text-[56px] md:text-[64px] lg:text-[72px] xl:text-[80px] 2xl:text-[97px] text-maroon !leading-none slide-in-item">
                father utilities
              </h2>

              <p className="font-madimi text-2xl md:text-[28px] lg:text-[32px] xl:text-[36px] 2xl:text-[50px] text-maroon max-w-[18.1em] !leading-[1.25] mt-3 slide-in-item">
                Welcome to the $FATHER realm, where loyalty is rewarded, and
                bravery honored.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Card>
                As we near a momentous milestone, we hereby summon valiant
                Bounty Hunters from our noble community! This grand quest offers
                the chance to win treasures in $SOL.
              </Card>
              <Card>
                Soon, we shall bestow gifts of $FATHER (or its weight in $SOL)
                upon the worthy. Once our system is in place, entry shall be
                granted by crafting a post—untouched by cash tags. Every week,
                we shall convene to draw forth the chosen from among ye.
              </Card>
              <Card>
                Starting on the 10th day of November, we shall host sacred
                Sunday Sermons every fortnight, and weekly gatherings throughout
                December. Join us in our Telegram hall, for some lost souls in
                attendance may find themselves blessed with $SOL for their
                loyalty.
              </Card>
            </div>
          </div>
        </div>

        {/* Mobile-optimized cloud transition footer */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="relative block w-full h-[60px] sm:h-[80px] md:h-[100px]"
          >
            <path
              d="M0,70
               C120,70 180,40 240,40
               C300,40 360,70 420,70
               C480,70 540,30 600,30
               C660,30 720,70 780,70
               C840,70 900,50 960,50
               C1020,50 1080,70 1140,70
               C1200,70 1260,40 1320,40
               C1380,40 1410,70 1440,70
               L1440,100 L0,100 Z"
              fill="#ebeef2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Utilities;

const Card = ({ children }) => {
  return (
    <div className="bg-pale-gold border-4 sm:border-[6px] border-maroon rounded-[20px] px-6 xs:px-8 sm:px-16 py-4 xs:py-6 sm:py-8 flex justify-center items-center flex-grow max-w-[659px] slide-in-item">
      <p className="text-xl xs:text-[22px] sm:text-[25px] font-madimi !leading-[1.3] text-maroon text-center">
        {children}
      </p>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};
