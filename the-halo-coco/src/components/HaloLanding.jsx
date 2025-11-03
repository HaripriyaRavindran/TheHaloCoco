import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HaloLanding({ onScrollToShop }) {
  const textRef = useRef(null);
  const coconutRef = useRef(null);
  const bgMotionRef = useRef(null);

  useEffect(() => {
    // Scroll-triggered text fade
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      }
    );

    // Floating coconut loop
    gsap.to(coconutRef.current, {
      y: 20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Subtle moving gradient background
    gsap.to(bgMotionRef.current, {
      backgroundPosition: "400% 50%",
      duration: 30,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center bg-black text-white">
      {/* Background tropical image */}
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-fixed brightness-[0.5]"
      ></div>

      {/* Animated color gradient overlay */}
      <div
        ref={bgMotionRef}
        className="absolute inset-0 bg-gradient-to-r from-[#1e1e1e] via-[#7c3aed]/40 to-[#00bcd4]/30 bg-[length:400%_400%] mix-blend-overlay opacity-70"
      ></div>

      {/* Floating coconut */}
      <motion.div
        ref={coconutRef}
        className="absolute top-24 right-32 w-44 h-44 bg-[url('https://pngimg.com/uploads/coconut/coconut_PNG18.png')] bg-contain bg-no-repeat"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      ></motion.div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.h1
          ref={textRef}
          className="text-6xl md:text-8xl font-bold tracking-widest mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-500 animate-pulse"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          The Hālo Coco
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        >
          Wholesome, tropical flavors — born from coconuts, crafted for the soul.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onScrollToShop}
          className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full text-lg font-semibold text-black shadow-lg hover:shadow-yellow-400/60 transition"
        >
          Shop Now
        </motion.button>
      </div>
    </section>
  );
}
