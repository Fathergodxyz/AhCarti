import React, { useEffect } from "react";
import Header from "./layout/Header";
import Home from "./pages/Home";
import Footer from "./layout/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const App = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
};

export default App;
