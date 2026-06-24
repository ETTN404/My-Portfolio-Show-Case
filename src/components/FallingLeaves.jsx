import React, { useState, useEffect, useCallback } from 'react';

// Different leaf SVG paths for variety
const leafShapes = [
  "M10,0 C20,10 20,20 10,30 C0,20 0,10 10,0 Z", // Basic leaf
  "M10,0 C15,5 20,15 10,25 C0,15 5,5 10,0 Z", // Slender leaf
  "M15,0 C25,15 15,30 5,20 C-5,10 5,0 15,0 Z", // Curved leaf
];

const FallingLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  const handleMouseMove = useCallback((e) => {
    // Only spawn a leaf occasionally to prevent performance issues
    if (Math.random() > 0.15) return;

    const newLeaf = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      shape: leafShapes[Math.floor(Math.random() * leafShapes.length)],
      rotation: Math.random() * 360,
      scale: 0.3 + Math.random() * 0.5,
    };

    setLeaves((prev) => [...prev, newLeaf]);

    // Remove the leaf after animation completes
    setTimeout(() => {
      setLeaves((prev) => prev.filter((leaf) => leaf.id !== newLeaf.id));
    }, 2000);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {leaves.map((leaf) => (
        <svg
          key={leaf.id}
          className="leaf-particle absolute"
          style={{
            left: leaf.x,
            top: leaf.y,
            transform: `rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
            fill: '#83B896', // flora.accent
            opacity: 0.6,
          }}
          width="24"
          height="32"
          viewBox="0 0 24 32"
        >
          <path d={leaf.shape} />
        </svg>
      ))}
    </div>
  );
};

export default FallingLeaves;
