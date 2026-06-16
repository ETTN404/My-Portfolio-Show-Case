import React, { useState } from "react";
import { projects as initialProjects } from "./projectsData";
import Hero from "./components/Hero";
import ProjectCard from "./components/ProjectCard";
import InteractiveWorkspace from "./components/InteractiveWorkspace";
import CustomDemoInjector from "./components/CustomDemoInjector";
import { Github, Linkedin, Mail, Layers, Cpu, Code2 } from "lucide-react";

export default function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

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
    <div className="min-h-screen text-slate-100 bg-[#030712] relative overflow-x-hidden flex flex-col justify-between">
      {/* Background decoration - Ambient glows */}
      <div className="absolute inset-0 dots-bg opacity-15 pointer-events-none" />

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
            {/* Nav Header */}
            <nav className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                
                {/* Brand / Logo */}
                <div className="flex items-center gap-2.5 cursor-pointer">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/10">
                    <Code2 className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                  </div>
                  <span className="font-mono text-base font-extrabold text-white tracking-wider flex items-center gap-1.5 select-none">
                    DEV<span className="text-emerald-400">WORKSPACE</span>
                  </span>
                </div>

                {/* Right contacts / actions */}
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                    SYSTEM STABILITY: ONLINE
                  </div>
                  <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-all"
                      title="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-all"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a 
                      href="mailto:contact@developer.com" 
                      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-all"
                      title="Email Contact"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
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