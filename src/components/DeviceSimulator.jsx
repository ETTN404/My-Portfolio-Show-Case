import React, { useEffect, useState, useRef } from "react";
import { 
  Wifi, 
  Battery, 
  Signal, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Lock, 
  Copy, 
  Check, 
  ExternalLink,
  Laptop,
  Smartphone,
  Info
} from "lucide-react";

export default function DeviceSimulator({ 
  project, 
  deviceType, 
  currentUrl, 
  iframeRef, 
  isLoading, 
  setIsLoading 
}) {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("09:41");
  const [scale, setScale] = useState(1);
  const [laptopScale, setLaptopScale] = useState(1);
  const containerRef = useRef(null);
  const laptopRef = useRef(null);

  // Keep a digital clock updated for the mobile mockup
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReload = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const isMobile = deviceType === "mobile";
  const isMobileAppCategory = project.type === "mobile";

  useEffect(() => {
    if (!isMobileAppCategory || !isMobile || !containerRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        // Calculate scale to fit 393x852 inside the available container
        const scaleW = (width - 32) / 393;
        const scaleH = (height - 32) / 852;
        setScale(Math.min(scaleW, scaleH, 1));
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMobileAppCategory, isMobile]);

  useEffect(() => {
    if (isMobile || !laptopRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        // Base desktop resolution we want to simulate: 1280px width
        // The inner width is the laptop container's width.
        // We scale the 1280px iframe down to fit this width.
        setLaptopScale(width / 1280);
      }
    });

    observer.observe(laptopRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div className="flex flex-col items-center justify-center p-0 w-full h-full min-h-[500px] lg:min-h-[660px]">
      {isMobile ? (
        /* ================= SMARTPHONE SIMULATOR ================= */
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden">

          {/* Smartphone Container */}
          <div 
            className="phone-mockup flex flex-col relative select-none transition-all duration-500"
            style={isMobileAppCategory ? {
              width: '393px',
              height: '852px',
              transform: `scale(${scale * 0.70})`,
              transformOrigin: 'center center'
            } : {
              width: '310px',
              height: '630px',
              transform: 'scale(0.70)',
              transformOrigin: 'center center'
            }}
          >
            {/* Camera / Notch */}
            {isMobileAppCategory ? (
              <div 
                className="absolute top-3 left-1/2 -translate-x-1/2 bg-[#121212] rounded-full z-50 flex items-center justify-center text-white overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[inset_0px_0px_4px_rgba(255,255,255,0.1)]"
                style={{ 
                  width: isLoading ? '180px' : '100px', 
                  height: isLoading ? '32px' : '30px'
                }}
              >
                <div className={`flex items-center gap-2 transition-all duration-300 ${isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                  {isLoading && (
                    <>
                      <RotateCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                      <span className="text-[10px] font-mono font-semibold tracking-widest text-emerald-100">SYNCING...</span>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="phone-notch">
                <div className="phone-speaker" />
                <div className="phone-camera" />
              </div>
            )}

            {/* Virtual Status Bar */}
            <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 pt-3 pb-2 text-clay-text font-mono text-[11px] font-medium z-40 select-none pointer-events-none">
              <span>{currentTime}</span>
              <div className="flex items-center gap-1.5">
                <Signal className="w-3 h-3 text-clay-textMuted fill-clay-textMuted" />
                <Wifi className="w-3.5 h-3.5 text-clay-textMuted" />
                <div className="flex items-center gap-0.5">
                  <Battery className="w-4 h-4 text-clay-textMuted" />
                  <span className="text-[9px] text-clay-textMuted">98%</span>
                </div>
              </div>
            </div>

            {/* Simulated Mobile Browser Search Header */}
            {!isMobileAppCategory && (
              <div className="px-3 pt-10 pb-2 bg-clay-surface/90 backdrop-blur-sm z-40 flex items-center gap-2 border-b border-clay-border">
                <div className="flex-1 clay-inset px-2.5 py-1.5 text-[10px] text-clay-textMuted font-mono flex items-center justify-between overflow-hidden rounded-[10px]">
                  <span className="flex items-center gap-1 truncate max-w-[180px]">
                    <Lock className="w-2.5 h-2.5 text-emerald-500 flex-shrink-0" />
                    <span className="truncate">{currentUrl.replace("https://", "")}</span>
                  </span>
                  <button onClick={handleCopyUrl} className="hover:text-clay-text transition-colors">
                    {copied ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Copy className="w-2.5 h-2.5" />}
                  </button>
                </div>
                <button 
                  onClick={handleReload}
                  className="p-1.5 rounded-[10px] btn-clay text-clay-textMuted hover:text-clay-text transition-colors flex-shrink-0"
                >
                  <RotateCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
                </button>
              </div>
            )}

            {/* App View / Iframe Content Container */}
            <div className="flex-1 relative w-full h-full overflow-hidden bg-white">
              {/* Custom Loading State Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-clay-bg/95 flex flex-col items-center justify-center p-6 text-center z-30 transition-all duration-300">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-clay-border" />
                    <div className="absolute inset-0 rounded-full border-4 border-t-clay-accent border-r-emerald-400 animate-spin" />
                  </div>
                  <p className="text-clay-text text-sm font-mono tracking-wider font-semibold">
                    COMPILING WORKSPACE
                  </p>
                  <p className="text-clay-textLight text-[10px] font-mono mt-1.5 animate-pulse max-w-[200px]">
                    Resolving state-binders & assets...
                  </p>
                </div>
              )}

              {/* Real Live IFrame */}
              <iframe
                ref={iframeRef}
                src={currentUrl}
                title={project.title}
                className="w-full h-full border-0 rounded-b-[2rem]"
                onLoad={() => setIsLoading(false)}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
                style={{ contentVisibility: "auto" }}
              />
            </div>

            {/* Swipe Home Indicator Bar */}
            <div className="phone-home-indicator" />
          </div>
        </div>
      ) : (
        /* ================= LAPTOP / BROWSER SIMULATOR ================= */
        <div className="w-full max-w-[760px] flex flex-col items-center justify-center transition-all duration-500">
          <div className="laptop-mockup w-full select-none">
            
            {/* Browser Header / Toolbar */}
            <div className="px-4 py-3 border-b border-clay-border bg-clay-surface/80 flex items-center justify-between gap-4 select-none">
              {/* Traffic Light Dots */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="w-3 h-3 rounded-full bg-rose-400 inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block shadow-sm" />
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-1 text-clay-textLight flex-shrink-0">
                <button className="p-1 rounded-md hover:bg-clay-inset hover:text-clay-text transition-colors cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1 rounded-md hover:bg-clay-inset hover:text-clay-text transition-colors cursor-not-allowed">
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleReload}
                  className="p-1 rounded-md hover:bg-clay-inset text-clay-textMuted hover:text-clay-text transition-colors ml-1"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-clay-accent" : ""}`} />
                </button>
              </div>

              {/* Browser Search Address Bar */}
              <div className="flex-1 max-w-[420px] clay-inset px-3 py-1.5 text-xs text-clay-textMuted font-mono flex items-center justify-between gap-2 rounded-[10px]">
                <div className="flex items-center gap-1.5 truncate">
                  <Lock className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                  <span className="truncate text-clay-text">{currentUrl}</span>
                </div>
                <button 
                  onClick={handleCopyUrl} 
                  className="hover:text-clay-text transition-colors flex-shrink-0 ml-1"
                  title="Copy URL"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* External Link option */}
              <div className="flex items-center flex-shrink-0">
                <a 
                  href={currentUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-[10px] btn-clay text-clay-textMuted hover:text-clay-text transition-all duration-200 flex items-center gap-1"
                  title="Launch in New Tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Laptop Body Browser Content */}
            <div ref={laptopRef} className="w-full aspect-[16/10] relative bg-white overflow-hidden">
              {/* Loader Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-clay-bg/95 flex flex-col items-center justify-center p-8 text-center z-30 transition-all duration-300">
                  <div className="relative w-20 h-20 mb-5">
                    <div className="absolute inset-0 rounded-full border-4 border-clay-border" />
                    <div className="absolute inset-0 rounded-full border-4 border-t-clay-accent border-r-emerald-400 animate-spin" />
                  </div>
                  <h4 className="text-clay-text text-base font-mono tracking-widest font-bold">
                    INITIALIZING DEV PREVIEW
                  </h4>
                  <p className="text-clay-textMuted text-xs font-mono mt-2 max-w-[340px] leading-relaxed">
                    Spawning Chromium instance, establishing sandbox variables, and caching visual layers...
                  </p>
                  <div className="flex items-center gap-2 mt-4 clay-inset px-3 py-1.5 rounded-clay-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clay-accent opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-clay-accent" />
                    </span>
                    <span className="text-[10px] text-clay-textLight font-mono">Bypassing standard CORS bindings</span>
                  </div>
                </div>
              )}

              {/* Real Live IFrame scaled to simulate desktop */}
              <div 
                style={{
                  width: '1280px',
                  height: `${1280 * (10 / 16)}px`,
                  transform: `scale(${laptopScale})`,
                  transformOrigin: 'top left',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              >
                <iframe
                  ref={iframeRef}
                  src={currentUrl}
                  title={project.title}
                  className="w-full h-full border-0"
                  onLoad={() => setIsLoading(false)}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  loading="lazy"
                  style={{ contentVisibility: "auto" }}
                />
              </div>
            </div>
          </div>

          {/* Laptop Metal Bottom Deck Base */}
          <div className="laptop-base" />
        </div>
      )}

      {/* Touch Note */}
      <div className="flex items-center gap-1.5 mt-3 text-clay-textLight text-xs font-mono">
        <Info className="w-3.5 h-3.5 text-clay-textMuted" />
        <span>Fully interactive. Click, drag, and scroll inside the frame!</span>
      </div>
    </div>
  );
}