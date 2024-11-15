import { useEffect } from "react";
import Home from "./pages/Home";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BountyHunter from "./components/BountyHunter";

const App = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/bounty-hunter",
      element: <BountyHunter />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
