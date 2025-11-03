import React, { useState } from "react";

// Full-height vertical semicircle carousel (right side) with center-focused, clickable image, 5 visible cards, seamless loop, highlighting all items correctly
export default function RightSemicircleCarousel({ items = null, size = 160 }) {
  const defaultItems = Array.from({ length: 8 }).map((_, i) => ({
    id: `tmp-${i}`,
    title: `Item ${i + 1}`,
    image: `https://via.placeholder.com/400x400.png?text=${encodeURIComponent(
      "Item+" + (i + 1)
    )}`,
  }));

  const list = items && items.length ? items : defaultItems;
  const n = list.length;
  const visibleCount = 5;
  const [angle, setAngle] = useState(0);
  const [selected, setSelected] = useState(null);

  const step = (2 * Math.PI) / n;

  const handleNext = () => {
    setAngle((prev) => (prev + step) % (2 * Math.PI));
  };

  const handlePrev = () => {
    setAngle((prev) => (prev - step + 2 * Math.PI) % (2 * Math.PI));
  };

  const getLayout = () => {
    const cx = typeof window !== "undefined" ? window.innerWidth - size * 0.5 : 800;
const cy = typeof window !== "undefined" ? window.innerHeight / 2 : 400;
const r = typeof window !== "undefined" ? window.innerHeight / 2.1 : 380;
    return { cx, cy, r };
  };

  const getFocusIndex = () => {
    const { cy } = getLayout();
    let closestIndex = 0;
    let closestVal = Infinity;
    for (let i = 0; i < n; i++) {
      const y =
        cy +
        Math.sin(i * step - Math.PI / 2 + angle) * (window.innerHeight / 2.1);
      const diff = Math.abs(y - cy);
      if (diff < closestVal) {
        closestVal = diff;
        closestIndex = i;
      }
    }
    return closestIndex;
  };

  const focusIndex = getFocusIndex();

  const handleClick = (i) => {
    if (i === focusIndex) {
      setSelected(list[i]);
      alert(`You clicked on ${list[i].title}`);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-end overflow-hidden bg-black relative">
      <div className="relative w-full h-full">
        {list.map((it, i) => {
          const baseAngle = i * step - Math.PI / 2;
          const { cx, cy, r } = getLayout();
          const rotAngle = baseAngle + angle;
          const x = cx + Math.cos(rotAngle) * r;
          const y = cy + Math.sin(rotAngle) * r;

          const distance = Math.abs(y - cy);
          // Scale and blur calculation based on distance from center
          const scale = Math.max(
            0.6,
            1.6 - distance / (window.innerHeight / 2)
          );
          const opacity = Math.max(
            0.3,
            1 - distance / (window.innerHeight / 2)
          );
          const blur = distance < 1 ? "blur(0px)" : "blur(5px)";

          return (
            <div
              key={it.id}
              onClick={() => handleClick(i)}
              className={`absolute transition-all duration-500 ease-in-out rounded-xl overflow-hidden shadow-lg border-2 border-white bg-white flex items-center justify-center cursor-pointer`}
              style={{
                left: `${x - size / 2}px`,
                top: `${y - size / 2}px`,
                width: `${size}px`,
                height: `${size}px`,
                transform: `scale(${scale})`,
                opacity,
                zIndex: Math.round(opacity * 100),
                filter: blur,
                pointerEvents: "auto",
              }}
            >
              <img
                src={it.image}
                alt={it.title}
                className="object-cover w-full h-full"
              />
            </div>
          );
        })}

        {/* Controls */}
        <div
          className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-4"
          style={{ zIndex: 9999, pointerEvents: "auto" }}
        >
          <button
            onClick={handlePrev}
            className="text-black bg-white hover:bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-3xl font-bold shadow"
            aria-label="Previous"
          >
            ↑
          </button>
          <button
            onClick={handleNext}
            className="text-black bg-white hover:bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-3xl font-bold shadow"
            aria-label="Next"
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
}
