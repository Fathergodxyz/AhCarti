import { useEffect, useRef } from "react";
import Telegram from "../../components/svg/Telegram";
import Twitter from "../../components/svg/Twitter";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const logo = useRef();
  const button = useRef();
  const heading = useRef();
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
      [heading.current, button.current, socials],
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
      <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] 2xl:max-w-[482px]">
        <img
          ref={logo}
          src="/logo-big.png"
          alt="$father"
          width={482}
          height={497}
          className="w-full"
        />

        <h1
          ref={heading}
          className="absolute text-white font-madimi text-[min(25px,6.66vw)] xs:text-[25px] sm:text-[28px] lg:text-[30px] 2xl:text-[35px] uppercase right-[2.5%] bottom-[-2%] text-stroke-black"
        >
          The father of Solana
        </h1>

        <a
          ref={button}
          onClick={(e) => {
            e.preventDefault();
            navigate("/bounty-hunter");
          }}
          target="_blank"
          className="bg-maroon text-pale-gold border-4 border-pale-gold text-2xl lg:text-[30px] 2xl:text-[38px] leading-[1.25] py-2.5 lg:py-3 px-6 lg:px-8 absolute rotate-[3.02deg] left-[2%] xs:left-[6%] bottom-[-28%] xs:bottom-[-25%] hover:![scale:1.03] transition-[scale] duration-200"
        >
          BOUNTY HUNTER
        </a>
      </div>

      <div className="absolute bottom-5 lg:bottom-8 left-5 lg:left-8 flex gap-3 lg:gap-4">
        <a
          href="https://t.me/FatherGodSol"
          target="_blank"
          className="hero-social hover:![scale:1.05] transition-[scale] duration-200"
        >
          <Telegram className="text-pale-gold size-[50px] lg:size-[67px]" />
        </a>

        <a
          href="https://x.com/realfatheronsol"
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
