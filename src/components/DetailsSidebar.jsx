import React, { useState } from "react";
import { 
  Github, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Settings, 
  FolderTree, 
  Cpu, 
  BookOpen, 
  Terminal 
} from "lucide-react";

export default function DetailsSidebar({ project, currentUrl }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isNotesExpanded, setIsNotesExpanded] = useState(true);

  // Simulated architecture directory structure based on project stack
  const getArchitectureTree = () => {
    if (project.type === "mobile") {
      return (
        <div className="font-mono text-xs text-slate-400 space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-900 select-text">
          <p className="text-emerald-400">📦 lib/</p>
          <p className="pl-4 text-emerald-500/80">📂 models/</p>
          <p className="pl-8 text-slate-500">📄 project_model.dart</p>
          <p className="pl-4 text-cyan-400">📂 providers / state/</p>
          <p className="pl-8 text-slate-500">📄 global_controller.dart</p>
          <p className="pl-4 text-violet-400">📂 views / screens/</p>
          <p className="pl-8 text-slate-500">📄 dashboard_screen.dart</p>
          <p className="pl-8 text-slate-500">📄 details_drawer.dart</p>
          <p className="pl-4 text-yellow-500/80">📂 services/</p>
          <p className="pl-8 text-slate-500">📄 firebase_auth.dart</p>
          <p className="pl-8 text-slate-500">📄 local_cache_hive.dart</p>
          <p className="text-slate-400">📄 main.dart</p>
        </div>
      );
    } else {
      return (
        <div className="font-mono text-xs text-slate-400 space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-900 select-text">
          <p className="text-cyan-400">📦 src/</p>
          <p className="pl-4 text-emerald-400">📂 components/</p>
          <p className="pl-8 text-slate-500">📄 InteractiveCanvas.jsx</p>
          <p className="pl-8 text-slate-500">📄 SidebarControl.jsx</p>
          <p className="pl-4 text-cyan-400">📂 hooks / store/</p>
          <p className="pl-8 text-slate-500">📄 useTokenStore.js</p>
          <p className="pl-4 text-violet-400">📂 assets / styles/</p>
          <p className="pl-8 text-slate-500">📄 index.css</p>
          <p className="pl-4 text-slate-500">📄 App.jsx</p>
          <p className="text-slate-400">📄 main.jsx</p>
          <p className="text-slate-500">📄 tailwind.config.js</p>
        </div>
      );
    }
  };

  const devNotes = {
    "taskflow-flutter": {
      challenge: "Ensuring smooth offline-to-online data synchronization in Flutter.",
      solution: "Implemented an offline state cache utilizing Hive DB. Local edits are stored instantly, with a background synchronization queue triggered on network changes using connectivity state-binders."
    },
    "aether-design-system": {
      challenge: "Managing atomic layout scaling without lag in standard React states.",
      solution: "Offloaded heavy vector token-rendering onto a Canvas API sandbox while coordinating atomic attributes through Zustand, bypassing React's virtual DOM reconciliation lag during real-time dragging."
    },
    "cryptovault-web3": {
      challenge: "Handling complex blockchain payload latency gracefully.",
      solution: "Coordinated active Ethers.js multi-calls with aggressive localStorage pricing feeds caching, displaying loading shimmer components inside each atomic card to ensure zero content jumps."
    },
    "scribeai-assistant": {
      challenge: "Managing microphone voice streaming buffer latency.",
      solution: "Developed an audio compression pipeline using Web Audio API on client-side before sending byte streams via high-performance WebSockets directly into the OpenAI Whisper transcription gateway."
    },
    "retrosynth-engine": {
      challenge: "Maintaining strict audio-sequencer BPM intervals in active browsers.",
      solution: "Utilized a specialized Web Worker clock dispatcher. This bypasses the main single-threaded JS thread, keeping beat intervals accurate within microseconds even under high rendering stress."
    },
    "devrank-visualizer": {
      challenge: "Gracefully loading massive, high-density 3D coordinate graphs.",
      solution: "Implemented hierarchical node pruning and standard distance culling inside D3's three-dimensional canvas, reducing render cycles by up to 80% for developer profiles with 1,000+ commit nodes."
    }
  };

  const projectNotes = devNotes[project.id] || {
    challenge: "Responsive layout rendering and sandboxed iframe event bindings.",
    solution: "Used custom CSS aspect ratios coupled with strict standard HTML5 sandbox bindings, establishing a highly isolated, touch-responsive playground for external deployments."
  };

  return (
    <div className="glass-panel border border-slate-800/80 rounded-2xl p-5 flex flex-col h-full bg-[#0b0f19]/90 backdrop-blur-md select-none">
      
      {/* Category header */}
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold">
          Workspace Directory
        </span>
      </div>

      {/* Title & Tagline */}
      <h2 className="text-2xl font-extrabold text-white leading-tight">
        {project.title}
      </h2>
      <p className="text-slate-400 text-xs mt-1.5 italic font-light leading-snug">
        "{project.tagline}"
      </p>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-900 mt-4">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 flex items-center justify-center gap-1 text-[11px] font-mono py-2 rounded-lg transition-all ${
            activeTab === "overview" 
              ? "bg-[#10b981]/15 border border-emerald-500/20 text-emerald-400" 
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Overview
        </button>
        <button
          onClick={() => setActiveTab("architecture")}
          className={`flex-1 flex items-center justify-center gap-1 text-[11px] font-mono py-2 rounded-lg transition-all ${
            activeTab === "architecture" 
              ? "bg-[#06b6d4]/15 border border-cyan-500/20 text-cyan-400" 
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <FolderTree className="w-3.5 h-3.5" /> Structure
        </button>
        <button
          onClick={() => setActiveTab("devnotes")}
          className={`flex-1 flex items-center justify-center gap-1 text-[11px] font-mono py-2 rounded-lg transition-all ${
            activeTab === "devnotes" 
              ? "bg-[#8b5cf6]/15 border border-violet-500/20 text-violet-400" 
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" /> Dev Notes
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto mt-5 space-y-5 pr-1 select-text">
        {activeTab === "overview" && (
          <>
            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-slate-500 uppercase font-semibold">Project Description</h4>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* Tech Stack used */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono text-slate-500 uppercase font-semibold">Tech Stack Used</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs font-mono bg-slate-950 border border-slate-900 text-slate-300 px-2.5 py-1 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "architecture" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono text-slate-500 uppercase font-semibold flex items-center gap-1">
                <FolderTree className="w-3.5 h-3.5 text-cyan-400" /> Folder Hierarchy
              </h4>
              <span className="text-[10px] font-mono text-slate-600 bg-slate-950 px-1.5 py-0.5 rounded">Modular SPA</span>
            </div>
            {getArchitectureTree()}
            <p className="text-[11px] text-slate-500 font-mono italic leading-normal">
              Folder structures replicate industry production standards, leveraging absolute path bindings.
            </p>
          </div>
        )}

        {activeTab === "devnotes" && (
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-slate-500 uppercase font-semibold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-violet-400" /> Engineering Ledger
            </h4>
            
            <div className="rounded-xl border border-violet-500/10 bg-violet-500/5 p-4 space-y-3">
              <div>
                <p className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider">The Challenge</p>
                <p className="text-sm text-slate-300 font-light mt-1 leading-normal">
                  {projectNotes.challenge}
                </p>
              </div>
              <div className="pt-2 border-t border-violet-500/10">
                <p className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">The Engineering Solution</p>
                <p className="text-sm text-slate-300 font-light mt-1 leading-normal">
                  {projectNotes.solution}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Footer with Action Links */}
      <div className="mt-6 pt-4 border-t border-slate-900 space-y-3">
        {/* GitHub Link Button */}
        <a 
          href={project.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 font-mono text-xs font-semibold transition-all duration-200 shadow-md"
        >
          <Github className="w-4 h-4 text-slate-400" />
          Inspect GitHub Repository
        </a>

        {/* Launch in New Tab Button */}
        <a 
          href={currentUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 font-mono text-xs font-bold transition-all duration-200 shadow-lg"
        >
          <ExternalLink className="w-4 h-4" />
          Launch Live App ↗
        </a>
      </div>
    </div>
  );
}