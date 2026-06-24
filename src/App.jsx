import React, { useState } from "react";
import { projects as initialProjects } from "./projectsData";
import Hero from "./components/Hero";
import ProjectCard from "./components/ProjectCard";
import InteractiveWorkspace from "./components/InteractiveWorkspace";
import CustomDemoInjector from "./components/CustomDemoInjector";
import WaveBackground from "./components/WaveBackground";
import { Github, Linkedin, Mail, Layers, Cpu, Code2 } from "lucide-react";

export default function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // Filters projects based on selected badge
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    return project.type === activeFilter;
  });

  // Handle URL custom injector trigger
  const handleInjectCustomDemo = (url, deviceType) => {
    const customProject = {
      id: "custom-sandbox",
      title: "Virtual Sandbox Sandbox",
      type: deviceType,
      category: "Sandbox Playground",
      tagline: "Dynamic user-injected interactive live session preview",
      description: `A custom, sandboxed iframe loading directly from standard web sources: ${url}. Feel free to browse, navigate, inspect, and check responsiveness. Some sites might restrict frames (CORS protection).`,
      stack: ["HTML5 Frame", "Secure Sandbox", "Dynamic Proxy Bindings", "Responsive Mockups"],
      mockUrl: url,
      githubUrl: "https://github.com",
      accentColor: "violet"
    };

    setSelectedProject(customProject);
  };

  return (
    <div className="min-h-screen text-spine-textMain bg-spine-bg relative overflow-x-hidden flex flex-col justify-between font-sans">
      {/* Interactive HTML5 Canvas Flowing Waves */}
      <WaveBackground />

      {/* RENDER ACTIVE INTERACTIVE COCKPIT WORKSPACE */}
      {selectedProject ? (
        <InteractiveWorkspace 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      ) : (
        /* RENDER LANDING DASHBOARD */
        <>
          <div>
            {/* SpineEdge Nav Header */}
            <nav className="border-b border-spine-border/30 bg-spine-bg/50 backdrop-blur-md sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                
                {/* Brand / Logo */}
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-spine-accent flex items-center justify-center shadow-lg shadow-spine-accent/20">
                    <span className="text-spine-bg font-extrabold text-lg leading-none">S</span>
                  </div>
                  <span className="font-sans text-xl font-bold text-white tracking-tight flex items-center gap-1 select-none">
                    SpineEdge
                  </span>
                </div>

                {/* Center Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-spine-textMuted">
                  <a href="#" className="text-white flex items-center gap-1">Home <span className="text-[8px]">▼</span></a>
                  <a href="#" className="hover:text-white transition-colors">Company</a>
                  <a href="#" className="hover:text-white transition-colors">Pricing</a>
                  <a href="#" className="hover:text-white transition-colors">Blog</a>
                  <a href="#" className="hover:text-white transition-colors">Jobs</a>
                </div>

                {/* Right Action */}
                <div className="flex items-center">
                  <button className="px-5 py-2.5 rounded-lg border border-spine-border hover:bg-spine-panel hover:text-white text-spine-textMuted text-sm font-medium transition-colors">
                    Get Started
                  </button>
                </div>
              </div>
            </nav>

            {/* Hero Banner Component */}
            <Hero projectsCount={initialProjects.length} />

            {/* Main Landing Page Dashboard Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
              
              {/* Project Filter Toolbar & Header */}
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                      <Layers className="w-6 h-6 text-emerald-400" />
                      Featured Projects Directory
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base font-light max-w-xl">
                      Select a project from the catalogue below to immediately compile it inside our high-fidelity live smartphone or laptop browser simulator.
                    </p>
                  </div>

                  {/* Filter Badges */}
                  <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800/80 rounded-xl p-1 select-none self-start md:self-auto">
                    <button
                      onClick={() => setActiveFilter("all")}
                      className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                        activeFilter === "all"
                          ? "bg-slate-900 border border-slate-800 text-white shadow-md"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      Show All ({projects.length})
                    </button>
                    <button
                      onClick={() => setActiveFilter("web")}
                      className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                        activeFilter === "web"
                          ? "bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 shadow-md"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      Web Apps
                    </button>
                    <button
                      onClick={() => setActiveFilter("mobile")}
                      className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                        activeFilter === "mobile"
                          ? "bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 shadow-md"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      Mobile Apps
                    </button>
                  </div>
                </div>

                {/* Projects Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onSelect={() => setSelectedProject(project)}
                    />
                  ))}
                </div>
              </div>

              {/* Dynamic URL Sandbox Play Area Section */}
              <CustomDemoInjector onInject={handleInjectCustomDemo} />
            </main>
          </div>

          {/* Core Layout Footer */}
          <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 mt-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center md:text-left">
                <span className="font-mono text-xs font-bold text-white tracking-widest flex items-center justify-center md:justify-start gap-1.5">
                  💻 PORTFOLIO WORKSPACE
                </span>
                <p className="text-slate-500 text-xs font-mono font-light select-none">
                  Custom handcrafted using React, Tailwind CSS v3, & Lucide Icons.
                </p>
              </div>

              <div className="text-slate-600 text-[11px] font-mono select-none text-center md:text-right space-y-1">
                <p>© {new Date().getFullYear()} Handcrafted with absolute precision.</p>
                <p className="text-slate-700">Protected under sandbox iframe security boundaries.</p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}