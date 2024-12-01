import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ isGoalReached, onHuntClick, notFixed }) => {
  const wrapper = useRef(null);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={wrapper}
      style={{
        position: notFixed ? "relative" : "fixed",
        backgroundColor: isGoalReached ? "#e4e8e0" : isScrolled ? "#e4e8e0" : "transparent",
      }}
      className={`
        top-0 left-0 w-full z-50
        transition-all duration-300 ease-in-out
        ${isScrolled ? 'bg-[#e4e8e0]/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}
      `}
    >
      <div className={`
        flex justify-between items-center w-full px-4 md:px-6
        transition-all duration-300
        ${isScrolled || isGoalReached ? 'py-2' : 'py-4'}
      `}>
        <div 
          onClick={() => navigate("/")}
          className="cursor-pointer"
        >
          <img
            src="/carti.svg"
            alt="CARTI"
            className={`
              h-10 xs:h-12 sm:h-16 md:h-20 lg:h-24
              transition-all duration-300
              ${isScrolled || isGoalReached ? 'scale-75' : 'scale-100'}
            `}
          />
        </div>

        <div className="flex items-center gap-4">
          {!isGoalReached && (
            <div className={`
              transition-all duration-300 transform
              ${isScrolled ? 'scale-[0.9]' : 'scale-100'}
              flex items-center gap-4
            `}>
              <a
                href="https://pump.fun/coin/826HvBBEEVSATLAY2Uu2FLqbXZoujkW34wP8gL6Jpump"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  bg-[#1a1a1a] text-[#e4e8e0] border border-[#e4e8e0] cursor-pointer 
                  inline-block transform hover:scale-105 
                  transition-all duration-200 ease-in-out
                  whitespace-nowrap text-base xs:text-lg sm:text-xl
                  py-1.5 xs:py-2 md:py-2.5
                  px-3 xs:px-4 md:px-6
                  rounded-md
                  hover:bg-[#2a2a2a]
                  shadow-md
                "
              >
                Buy CARTI
              </a>
            </div>
          )}
        </div>
      </div>
      
      <div className={`
        w-full h-0.5 bg-[#e4e6e0]
        transition-all duration-300
        ${isScrolled ? 'opacity-100' : 'opacity-0'}
      `}/>
    </div>
  );
};

Header.propTypes = {
  isGoalReached: PropTypes.bool,
  onHuntClick: PropTypes.func,
  notFixed: PropTypes.bool,
};

export default Header;