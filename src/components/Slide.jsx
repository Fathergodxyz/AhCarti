import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const Slide = ({ children }) => {
  const item = useRef();

  useGSAP(() => {
    const child = item.current.childNodes[0];

    gsap.fromTo(
      child,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: item.current,
          markers: true,
          start: "25% bottom",
          toggleActions: "play none none reset",
        },
      }
    );
  }, []);

  return <div ref={item}>{children}</div>;
};

export default Slide;
