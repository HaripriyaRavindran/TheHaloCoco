import React, { useRef, useState } from "react";
import HaloIntroLoader from "./components/HaloIntroLoader";
import HaloLanding from "./components/HaloLanding";
import ParallaxShowcase from "./components/ParallaxShowcase";
import RightSemicircleCarousel from "./components/RightSemicircleCarousel";

export default function App() {
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  const scrollToShop = () => {
    carouselRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLoaderFinish = () => {
    setLoading(false);
  };

  const foodItems = [
    {
      id: 1,
      title: "Coconut Bowl Bliss",
      image: "https://images.unsplash.com/photo-1565958011705-44e211f07b03?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Tropical Smoothie",
      image: "https://images.unsplash.com/photo-1612197527762-3f6b97b89c67?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Vegan Paradise",
      image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Coconut Pancake Stack",
      image: "https://images.unsplash.com/photo-1556910103-1c27a002ba9b?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="w-full h-full bg-black text-white relative overflow-x-hidden">
      {loading ? (
        <HaloIntroLoader onFinish={handleLoaderFinish} />
      ) : (
        <>
          <HaloLanding onScrollToShop={scrollToShop} />
          <ParallaxShowcase />
          <section
            ref={carouselRef}
            className="relative h-screen bg-gradient-to-b from-[#0b0b0b] via-[#111] to-black flex items-center justify-center"
          >
            <RightSemicircleCarousel items={foodItems} size={180} />
          </section>
        </>
      )}
    </div>
  );
}
