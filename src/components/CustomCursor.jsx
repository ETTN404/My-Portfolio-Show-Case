import React, { useState, useEffect } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Expand cursor on clickable elements
      if (
        e.target.tagName.toLowerCase() === "a" ||
        e.target.tagName.toLowerCase() === "button" ||
        e.target.closest("a") ||
        e.target.closest("button") ||
        e.target.classList.contains("clickable")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out flex items-center justify-center"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div 
        className={`absolute rounded-full transition-all duration-300 ease-out flex items-center justify-center ${
          isHovering 
            ? "w-12 h-12 bg-clay-accent/20 backdrop-blur-sm border border-clay-accent/40" 
            : "w-6 h-6 bg-clay-accent/40 backdrop-blur-sm shadow-clay-raised-sm"
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className={`w-1.5 h-1.5 bg-clay-accent rounded-full transition-all duration-300 ${isHovering ? "opacity-0 scale-50" : "opacity-100 scale-100"}`} />
      </div>
    </div>
  );
}
