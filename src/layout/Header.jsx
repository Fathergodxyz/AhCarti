<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Timer from "../components/Timer";
import { TIME_OVER_MESSAGE } from "../constants/VALUES";

const Header = ({ isGoalReached, onHuntClick, notFixed }) => {
  const wrapper = useRef();

  const navigate = useNavigate();

=======
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Timer from "../components/Timer";
import SwapModal from '../components/swapmodal';
import { useWallet } from '../context/WalletContext';
import { TIME_OVER_MESSAGE } from "../constants/VALUES";

const Header = ({ isGoalReached, onHuntClick, notFixed }) => {
  const wrapper = useRef(null);
  const navigate = useNavigate();
  
>>>>>>> ddf59e5 (swap feature added, cleaned up bounty hunter app)
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { walletAddress, connectWallet, disconnectWallet } = useWallet();

  const [isTimeOver, setIsTimeOver] = useState(false);

  useEffect(() => {
    // Initial animation
    wrapper.current.style.transform = `translateY(-100%)`;
    wrapper.current.style.transition = "transform 1s ease";

    setTimeout(() => {
      wrapper.current.style.transform = "translateY(0)";
    }, 1650);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

<<<<<<< HEAD
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={wrapper}
      style={{
        position: notFixed ? "relative" : "fixed",
        backgroundColor: isGoalReached ? "#e8d2a0" : "transparent",
      }}
      className={`
         top-0 left-0 w-full z-50
        transition-all duration-300 ease-in-out
       
        ${
          isScrolled
            ? "bg-[#e8d2a0]/80 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }
      `}
    >
      <div
        className={`
        flex justify-between items-center w-full px-4 md:px-3
        transition-all duration-300
        ${isScrolled || isGoalReached ? "py-2 md:py-0" : "py-8 md:py-6 lg:py-8"}
      `}
      >
        <a onClick={() => navigate("/")} className="block">
          <div
            className={`
            ${
              isScrolled || isGoalReached
                ? "-my-2 md:-my-3 lg:-my-4 ml-0 md:ml-2"
                : "my-0 ml-2 md:ml-4"
            }
            transition-all duration-300 transform
            ${
              isScrolled || isGoalReached
                ? "scale-[0.7] md:scale-[0.6]"
                : "scale-100"
            }
          `}
          >
            <img
              src="/logo.png"
              alt="$father"
              className={`
                transition-all duration-300
                w-[180px] xs:w-[200px] sm:w-[220px] md:w-[250px] lg:w-[280px] 2xl:w-[343px]
              `}
            />
          </div>
        </a>

        {isGoalReached && !isTimeOver && (
          <div className="flex items-center gap-4" onClick={onHuntClick}>
            <Timer textColor="text-maroon" isTimeOver={setIsTimeOver} />

            <p className="text-2xl cursor-pointer bg-maroon text-[#e8d2a0] px-4 py-2 ">
              Join the hunt!
            </p>
          </div>
        )}

        {isGoalReached && isTimeOver && (
          <p className="text-2xl bg-maroon text-[#e8d2a0] px-4 py-2 ">
            {TIME_OVER_MESSAGE}
          </p>
        )}

        {!isGoalReached && (
          <div
            className={`
          ${
            isScrolled || isGoalReached
              ? "-my-2 md:-my-3 lg:-my-4 -mr-2 md:-mr-6"
              : "my-0 mr-2 md:mr-4"
          }
          transition-all duration-300 transform
          ${
            isScrolled || isGoalReached
              ? "scale-[0.7] md:scale-[0.6]"
              : "scale-100"
          }
        `}
          >
            <a
              href="https://raydium.io/swap/?outputMint=2mysC3fDxCUG4T6gBBWn35a8VkykqY1A9Hj7fkiApump&inputMint=sol"
              target="_blank"
              rel="noopener noreferrer"
              className="
              bg-maroon text-[#e8d2a0] border-4 border-[#e8d2a0] cursor-pointer 
              inline-block transform hover:scale-105 
              transition-transform duration-200 ease-in-out
              whitespace-nowrap text-lg xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl 2xl:text-[29px]
              py-2 xs:py-2.5 md:py-3 2xl:py-4
              px-4 xs:px-6 md:px-8 2xl:px-12
              rounded-md md:rounded-none
            "
            >
              Buy $Father here
            </a>
          </div>
        )}
      </div>

      <div
=======
    const checkPhantomInstallation = async () => {
      if ('phantom' in window) {
        const provider = window.phantom?.solana;
        if (provider?.isPhantom) {
          setIsPhantomInstalled(true);
          try {
            await connectWallet({ onlyIfTrusted: true });
          } catch (error) {
            console.log("Not already connected");
          }
        }
      }
    };

    checkPhantomInstallation();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [connectWallet]);

  const handleBuyClick = async () => {
    if (!isPhantomInstalled) {
      window.open('https://phantom.app/', '_blank');
    } else if (!walletAddress) {
      await connectWallet();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return (
    <>
      <div
        ref={wrapper}
        style={{
          position: notFixed ? "relative" : "fixed",
          backgroundColor: isGoalReached ? "#e8d2a0" : isScrolled ? "#e8d2a0" : "transparent",
        }}
>>>>>>> ddf59e5 (swap feature added, cleaned up bounty hunter app)
        className={`
          top-0 left-0 w-full z-50
          transition-all duration-300 ease-in-out
          ${isScrolled ? 'bg-[#e8d2a0]/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}
        `}
      >
        <div className={`
          flex justify-between items-center w-full px-4 md:px-3
          transition-all duration-300
          ${isScrolled || isGoalReached ? 'py-2 md:py-0' : 'py-8 md:py-6 lg:py-8'}
        `}>
          <a 
            onClick={() => navigate("/")}
            className="block"
          >
            <div className={`
              ${isScrolled || isGoalReached ? '-my-2 md:-my-3 lg:-my-4 ml-0 md:ml-2' : 'my-0 ml-2 md:ml-4'}
              transition-all duration-300 transform
              ${isScrolled || isGoalReached ? 'scale-[0.7] md:scale-[0.6]' : 'scale-100'}
            `}>
              <img
                src="/logo.png"
                alt="$father"
                className={`
                  transition-all duration-300
                  w-[180px] xs:w-[200px] sm:w-[220px] md:w-[250px] lg:w-[280px] 2xl:w-[343px]
                `}
              />
            </div>
          </a>

          <div className="flex items-center gap-4">
            {isGoalReached && !isTimeOver && (
              <>
                <Timer textColor="text-maroon" isTimeOver={setIsTimeOver} />
                <p 
                  className="text-2xl cursor-pointer bg-maroon text-[#e8d2a0] px-4 py-2"
                  onClick={onHuntClick}
                >
                  Join the hunt!
                </p>
              </>
            )}

            {isGoalReached && isTimeOver && (
              <p className="text-2xl bg-maroon text-[#e8d2a0] px-4 py-2">
                {TIME_OVER_MESSAGE}
              </p>
            )}

            {!isGoalReached && (
              <div className={`
                ${isScrolled ? '-my-2 md:-my-3 lg:-my-4 -mr-2 md:-mr-6' : 'my-0 mr-2 md:mr-4'}
                transition-all duration-300 transform
                ${isScrolled ? 'scale-[0.7] md:scale-[0.6]' : 'scale-100'}
                flex items-center gap-4
              `}>
                <button
                  onClick={handleBuyClick}
                  className="
                    bg-maroon text-[#e8d2a0] border-4 border-[#e8d2a0] cursor-pointer 
                    inline-block transform hover:scale-105 
                    transition-transform duration-200 ease-in-out
                    whitespace-nowrap text-lg xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl 2xl:text-[29px]
                    py-2 xs:py-2.5 md:py-3 2xl:py-4
                    px-4 xs:px-6 md:px-8 2xl:px-12
                    rounded-md md:rounded-none
                  "
                >
                  {!isPhantomInstalled ? 'Install Phantom' : walletAddress ? 'Buy $Father' : 'Connect Wallet'}
                </button>
                
                {walletAddress && (
                  <button 
                    onClick={handleDisconnect}
                    className="
                      bg-red-500 text-white px-4 py-2 rounded
                      hover:bg-red-600 transition-colors duration-200
                      text-sm md:text-base
                    "
                  >
                    Disconnect
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className={`
          w-full h-1 bg-maroon
          transition-all duration-300
<<<<<<< HEAD
          ${isScrolled ? "opacity-100" : "opacity-0"}
        `}
=======
          ${isScrolled ? 'opacity-100' : 'opacity-0'}
        `}/>
      </div>

      <SwapModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
>>>>>>> ddf59e5 (swap feature added, cleaned up bounty hunter app)
      />
    </>
  );
};

Header.propTypes = {
  isGoalReached: PropTypes.bool,
  onHuntClick: PropTypes.func,
  notFixed: PropTypes.bool,
};

<<<<<<< HEAD
export default Header;
=======
export default Header;
>>>>>>> ddf59e5 (swap feature added, cleaned up bounty hunter app)
