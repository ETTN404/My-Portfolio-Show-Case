import React, { useState, useEffect } from "react";
import { Terminal, Code, Cpu, Layers, Sparkles } from "lucide-react";

export default function Hero({ projectsCount }) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = [
    "Full-Stack Engineer",
    "UI/UX Craftsperson",
    "Flutter & React Expert",
    "Interactive System Builder"
  ];

  useEffect(() => {
    let timer = setTimeout(() => {
      handleType();
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  const handleType = () => {
    const i = loopNum % phrases.length;
    const fullPhrase = phrases[i];

    if (!isDeleting) {
      setText(fullPhrase.substring(0, text.length + 1));
      setTypingSpeed(100);

      if (text === fullPhrase) {
        // Pause at the end of writing
        setTypingSpeed(2000);
        setIsDeleting(true);
      }
    } else {
      setText(fullPhrase.substring(0, text.length - 1));
      setTypingSpeed(50);

      if (text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-900 overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-8 animate-float-slow">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          AVAILABLE FOR NEW PROJECTS & COLLABORATIONS
        </div>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Hello, I'm a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500">
                {text}
              </span>
              <span className="text-emerald-400 animate-pulse ml-1">|</span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl max-w-2xl font-normal leading-relaxed">
              I build high-performance, responsive web interfaces and cross-platform mobile experiences. This interactive workspace lets you test-drive my products live in real-time.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="p-4 rounded-xl glass-panel border border-slate-800/80">
                <div className="text-2xl font-extrabold text-white font-mono">{projectsCount}</div>
                <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Ready Demos</div>
              </div>
              <div className="p-4 rounded-xl glass-panel border border-slate-800/80">
                <div className="text-2xl font-extrabold text-emerald-400 font-mono">100%</div>
                <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Interactive</div>
              </div>
              <div className="p-4 rounded-xl glass-panel border border-slate-800/80">
                <div className="text-2xl font-extrabold text-cyan-400 font-mono">2</div>
                <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Device Simulators</div>
              </div>
              <div className="p-4 rounded-xl glass-panel border border-slate-800/80">
                <div className="text-2xl font-extrabold text-violet-400 font-mono">{"<1s"}</div>
                <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Load Speeds</div>
              </div>
            </div>
          </div>

          {/* Interactive Shell Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="w-full neon-border p-[1px] shadow-2xl overflow-hidden rounded-xl">
              <div className="rounded-xl bg-[#090d16] p-5 font-mono text-sm leading-relaxed text-slate-300">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-xs text-slate-500 flex items-center gap-1.5 select-none">
                    <Terminal className="w-3.5 h-3.5" /> main.sh
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-500"># Fetching active engineering details</p>
                  <p className="text-emerald-400">
                    <span className="text-violet-400">➜</span> ~ <span className="text-cyan-400">neofetch</span>
                  </p>
                  <div className="text-xs leading-5 text-slate-400 grid grid-cols-12 gap-2 mt-2">
                    <div className="col-span-4 text-emerald-500 font-bold select-none whitespace-pre">
                      {"   /\\_/\\\n   ( o.o )\n   > ^ <\n  /     \\\n () __ ()\n   (__)"}
                    </div>
                    <div className="col-span-8 space-y-1">
                      <p><span className="text-cyan-400">OS</span>: Developer Portfolio OS v1.0</p>
                      <p><span className="text-cyan-400">Host</span>: Interactive-Iframe-System</p>
                      <p><span className="text-cyan-400">Kernel</span>: React 18.3.1 & Tailwind</p>
                      <p><span className="text-cyan-400">Uptime</span>: 100% Client satisfaction</p>
                      <p><span className="text-cyan-400">Shell</span>: Custom Mockup Engines</p>
                      <p><span className="text-cyan-400">DE</span>: Glassmorphism / Space Dark</p>
                    </div>
                  </div>
                  <p className="text-slate-500 mt-4"># Try out the live interactive dashboard below!</p>
                  <p className="text-slate-300 flex items-center gap-1">
                    <span className="text-emerald-400 animate-pulse font-bold">{">"}</span> Initialize live workspace... <span className="text-emerald-400">READY</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}