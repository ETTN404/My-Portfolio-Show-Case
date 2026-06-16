import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  Smartphone, 
  Laptop, 
  Layers, 
  Code, 
  Globe, 
  RefreshCw, 
  Maximize2 
} from "lucide-react";
import DeviceSimulator from "./DeviceSimulator";
import DetailsSidebar from "./DetailsSidebar";

export default function InteractiveWorkspace({ project, onClose }) {
  const [deviceType, setDeviceType] = useState(project.type);
  const [currentUrl, setCurrentUrl] = useState(project.mockUrl);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);

  // Trigger loading screen and update URLs when project changes
  useEffect(() => {
    setDeviceType(project.type);
    setCurrentUrl(project.mockUrl);
    setIsLoading(true);
  }, [project]);

  // Handle live device orientation container switching
  const handleDeviceSwitch = (type) => {
    if (type !== deviceType) {
      setIsLoading(true);
      setDeviceType(type);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col relative animate-fade-in-up">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      {/* Cockpit Control Bar / Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-900 px-4 py-3 sm:px-6 lg:px-8 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Back Action */}
          <button 
            onClick={onClose}
            className="group flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-emerald-400 transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            BACK TO DASHBOARD
          </button>

          {/* Center Project Indicator */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-mono text-slate-400 select-none">
              WORKSPACE ACTIVE: 
            </span>
            <span className="text-sm font-bold text-white font-mono bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg">
              {project.title}
            </span>
          </div>

          {/* Simulator Device Switch Toggles */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl p-1 w-full sm:w-auto">
            <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase px-2 select-none hidden md:inline">
              Simulate:
            </span>
            <button
              onClick={() => handleDeviceSwitch("mobile")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                deviceType === "mobile" 
                  ? "bg-[#10b981]/15 border border-emerald-500/25 text-emerald-400" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Phone View
            </button>
            <button
              onClick={() => handleDeviceSwitch("web")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                deviceType === "web" 
                  ? "bg-[#06b6d4]/15 border border-cyan-500/25 text-cyan-400" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              Laptop View
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Interface Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Interactive Device Panel (lg:col-span-7 or 8) */}
        <div className="lg:col-span-7 xl:col-span-8 rounded-2xl border border-slate-900 bg-slate-950/30 flex items-center justify-center relative overflow-hidden min-h-[580px] lg:min-h-0">
          {/* Subtle glow circle centered behind simulator */}
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#10b981]/3 blur-[100px] pointer-events-none" />
          
          <div className="w-full h-full flex items-center justify-center">
            <DeviceSimulator 
              project={project}
              deviceType={deviceType}
              currentUrl={currentUrl}
              iframeRef={iframeRef}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>

        {/* Right Details Drawer Sidebar (lg:col-span-5 or 4) */}
        <div className="lg:col-span-5 xl:col-span-4 h-full">
          <DetailsSidebar 
            project={project}
            currentUrl={currentUrl}
          />
        </div>
      </main>
    </div>
  );
}