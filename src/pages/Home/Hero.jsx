import { useEffect, useRef } from "react";
import gsap from "gsap";
import Telegram from "../../components/svg/Telegram";
import Twitter from "../../components/svg/Twitter";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const logo = useRef();
  const button = useRef();
  const heading = useRef();
  const byline = useRef();
  const squares = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const socials = document.querySelectorAll(".hero-social");
    const tl = gsap.timeline({ defaults: { ease: "power2.out" }, delay: 0.25 });

    tl.fromTo(
      logo.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.75 }
    );

    tl.fromTo(
      [heading.current, byline.current, squares.current, button.current, socials],
      { yPercent: 40, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: 0.2 },
      "-=0.2"
    );
  }, []);

  return (
    <div 
      className="h-screen min-h-[800px] relative flex justify-center items-center pt-[1vw] px-[5vw]"
      style={{
        backgroundColor: '',
        backgroundImage: 'url(/rays.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="relative w-full max-w-[437px] sm:max-w-[478px] lg:max-w-[550px] 2xl:max-w-[600px]">
        <div className="relative rounded-full overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, rgba(74, 74, 74, 0.5) 0%, rgba(26, 26, 26, 0.3) 100%)',
              backdropFilter: 'blur(5px)',
            }}
          />
          
          <img
            ref={logo}
            src="/Carti-ahh.webp"
            alt="$father"
            width={550}
            height={555}
            className="w-[95%] mx-auto relative mt-1"
          />
        </div>

        <div className="absolute -right-4 -bottom-8 flex flex-col items-end">
          <h1
            ref={heading}
            className="text-white font-madimi text-[min(25px,6.66vw)] xs:text-[25px] sm:text-[28px] lg:text-[30px] 2xl:text-[35px] uppercase text-stroke-black z-10 drop-shadow-lg"
          >
            Carti-aHHHHHH!
          </h1>
          <div className="flex flex-col items-end gap-1">
            <p
              ref={byline}
              className="text-white font-madimi text-[min(16px,4vw)] xs:text-[16px] sm:text-[18px] lg:text-[20px] 2xl:text-[22px] text-stroke-black z-10 drop-shadow-lg"
            >
              by mrowl
            </p>
            <svg 
              ref={squares}
              viewBox="0 0 200 50" 
              className="w-24 h-6 mt-1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="10" y="10" width="30" height="30" fill="#000000"/>
              <rect x="50" y="10" width="30" height="30" fill="#808080"/>
              <rect x="90" y="10" width="30" height="30" fill="#C0C0C0"/>
              <rect x="130" y="10" width="30" height="30" fill="#FFFFFF"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 lg:bottom-8 left-5 lg:left-8 flex gap-3 lg:gap-4">
        <a
          href="https://t.me/CTO_Carti"
          target="_blank"
          className="hero-social hover:![scale:1.05] transition-[scale] duration-200"
        >
          <Telegram className="text-pale-gold size-[50px] lg:size-[67px]" />
        </a>

        <a
          href="https://x.com/AhCarti"
          target="_blank"
          className="hero-social hover:![scale:1.05] transition-[scale] duration-200"
        >
          <Twitter className="text-pale-gold size-[50px] lg:size-[67px]" />
        </a>
      </div>
    </div>
  );
};

export default Hero;