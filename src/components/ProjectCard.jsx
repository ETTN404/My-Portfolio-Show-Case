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
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
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
      className="group relative clay-card p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer z-10 overflow-hidden"
      onClick={onSelect}
    >
      <div className="relative z-30 flex flex-col h-full justify-between">
        <div>
          {/* Category indicator dot */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`w-2 h-2 rounded-full ${project.type === 'mobile' ? 'bg-emerald-400' : 'bg-clay-accent'}`} />
            <span className="text-[10px] font-mono font-semibold text-clay-textLight uppercase tracking-widest">
              {project.category}
            </span>
          </div>

          {/* Card Header (Title) */}
          <h3 className="text-xl font-bold text-clay-text group-hover:text-clay-accentDeep transition-colors duration-300 mb-2">
            {project.title}
          </h3>
          
          <p className="text-clay-textMuted text-sm leading-relaxed font-normal">
            {project.tagline}
          </p>

          {/* Minimal Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-5">
            {project.stack.slice(0, 3).map((tech, idx) => (
              <span 
                key={idx} 
                className="clay-pill text-[11px] py-1 px-3"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Card Action footer */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-clay-border">
          <span className="text-clay-textLight text-xs font-medium group-hover:text-clay-text transition-colors">
            Demo Available
          </span>
          <button 
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-clay-sm btn-clay group-hover:bg-clay-accent group-hover:text-white transition-all duration-300"
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