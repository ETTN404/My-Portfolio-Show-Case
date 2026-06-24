import React, { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, onSelect }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s ease-out'
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`group relative rounded-2xl glass-panel glass-panel-hover p-6 border border-spine-border/50 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg z-10 overflow-hidden`}
      onClick={onSelect}
    >
      <div className="relative z-30 flex flex-col h-full justify-between">
        <div>
          {/* Card Header (Title) */}
          <h3 className="text-xl font-bold text-white group-hover:text-spine-accent transition-colors duration-300 mb-2">
            {project.title}
          </h3>
          
          <p className="text-spine-textMuted text-sm leading-relaxed font-normal">
            {project.tagline}
          </p>

          {/* Minimal Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-6">
            {project.stack.slice(0, 3).map((tech, idx) => (
              <span 
                key={idx} 
                className="text-xs font-medium bg-spine-bg/80 border border-spine-border text-spine-textMuted px-2.5 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Card Action footer */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-spine-border/40">
          <span className="text-spine-textMuted text-xs font-medium group-hover:text-spine-textMain transition-colors">
            Demo Available
          </span>
          <button 
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-lg btn-spine-dark group-hover:bg-spine-accent group-hover:text-spine-bg group-hover:border-transparent"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            Launch Demo
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}