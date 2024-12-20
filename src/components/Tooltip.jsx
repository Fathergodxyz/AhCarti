import React from "react";
import PropTypes from "prop-types";

const Tooltip = ({ text, top, left, color, isAbsolute, direction }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const tooltipRef = React.useRef(null);

  React.useEffect(() => {
    if (isVisible && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();

      const tooltipWidth = 600;
      const viewportWidth = window.innerWidth;
      const rightEdge = rect.left + tooltipWidth / 2;

      if (rightEdge > viewportWidth) {
        tooltipRef.current
          .querySelector("div")
          ?.classList.add("!translate-x-[-95%]");
      }
    }
  }, [isVisible, tooltipRef]);

  return (
    <div
      ref={tooltipRef}
      className={`z-20 w-fit`}
      style={{ top, left, position: isAbsolute ? "absolute" : "relative" }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <svg
        className="cursor-pointer opacity-75"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={color}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M19 2a3 3 0 0 1 2.995 2.824l.005 .176v14a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-14a3 3 0 0 1 2.824 -2.995l.176 -.005h14zm-7 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" />
      </svg>

      {isVisible && (
        <div
          className={`p-2 text-[#17171c] border-2 text-xl bg-[#debe74] rounded shadow-lg absolute w-[600px]
            ${
              direction === "top" &&
              "-translate-x-1/2 left-1/2 bottom-full mb-2"
            }
            ${
              direction === "bottom" &&
              "-translate-x-1/2 left-1/2 top-full mt-2"
            }
            ${
              direction === "left" && "right-full mr-2 top-1/2 -translate-y-1/2"
            }
            ${
              direction === "right" && "left-full ml-2 top-1/2 -translate-y-1/2"
            }
            ${!direction && "-translate-x-1/2 left-1/2 absolute"} 
          `}
          style={{
            zIndex: 1000,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  text: PropTypes.node.isRequired,
  top: PropTypes.string,
  left: PropTypes.string,
  color: PropTypes.string,
  isAbsolute: PropTypes.bool,
  direction: PropTypes.oneOf(["top", "bottom", "left", "right"]),
};

Tooltip.defaultProps = {
  color: "#000000",
  top: "0",
  left: "0",
  isAbsolute: false,
  direction: "bottom",
};

export default Tooltip;
