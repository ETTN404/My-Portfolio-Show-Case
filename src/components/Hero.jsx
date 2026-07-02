import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, Github, Linkedin, Mail, MapPin, Download } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const headingRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!headingRef.current) return;
      const rect = headingRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate offset based on distance from text center (inverted for natural shadow follow)
      const x = ((e.clientX - centerX) / window.innerWidth) * -30;
      const y = ((e.clientY - centerY) / window.innerHeight) * -30;
      setMouseOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Left — Text Content */}
        <div className="flex-1 text-center lg:text-left animate-fade-in-up">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 p-1.5 pr-4 rounded-full clay-raised-sm mb-6 cursor-default">
            <span className="relative flex h-2.5 w-2.5 ml-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs text-clay-textMuted font-medium">
              Available for freelance work
            </span>
          </div>

          <h1 
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-clay-text leading-[1.1] text-depth"
            style={{ "--mx": mouseOffset.x, "--my": mouseOffset.y }}
          >
            Hi, I'm <span className="text-clay-accent text-depth-accent">Eyob</span>
            <br />
            <span className="text-clay-textMuted font-bold text-depth">Computer Scientist & Full-Stack Developer</span>
          </h1>

          <p className="mt-5 text-clay-textMuted text-base sm:text-lg max-w-lg font-normal leading-relaxed mx-auto lg:mx-0">
            A computer scientist and full-stack developer focused on building straightforward web and mobile applications using React and Flutter. Passionate about solving practical problems, working with data, and collaborating with teams to build useful projects.
          </p>

          {/* Location */}
          <div className="flex items-center gap-1.5 mt-4 justify-center lg:justify-start">
            <MapPin className="w-4 h-4 text-clay-accent" />
            <span className="text-sm text-clay-textMuted font-medium">Addis Ababa, Ethiopia</span>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
            <MagneticButton href="#projects" className="w-full sm:w-auto px-7 py-3 rounded-full btn-clay-accent flex items-center justify-center gap-2 text-sm tracking-wide clickable">
              View My Work <ChevronRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton href="#contact" className="w-full sm:w-auto px-7 py-3 rounded-full btn-clay flex items-center justify-center text-sm tracking-wide text-clay-textMuted font-semibold clickable">
              <Mail className="w-4 h-4 mr-2" /> Get In Touch
            </MagneticButton>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center gap-3 mt-8 justify-center lg:justify-start">
            <MagneticButton href="https://github.com/ETTN404" className="w-10 h-10 rounded-full btn-clay flex items-center justify-center text-clay-textMuted hover:text-clay-accent transition-colors clickable">
              <Github className="w-5 h-5 pointer-events-none" />
            </MagneticButton>
            <MagneticButton href="http://www.linkedin.com/in/eyob-taye-69219230b" className="w-10 h-10 rounded-full btn-clay flex items-center justify-center text-clay-textMuted hover:text-clay-accent transition-colors clickable">
              <Linkedin className="w-5 h-5 pointer-events-none" />
            </MagneticButton>
            <MagneticButton href="mailto:eyobtaye1210@gmail.com" className="w-10 h-10 rounded-full btn-clay flex items-center justify-center text-clay-textMuted hover:text-clay-accent transition-colors clickable">
              <Mail className="w-5 h-5 pointer-events-none" />
            </MagneticButton>
          </div>
        </div>

        {/* Right — Avatar Card */}
        {/* <div className="flex-shrink-0 animate-fade-in-up card-float-1" style={{ animationDelay: '0.2s' }}>
          <div className="clay-card p-3 rounded-[32px] w-[280px] sm:w-[320px]">
            <img
              src="/avatar.png"
              alt="Ethan — Full-Stack Developer"
              className="w-full aspect-square object-cover rounded-[24px] bg-gradient-to-b from-clay-accentSoft/30 to-clay-surface"
            />
            <div className="flex items-center justify-around mt-3 clay-inset rounded-clay-pill py-2.5 px-4">
              <div className="text-center">
                <p className="text-lg font-extrabold text-clay-text leading-none">3+</p>
                <p className="text-[10px] text-clay-textLight font-medium mt-0.5">Years Exp</p>
              </div>
              <div className="w-px h-6 bg-clay-border" />
              <div className="text-center">
                <p className="text-lg font-extrabold text-clay-text leading-none">20+</p>
                <p className="text-[10px] text-clay-textLight font-medium mt-0.5">Projects</p>
              </div>
              <div className="w-px h-6 bg-clay-border" />
              <div className="text-center">
                <p className="text-lg font-extrabold text-clay-text leading-none">10+</p>
                <p className="text-[10px] text-clay-textLight font-medium mt-0.5">Clients</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}