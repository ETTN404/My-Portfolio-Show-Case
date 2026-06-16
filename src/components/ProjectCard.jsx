import React from "react";
import { Smartphone, Laptop, ArrowUpRight, Github } from "lucide-react";

export default function ProjectCard({ project, onSelect }) {
  const isMobile = project.type === "mobile";
  
  // Custom styling according to the project's accent color
  const colorSchemes = {
    emerald: {
      borderHover: "hover:border-emerald-500/40",
      glow: "group-hover:shadow-[0_0_20px_-3px_rgba(16,185,129,0.15)]",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      btnBg: "bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:shadow-emerald-500/20",
      iconColor: "text-emerald-400"
    },
    cyan: {
      borderHover: "hover:border-cyan-500/40",
      glow: "group-hover:shadow-[0_0_20px_-3px_rgba(6,182,212,0.15)]",
      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      btnBg: "bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:shadow-cyan-500/20",
      iconColor: "text-cyan-400"
    },
    violet: {
      borderHover: "hover:border-violet-500/40",
      glow: "group-hover:shadow-[0_0_20px_-3px_rgba(139,92,246,0.15)]",
      badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
      btnBg: "bg-violet-500 text-white hover:bg-violet-400 hover:shadow-violet-500/20",
      iconColor: "text-violet-400"
    }
  };

  const scheme = colorSchemes[project.accentColor] || colorSchemes.emerald;

  return (
    <div 
      className={`group relative rounded-2xl glass-panel p-6 border border-slate-800/80 transition-all duration-300 flex flex-col justify-between ${scheme.borderHover} ${scheme.glow} cursor-pointer hover:-translate-y-1.5`}
      onClick={onSelect}
    >
      {/* Sparkles / Background Accents */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent rounded-2xl pointer-events-none" />
      
      <div>
        {/* Card Header (Device badge & category) */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`p-2 rounded-lg bg-slate-900 border border-slate-800 ${scheme.iconColor}`}>
              {isMobile ? <Smartphone className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
            </span>
            <span className={`text-[10px] font-mono font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${scheme.badge}`}>
              {project.category}
            </span>
          </div>
          <span className="text-xs text-slate-600 font-mono group-hover:text-slate-400 transition-colors">
            {isMobile ? "Smartphone View" : "Desktop View"}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm mt-2 leading-relaxed font-light">
          {project.tagline}
        </p>

        {/* Tech Stack Highlights (limited for card visual) */}
        <div className="flex flex-wrap gap-1.5 mt-5">
          {project.stack.slice(0, 3).map((tech, idx) => (
            <span 
              key={idx} 
              className="text-xs font-mono bg-[#090d16] border border-slate-800 text-slate-400 px-2 py-0.5 rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="text-xs font-mono bg-slate-900 text-slate-500 px-2 py-0.5 rounded-md border border-slate-800/50">
              +{project.stack.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Card Action footer */}
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-900">
        <span className="text-slate-500 text-xs font-mono group-hover:text-slate-300 transition-colors">
          Demo: Ready
        </span>
        <button 
          className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-300 shadow-lg ${scheme.btnBg}`}
          onClick={(e) => {
            e.stopPropagation(); // Prevent card select double triggering
            onSelect();
          }}
        >
          Launch Workspace
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}