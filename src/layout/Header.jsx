import { useEffect, useRef, useState } from "react";

const Header = () => {
  const wrapper = useRef();
  const [isScrolled, setIsScrolled] = useState(false);

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={wrapper}
      className={`
        fixed top-0 left-0 w-full z-50
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
        ${isScrolled ? "py-2 md:py-0" : "py-8 md:py-6 lg:py-8"}
      `}
      >
        <a href="#" className="block">
          <div
            className={`
            ${
              isScrolled
                ? "-my-2 md:-my-3 lg:-my-4 ml-0 md:ml-2"
                : "my-0 ml-2 md:ml-4"
            }
            transition-all duration-300 transform
            ${isScrolled ? "scale-[0.7] md:scale-[0.6]" : "scale-100"}
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

        <div
          className={`
          ${
            isScrolled
              ? "-my-2 md:-my-3 lg:-my-4 -mr-2 md:-mr-6"
              : "my-0 mr-2 md:mr-4"
          }
          transition-all duration-300 transform
          ${isScrolled ? "scale-[0.7] md:scale-[0.6]" : "scale-100"}
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
      </div>

      <div
        className={`
          w-full h-1 bg-maroon
          transition-all duration-300
          ${isScrolled ? "opacity-100" : "opacity-0"}
        `}
      />
    </div>
  );
};

export default Header;