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
        <div className="font-mono text-xs text-clay-textMuted space-y-1 clay-inset p-3 rounded-clay-sm select-text">
          <p className="text-emerald-600">📦 lib/</p>
          <p className="pl-4 text-emerald-500">📂 models/</p>
          <p className="pl-8 text-clay-textLight">📄 project_model.dart</p>
          <p className="pl-4 text-clay-accent">📂 providers / state/</p>
          <p className="pl-8 text-clay-textLight">📄 global_controller.dart</p>
          <p className="pl-4 text-violet-500">📂 views / screens/</p>
          <p className="pl-8 text-clay-textLight">📄 dashboard_screen.dart</p>
          <p className="pl-8 text-clay-textLight">📄 details_drawer.dart</p>
          <p className="pl-4 text-amber-600">📂 services/</p>
          <p className="pl-8 text-clay-textLight">📄 firebase_auth.dart</p>
          <p className="pl-8 text-clay-textLight">📄 local_cache_hive.dart</p>
          <p className="text-clay-textMuted">📄 main.dart</p>
        </div>
      );
    } else {
      return (
        <div className="font-mono text-xs text-clay-textMuted space-y-1 clay-inset p-3 rounded-clay-sm select-text">
          <p className="text-clay-accent">📦 src/</p>
          <p className="pl-4 text-emerald-600">📂 components/</p>
          <p className="pl-8 text-clay-textLight">📄 InteractiveCanvas.jsx</p>
          <p className="pl-8 text-clay-textLight">📄 SidebarControl.jsx</p>
          <p className="pl-4 text-clay-accent">📂 hooks / store/</p>
          <p className="pl-8 text-clay-textLight">📄 useTokenStore.js</p>
          <p className="pl-4 text-violet-500">📂 assets / styles/</p>
          <p className="pl-8 text-clay-textLight">📄 index.css</p>
          <p className="pl-4 text-clay-textLight">📄 App.jsx</p>
          <p className="text-clay-textMuted">📄 main.jsx</p>
          <p className="text-clay-textLight">📄 tailwind.config.js</p>
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
    <div className="clay-card p-5 flex flex-col h-full select-none">
      
      {/* Category header */}
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-gentle-pulse" />
        <span className="text-[10px] font-mono tracking-widest text-clay-accent uppercase font-bold">
          Workspace Directory
        </span>
      </div>

      {/* Title & Tagline */}
      <h2 className="text-2xl font-extrabold text-clay-text leading-tight">
        {project.title}
      </h2>
      <p className="text-clay-textMuted text-xs mt-1.5 italic font-light leading-snug">
        "{project.tagline}"
      </p>

      {/* Tabs */}
      <div className="flex items-center gap-1 clay-inset p-1.5 rounded-clay-sm mt-4">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 flex items-center justify-center gap-1 text-[11px] font-mono py-2 rounded-[10px] transition-all ${
            activeTab === "overview" 
              ? "btn-clay-accent shadow-none text-white" 
              : "text-clay-textMuted hover:text-clay-text"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Overview
        </button>
        <button
          onClick={() => setActiveTab("architecture")}
          className={`flex-1 flex items-center justify-center gap-1 text-[11px] font-mono py-2 rounded-[10px] transition-all ${
            activeTab === "architecture" 
              ? "btn-clay-accent shadow-none text-white" 
              : "text-clay-textMuted hover:text-clay-text"
          }`}
        >
          <FolderTree className="w-3.5 h-3.5" /> Structure
        </button>
        <button
          onClick={() => setActiveTab("devnotes")}
          className={`flex-1 flex items-center justify-center gap-1 text-[11px] font-mono py-2 rounded-[10px] transition-all ${
            activeTab === "devnotes" 
              ? "btn-clay-accent shadow-none text-white" 
              : "text-clay-textMuted hover:text-clay-text"
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
              <h4 className="text-xs font-mono text-clay-textLight uppercase font-semibold">Project Description</h4>
              <p className="text-clay-text text-sm leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* Tech Stack used */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono text-clay-textLight uppercase font-semibold">Tech Stack Used</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="clay-pill text-[11px] py-1 px-2.5"
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
              <h4 className="text-xs font-mono text-clay-textLight uppercase font-semibold flex items-center gap-1">
                <FolderTree className="w-3.5 h-3.5 text-clay-accent" /> Folder Hierarchy
              </h4>
              <span className="text-[10px] font-mono text-clay-textLight clay-inset px-2 py-0.5 rounded-clay-sm">Modular SPA</span>
            </div>
            {getArchitectureTree()}
            <p className="text-[11px] text-clay-textLight font-mono italic leading-normal">
              Folder structures replicate industry production standards, leveraging absolute path bindings.
            </p>
          </div>
        )}

        {activeTab === "devnotes" && (
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-clay-textLight uppercase font-semibold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-clay-accent" /> Engineering Ledger
            </h4>
            
            <div className="clay-inset rounded-clay-sm p-4 space-y-3">
              <div>
                <p className="text-xs font-mono font-bold text-clay-accent uppercase tracking-wider">The Challenge</p>
                <p className="text-sm text-clay-text font-light mt-1 leading-normal">
                  {projectNotes.challenge}
                </p>
              </div>
              <div className="pt-2 border-t border-clay-border">
                <p className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider">The Engineering Solution</p>
                <p className="text-sm text-clay-text font-light mt-1 leading-normal">
                  {projectNotes.solution}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Footer with Action Links */}
      <div className="mt-6 pt-4 border-t border-clay-border space-y-3">
        {/* GitHub Link Button */}
        <a 
          href={project.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-clay-sm btn-clay text-clay-textMuted font-mono text-xs font-semibold transition-all duration-200"
        >
          <Github className="w-4 h-4" />
          Inspect GitHub Repository
        </a>

        {/* Launch in New Tab Button */}
        <a 
          href={currentUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-clay-sm btn-clay-accent font-mono text-xs font-bold transition-all duration-200"
        >
          <ExternalLink className="w-4 h-4" />
          Launch Live App ↗
        </a>
      </div>
    </div>
  );
}