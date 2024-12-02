import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { Check, Copy } from 'lucide-react';

const HowToBuy = () => {
  const wrapper = useRef();
  const totalCoins = 24;
  const currentDate = "December 1, 2024";
  const [copied, setCopied] = useState(false);
  const contractAddress = "826HvBBEEVSATLAY2Uu2FLqbXZoujkW34wP8gL6Jpump";

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    <div ref={wrapper} className="section-wrapper bg-[#e4e6e0] min-h-screen py-8 sm:py-16">
      <div className="w-[90%] sm:w-[93%] max-w-[1440px] mx-auto relative min-h-screen flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between">
          {/* Columns wrapper */}
          <div className="grid grid-cols-3 gap-4 sm:flex sm:gap-24 md:gap-32 mb-8 sm:mb-0">
            {columnsData.map((column, columnIndex) => (
              <div 
                key={columnIndex} 
                className="font-madimi text-base sm:text-2xl md:text-[28px] !leading-[1.3] slide-in-item"
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
          <div className="slide-in-item order-last sm:order-none mt-8 sm:mt-0">
            <img 
              src="/signature.png" 
              alt="mrowl signature" 
              className="w-full sm:w-[600px] md:w-[700px] xl:w-[800px] object-contain"
            />
          </div>
        </div>

        {/* Contract Address Box - Centered */}
        <div className="w-full sm:w-2/3 mx-auto -mb-20 sm:-mb-32 slide-in-item">
          <div 
            onClick={handleCopy}
            className="border-4 border-black p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors relative group"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-bold mb-1">CA:</p>
                <p className="text-xl sm:text-2xl font-bold font-mono break-all">{contractAddress}</p>
              </div>
              <div className="text-gray-500 ml-4">
                {copied ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <Copy className="w-6 h-6 opacity-50 group-hover:opacity-100" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="w-full flex justify-between mb-8 sm:mb-20 font-madimi text-base sm:text-lg md:text-xl">
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
  
 