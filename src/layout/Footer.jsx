import { useRef } from "react";
import Telegram from "../components/svg/Telegram";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Twitter2 from "../components/svg/Twitter";

const Footer = () => {
  const wrapper = useRef();
  const image = useRef();

  useGSAP(
    () => {
      const items = wrapper.current.querySelectorAll(".slide-in-item");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper.current,
          start: "25% bottom",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        items,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.3,
          ease: "power1.inOut",
        }
      );

      tl.fromTo(
        image.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, ease: "power1.inOut", duration: 0.75 },
        "-=0.2"
      );
    },
    { dependencies: [], revertOnUpdate: true }
  );

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] transform -translate-y-[1px] z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] sm:h-[80px] md:h-[100px]"
        >
          <path
            d="M0,20
           C120,20 180,50 240,50
           C300,50 360,20 420,20
           C480,20 540,60 600,60
           C660,60 720,20 780,20
           C840,20 900,40 960,40
           C1020,40 1080,20 1140,20
           C1200,20 1260,50 1320,50
           C1380,50 1410,20 1440,20
           L1440,0 L0,0 Z"
            fill="#e4e4dc"
          />
        </svg>
      </div>

      <div
  ref={wrapper}
  className="bg-black flex flex-col justify-end items-center pt-14 xs:pt-20 lg:pt-24 pb-8 sm:pb-12 md:pb-16 lg:pb-20"
>
  <div className="text-center">
    <h2 className="uppercase text-[72px] md:text-[84px] lg:text-[100px] xl:text-[120px] 2xl:text-[181px] text-white !leading-[1.1] slide-in-item">
      SOCIALS
    </h2>

    <p className="font-madimi text-2xl md:text-[28px] lg:text-[32px] xl:text-[36px] 2xl:text-[50px] text-white max-w-[18.1em] !leading-[1.25] mt-1 slide-in-item">
    </p>
  </div>

  <div className="flex gap-4 mt-8 md:mt-10 mb-16 md:mb-20 lg:mb-24 xl:mb-28 slide-in-item">
    <a
      href="https://x.com/AhCarti"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:![scale:1.05] transition-[scale] duration-200"
    >
      <img 
        src="/twitter2.svg" 
        alt="Telegram"
        className="text-pale-gold size-[50px] lg:size-[67px]"
      />
    </a>

    <a
      href="https://t.me/CTO_Carti"
      target="_blank"
      className="hero-social hover:![scale:1.05] transition-[scale] duration-200"
    >
      <img 
        src="/telegram2.svg" 
        alt="Telegram"
        className="text-pale-gold size-[50px] lg:size-[67px]"
      />
    </a>
  </div>

  <div className="w-full flex justify-center">
    <a
      href="https://dexscreener.com/solana/8j9y2cgcicqryz9wcp387ye1rybojvxrqfuudnpfjy13"
      target="_blank"
      rel="noopener noreferrer"
      className="transform transition-transform duration-300 hover:scale-105"
    >
      <img
        ref={image}
        src="/morty.png"
        alt="father"
        className="w-full max-w-[450px] xl:max-w-[500px] 2xl:max-w-[608px] origin-bottom border-4 border-white"
      />
    </a>
  </div>
</div>
    </div>
  );
};

export default Footer;
