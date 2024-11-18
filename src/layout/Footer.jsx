import { useRef } from "react";
import Telegram from "../components/svg/Telegram";
import Twitter from "../components/svg/Twitter";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
            fill="#000000"
          />
        </svg>
      </div>

      <div
        ref={wrapper}
        className="bg-[url(/socials-bg.png)] bg-no-repeat bg-cover bg-center flex flex-col justify-end items-center pt-14 xs:pt-20 lg:pt-24"
      >
        <div className="text-center">
          <h2 className="uppercase text-[72px] md:text-[84px] lg:text-[100px] xl:text-[120px] 2xl:text-[181px] text-maroon !leading-[1.1] slide-in-item">
            SOCIALS
          </h2>

          <p className="font-madimi text-2xl md:text-[28px] lg:text-[32px] xl:text-[36px] 2xl:text-[50px] text-maroon max-w-[18.1em] !leading-[1.25] mt-1 slide-in-item">
            Join The $father
          </p>
        </div>

        <div className="flex gap-4 mt-8 md:mt-10 slide-in-item">
          <a
            href="https://t.me/FatherGodSol"
            target="_blank"
            className="hover:![scale:1.05] transition-[scale] duration-200"
          >
            <Telegram className="size-[60px] md:size-[72px] xl:size-[90px] 2xl:size-[119px] text-white" />
          </a>

          <a
            href="https://x.com/realfatheronsol"
            target="_blank"
            className="hover:![scale:1.05] transition-[scale] duration-200"
          >
            <Twitter className="size-[60px] md:size-[72px] xl:size-[90px] 2xl:size-[119px] text-white" />
          </a>
        </div>

        <img
          ref={image}
          src="/socials-father.png"
          alt="father"
          className="w-full max-w-[450px] xl:max-w-[500px] 2xl:max-w-[608px] origin-bottom"
        />
      </div>
    </div>
  );
};

export default Footer;
