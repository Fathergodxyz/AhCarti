import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const HowToBuy = () => {
  const wrapper = useRef();
  const totalCoins = 24;
  const currentDate = "December 1, 2024";

  const columnsData = [
    // First Column
    [
      { name: "CHILLGUY", link: "https://pump.fun/coin/Df6yfrKC8kZE3KNkrHERKzAetSxbrWeniQfyJY4Jpump" },
      { name: "MORTY", link: "https://pump.fun/coin/9rbVug7zTt4UPb1YuasTVUJVcaeb9JgJdJ2ejf7pump" },
      { name: "Spooderman", link: "https://pump.fun/coin/7KwizExqx1psBk5Nyc6k3NZyqBLF5NQbyZeBQutcpump" },
      { name: "CARTI", link: "https://pump.fun/coin/826HvBBEEVSATLAY2Uu2FLqbXZoujkW34wP8gL6Jpump" },
      { name: "EVILMORTY", link: "https://pump.fun/coin/7KwizExqx1psBk5Nyc6k3NZyqBLF5NQbyZeBQutcpump" },
      { name: "DREAM", link: "https://pump.fun/coin/B2Ns15i265nCN4Sb2Xr866F3NafdDAPQairAo93spump" },
      { name: "Poopy", link: "https://pump.fun/coin/AFrs1ioQvxWrGqjctJCmhvo6ydttrNa5vD2w41DUpump" },
      { name: "NYANCAT", link: "https://pump.fun/coin/7LuARTgaroSAnbV4ktHMKeGU6AXbExk67SFVQYGSpump" },
    ],
    // Second Column
    [
      { name: "Chili", link: "https://pump.fun/coin/AcNfzvF8BgA2PcjUyvHbFXuCgtrLLUdXKHgs3sWpump" },
      { name: "fade", link: "https://pump.fun/coin/7NHbnRz18vqxGcBCAp5EgREQJLzNsMTF6FXJ2fCqpump" },
      { name: "FOMO", link: "https://pump.fun/coin/84ceogXnnNdndmDMiPcTHUXeUUTPfHyavDVrmCikpump" },
      { name: "Colors", link: "https://pump.fun/coin/CmUp4DT8hjaCh7RcezXvNc2n2JdJTgsQAGtV6PS5pump" },
      { name: "KEVIN", link: "https://pump.fun/coin/2x9SndWwBU9xkWfDhse6ZBYHisK3RckuJucdiZ2Ppump" },
      { name: "GEEK", link: "https://pump.fun/coin/BbEFUJGSdDATqRscyrpSYGFN4EDhVDu8xpJpnj3Rpump" },
      { name: "PUMP", link: "https://pump.fun/coin/AcNfzvF8BgA2PcjUyvHbFXuCgtrLLUdXKHgs3sWpump" },
      { name: "Soldier", link: "https://pump.fun/coin/GGUxJxZqUDfNbnzQqdCnrEzUX7LuCA9usdAkkSfApump" },
    ],
    // Third Column
    [
      { name: "MROWL", link: "https://pump.fun/coin/98NrApd8yw88yh3sJQ6McQWiwkBXqKeb7SisEtC9pump" },
      { name: "Luigi", link: "https://pump.fun/coin/G6LAYcJf1zJ5uKjit6dESB4JcccuTzN8ZnAQgkgJpump" },
      { name: "FlappyBird", link: "https://pump.fun/coin/7DVgQAykPesn4fc62gSGvF5GuDAgWsY8nQeW2CZxpump" },
      { name: "IMPOSTER", link: "https://pump.fun/coin/81TWcNwVzsxasDsTKunLaNZp1sbDvVL9FGDnxiBopump" },
      { name: "XÆA-Xii", link: "https://pump.fun/coin/3taoZnNsPby5efuYQsUyHwkt1EAkLsZkrYuiB78zpump" },
      { name: "SIGMA", link: "https://pump.fun/coin/5SVG3T9CNQsm2kEwzbRq6hASqh1oGfjqTtLXYUibpump" },
      { name: "BBQ", link: "https://pump.fun/coin/En9b8KazNDokZr5h1BTBC5HXrjvh5DoeNa3QFYvbpump" },
    ],
  ];

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
    <div ref={wrapper} className="section-wrapper bg-[#e4e6e0] min-h-screen py-16">
      <div className="w-[90%] sm:w-[93%] max-w-[1440px] mx-auto relative min-h-screen flex flex-col">
        <div className="flex justify-between">
          <div className="flex gap-24 md:gap-32">
            {columnsData.map((column, columnIndex) => (
              <div 
                key={columnIndex} 
                className="font-madimi text-xl sm:text-2xl md:text-[28px] !leading-[1.3] slide-in-item"
              >
                {column.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <a 
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-600 transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Signature */}
          <div className="slide-in-item">
            <img 
              src="/signature.png" 
              alt="mrowl signature" 
              className="w-[600px] md:w-[700px] xl:w-[800px] object-contain"
            />
          </div>
        </div>

        {/* Bottom Text */}
        <div className="w-full flex justify-between mt-auto mb-40 font-madimi text-lg md:text-xl">
          <div className="slide-in-item">
            <div>{currentDate}</div>
            <div>{totalCoins} coins</div>
          </div>
          <div className="text-right slide-in-item">
            <div>
              <a 
                href="https://pump.fun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors duration-200"
              >
                by pump.fun
              </a>
            </div>
            <div>Carti-AHHHHHH! by mrowl.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToBuy;