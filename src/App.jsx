<<<<<<< HEAD
import { useEffect } from "react";
import Home from "./pages/Home";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BountyHunterRes from "./components/BountyHunterRes";
=======
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Home from "./pages/Home";
import BountyHunterRes from "./components/BountyHunterRes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { WalletProvider } from './context/WalletContext';

// Layout wrapper component that handles background color
const DefaultLayout = ({ children }) => {
  useEffect(() => {
    // Reset background color for default layout
    document.body.style.backgroundColor = "";
    
    return () => {
      // Cleanup
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="relative">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

// BountyHunter layout with its specific background
const BountyHunterLayout = ({ children }) => {
  useEffect(() => {
    // Reset on unmount
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <>
      {/* Fixed background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url(/stonewall-backdrop.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Content with semi-transparent background */}
      <div className="relative min-h-screen z-10 bg-[#2D2C28]/90">
        {children}
      </div>
    </>
  );
};
>>>>>>> ddf59e5 (swap feature added, cleaned up bounty hunter app)

const App = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

<<<<<<< HEAD
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/bounty-hunter",
      element: <BountyHunterRes />,
=======
  // Define routes with appropriate layouts
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <DefaultLayout>
          <Home />
        </DefaultLayout>
      ),
    },
    {
      path: "/bounty-hunter",
      element: (
        <BountyHunterLayout>
          <BountyHunterRes />
        </BountyHunterLayout>
      ),
>>>>>>> ddf59e5 (swap feature added, cleaned up bounty hunter app)
    },
  ]);

  return (
<<<<<<< HEAD
    <>
      <RouterProvider router={router} />
    </>
=======
    <WalletProvider>
      <RouterProvider router={router} />
    </WalletProvider>
>>>>>>> ddf59e5 (swap feature added, cleaned up bounty hunter app)
  );
};

export default App;