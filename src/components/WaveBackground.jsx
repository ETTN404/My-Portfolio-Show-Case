import React, { useMemo, useState, useEffect } from "react";

/**
 * Generates the floating 3D box mosaic background.
 * Each box is a rounded rectangle with a soft drop-shadow,
 * positioned absolutely and gently animated.
 */
export default function WaveBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define a set of boxes with varying size, position, rotation, and animation delay
  const boxes = useMemo(() => [
    // ---- Row-ish cluster: top-left ----
    { w: 90, h: 90, x: "3%", y: "2%", rot: -4, delay: 0, z: 1 },
    { w: 130, h: 130, x: "8%", y: "8%", rot: 2, delay: 0.5, z: 2 },
    { w: 60, h: 60, x: "1%", y: "18%", rot: -6, delay: 1.2, z: 1 },

    // ---- Top-center ----
    { w: 110, h: 110, x: "22%", y: "1%", rot: 3, delay: 0.3, z: 1 },
    { w: 80, h: 80, x: "30%", y: "5%", rot: -2, delay: 1.0, z: 2 },
    { w: 140, h: 140, x: "25%", y: "12%", rot: 1, delay: 0.7, z: 3 },

    // ---- Top-right ----
    { w: 100, h: 100, x: "52%", y: "0%", rot: 5, delay: 0.2, z: 1 },
    { w: 120, h: 120, x: "60%", y: "3%", rot: -3, delay: 0.9, z: 2 },
    { w: 50, h: 50, x: "72%", y: "1%", rot: 8, delay: 1.5, z: 1 },
    { w: 90, h: 90, x: "78%", y: "6%", rot: -1, delay: 0.4, z: 2 },

    // ---- Mid-left ----
    { w: 55, h: 55, x: "0%", y: "32%", rot: -5, delay: 1.1, z: 1 },
    { w: 160, h: 160, x: "5%", y: "35%", rot: 2, delay: 0.6, z: 3 },
    { w: 100, h: 100, x: "18%", y: "30%", rot: -3, delay: 0.8, z: 2 },

    // ---- Center ----
    { w: 120, h: 120, x: "38%", y: "25%", rot: 4, delay: 0.1, z: 2 },
    { w: 140, h: 140, x: "50%", y: "22%", rot: -2, delay: 0.5, z: 3 },
    { w: 70, h: 70, x: "45%", y: "35%", rot: 6, delay: 1.3, z: 1 },

    // ---- Mid-right ----
    { w: 110, h: 110, x: "70%", y: "20%", rot: -4, delay: 0.7, z: 2 },
    { w: 80, h: 80, x: "82%", y: "25%", rot: 3, delay: 1.0, z: 1 },
    { w: 130, h: 130, x: "85%", y: "15%", rot: -1, delay: 0.3, z: 3 },

    // ---- Lower-left ----
    { w: 70, h: 70, x: "2%", y: "55%", rot: 5, delay: 1.4, z: 1 },
    { w: 120, h: 120, x: "8%", y: "58%", rot: -2, delay: 0.2, z: 2 },
    { w: 150, h: 150, x: "15%", y: "52%", rot: 1, delay: 0.9, z: 3 },

    // ---- Lower-center ----
    { w: 100, h: 100, x: "35%", y: "50%", rot: -3, delay: 0.6, z: 2 },
    { w: 130, h: 130, x: "48%", y: "48%", rot: 2, delay: 1.1, z: 3 },
    { w: 60, h: 60, x: "55%", y: "56%", rot: -5, delay: 0.4, z: 1 },

    // ---- Lower-right ----
    { w: 90, h: 90, x: "72%", y: "45%", rot: 4, delay: 0.8, z: 2 },
    { w: 140, h: 140, x: "80%", y: "48%", rot: -1, delay: 0.3, z: 3 },
    { w: 50, h: 50, x: "92%", y: "52%", rot: 7, delay: 1.6, z: 1 },

    // ---- Bottom-left ----
    { w: 45, h: 45, x: "0%", y: "75%", rot: -6, delay: 1.0, z: 1 },
    { w: 110, h: 110, x: "6%", y: "78%", rot: 3, delay: 0.5, z: 2 },
    { w: 80, h: 80, x: "18%", y: "73%", rot: -2, delay: 1.3, z: 1 },

    // ---- Bottom-center ----
    { w: 130, h: 130, x: "30%", y: "72%", rot: 1, delay: 0.7, z: 3 },
    { w: 100, h: 100, x: "45%", y: "70%", rot: -4, delay: 0.2, z: 2 },
    { w: 60, h: 60, x: "52%", y: "78%", rot: 5, delay: 1.5, z: 1 },

    // ---- Bottom-right ----
    { w: 120, h: 120, x: "68%", y: "70%", rot: -3, delay: 0.9, z: 2 },
    { w: 90, h: 90, x: "78%", y: "75%", rot: 2, delay: 0.4, z: 1 },
    { w: 150, h: 150, x: "85%", y: "68%", rot: -1, delay: 0.6, z: 3 },

    // ---- Very bottom ----
    { w: 70, h: 70, x: "10%", y: "92%", rot: 4, delay: 1.2, z: 1 },
    { w: 110, h: 110, x: "35%", y: "88%", rot: -2, delay: 0.8, z: 2 },
    { w: 55, h: 55, x: "60%", y: "93%", rot: 6, delay: 1.4, z: 1 },
    { w: 100, h: 100, x: "80%", y: "90%", rot: -3, delay: 0.3, z: 2 },
  ], []);

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 will-change-transform"
      style={{ transform: `translateY(${scrollY * -0.2}px)` }}
    >
      {boxes.map((box, i) => (
        <div
          key={i}
          className="floating-box"
          style={{
            width: `${box.w}px`,
            height: `${box.h}px`,
            left: box.x,
            top: box.y,
            transform: `rotate(${box.rot}deg)`,
            animationDelay: `${box.delay}s`,
            zIndex: box.z,
          }}
        />
      ))}
      {/* Consistent Soft Frosted Glass Overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          backgroundColor: "rgba(232, 228, 222, 0.2)"
        }}
      />
    </div>
  );
}
