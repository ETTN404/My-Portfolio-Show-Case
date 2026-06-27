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
    <div className="min-h-screen flex flex-col relative animate-fade-in-up bg-transparent">
      {/* Background soft pattern */}
      <div className="absolute inset-0 clay-dots-pattern opacity-30 pointer-events-none" />

      {/* Cockpit Control Bar / Header */}
      <header className="sticky top-0 z-50 bg-clay-bg/80 backdrop-blur-xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto clay-card px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Back Action */}
          <button 
            onClick={onClose}
            className="group flex items-center gap-2 text-xs font-mono font-bold text-clay-textMuted hover:text-clay-accent transition-colors self-start sm:self-auto btn-clay px-4 py-2 rounded-clay-sm"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            BACK TO DASHBOARD
          </button>

          {/* Center Project Indicator */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-mono text-clay-textMuted select-none">
              WORKSPACE ACTIVE: 
            </span>
            <span className="text-sm font-bold text-clay-text font-mono clay-inset px-3 py-1 rounded-clay-sm">
              {project.title}
            </span>
          </div>

          {/* Simulator Device Switch Toggles */}
          <div className="flex items-center gap-1.5 clay-inset rounded-clay-sm p-1.5 w-full sm:w-auto">
            <span className="text-[10px] font-mono font-semibold text-clay-textLight uppercase px-2 select-none hidden md:inline">
              Simulate:
            </span>
            <button
              onClick={() => handleDeviceSwitch("mobile")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-clay-sm text-xs font-mono font-semibold transition-all ${
                deviceType === "mobile" 
                  ? "btn-clay-accent shadow-none text-white" 
                  : "text-clay-textMuted hover:text-clay-text btn-clay"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Phone View
            </button>
            <button
              onClick={() => handleDeviceSwitch("web")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-clay-sm text-xs font-mono font-semibold transition-all ${
                deviceType === "web" 
                  ? "btn-clay-accent shadow-none text-white" 
                  : "text-clay-textMuted hover:text-clay-text btn-clay"
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              Laptop View
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Interface Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
        
        {/* Left Interactive Device Panel */}
        <div className="lg:col-span-7 xl:col-span-8 clay-card flex items-center justify-center relative min-h-[580px] lg:min-h-0 p-4 sm:p-8">
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

        {/* Right Details Drawer Sidebar */}
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