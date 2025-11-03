import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxShowcase() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const leavesLeft = useRef(null);
  const leavesRight = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Parallax leaves movement
    gsap.to(leavesLeft.current, {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        scrub: true,
      },
    });

    gsap.to(leavesRight.current, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        scrub: true,
      },
    });

    // Background slow parallax
    gsap.to(bgRef.current, {
      y: 80,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        scrub: true,
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[160vh] flex flex-col justify-center items-center bg-gradient-to-b from-[#111] via-[#0a0a0a] to-black overflow-hidden"
    >
      {/* Background coconut leaves */}
      <img
        ref={leavesLeft}
        src="https://images.unsplash.com/photo-1586211354108-eb1c14310641?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387"
        className="absolute left-0 top-0 w-[400px] opacity-30 pointer-events-none"
        alt=""
      />
      <img
        ref={leavesRight}
        src="https://images.unsplash.com/photo-1586211354108-eb1c14310641?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387"
        className="absolute right-0 bottom-0 w-[400px] opacity-30 pointer-events-none"
        alt=""
      />

      {/* Parallax background coconut texture */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586211354108-eb1c14310641?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387')] opacity-20"
      ></div>

      {/* Content */}
      <motion.div
        className="z-10 text-center px-8"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6">
          Crafted by Nature
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Our coconuts are sourced from the finest tropical farms — naturally sweet, 
          sustainable, and made for pure indulgence. Taste the freshness, feel the paradise.
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black rounded-full font-semibold shadow-lg hover:shadow-yellow-400/50 transition"
        >
          Explore Our Menu
        </motion.button>
      </motion.div>
    </section>
  );
}
