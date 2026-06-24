import React from "react";
import { ChevronRight } from "lucide-react";

export default function Hero({ projectsCount }) {
  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 border-b border-spine-border/50 overflow-hidden text-center z-10 flex flex-col items-center">
      {/* Background Grids & Pulses handled in index.css body wrapper */}
      
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 p-1 pr-3 rounded-full bg-spine-panel border border-spine-border mb-8 cursor-pointer hover:border-spine-accent/30 transition-colors animate-fade-in-up">
        <span className="bg-spine-accent/10 text-spine-accent text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          New
        </span>
        <span className="text-xs text-spine-textMuted flex items-center gap-1 font-medium">
          Introducing Interactive Demos <ChevronRight className="w-3 h-3" />
        </span>
      </div>

      {/* Hero Header */}
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        Revolutionize Your Workflow with <span className="text-spine-accent">AI</span> Power
      </h1>

      <p className="mt-6 text-spine-textMuted text-lg sm:text-xl max-w-2xl font-normal leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        Harness the future of interactive development to boost productivity, creativity, and decision-making. Test drive {projectsCount} production-ready apps below.
      </p>

      {/* Hero Actions */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <button className="w-full sm:w-auto px-8 py-3.5 rounded-full btn-spine flex items-center justify-center gap-2 text-sm tracking-wide">
          Get Started Free <ChevronRight className="w-4 h-4" />
        </button>
        <button className="w-full sm:w-auto px-8 py-3.5 rounded-full btn-spine-dark flex items-center justify-center text-sm tracking-wide">
          See It In Action
        </button>
      </div>

      {/* Social Proof / Brands */}
      <div className="mt-24 pt-10 border-t border-spine-border/30 w-full max-w-5xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <p className="text-xs text-spine-textMuted font-medium mb-8">
          Trust by 99,000+ world-class brands and organizations
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1.5"><span className="text-2xl">▲</span>Vercel</span>
          <span className="font-bold text-xl tracking-tight text-white">Figma</span>
          <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1">⎔ Webflow</span>
          <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1">■ Square</span>
          <span className="font-bold text-xl tracking-tight text-white">Airbnb</span>
        </div>
      </div>
    </section>
  );
}