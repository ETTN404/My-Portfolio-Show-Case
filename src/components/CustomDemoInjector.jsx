import React, { useState } from "react";
import { Link2, Smartphone, Laptop, Sparkles, HelpCircle } from "lucide-react";

export default function CustomDemoInjector({ onInject }) {
  const [url, setUrl] = useState("");
  const [deviceType, setDeviceType] = useState("web");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please input a valid deployment URL.");
      return;
    }

    // Clean and validate the URL input
    let cleanUrl = url.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = `https://${cleanUrl}`;
    }

    try {
      new URL(cleanUrl);
    } catch (_) {
      setError("Invalid URL format. Please enter a valid address.");
      return;
    }

    // Call the injection trigger
    onInject(cleanUrl, deviceType);
  };

  return (
    <div className="relative clay-card p-6 mt-12 overflow-hidden">
      {/* Background subtle dots */}
      <div className="absolute inset-0 clay-dots-pattern opacity-20 rounded-clay pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
        <div className="space-y-2 max-w-md">
          <div className="inline-flex items-center gap-1.5 clay-pill text-[10px] text-clay-accent font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> Device Sandbox Playground
          </div>
          <h3 className="text-xl font-extrabold text-clay-text">
            Test Your Own Deployment Link Live
          </h3>
          <p className="text-clay-textMuted text-sm font-light leading-relaxed">
            Want to see how your own live web or mobile compilation looks inside our device simulators? Paste any HTTPS deployment URL below!
          </p>
        </div>

        {/* Form panel */}
        <form onSubmit={handleSubmit} className="flex-1 w-full max-w-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            {/* Input field */}
            <div className="relative flex-1">
              <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-clay-textLight" />
              <input
                type="text"
                placeholder="https://your-portfolio-app.vercel.app"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                className="w-full clay-input pl-10 pr-4 font-mono text-sm"
              />
            </div>

            {/* Device Selector */}
            <div className="flex clay-inset rounded-clay-sm p-1 self-stretch sm:self-auto">
              <button
                type="button"
                onClick={() => setDeviceType("mobile")}
                className={`px-3 py-2 rounded-[10px] flex items-center gap-1.5 text-xs font-mono font-semibold transition-all ${
                  deviceType === "mobile"
                    ? "btn-clay-accent shadow-none text-white"
                    : "text-clay-textMuted hover:text-clay-text"
                }`}
                title="Simulate Smartphone View"
              >
                <Smartphone className="w-4 h-4" />
                Phone
              </button>
              <button
                type="button"
                onClick={() => setDeviceType("web")}
                className={`px-3 py-2 rounded-[10px] flex items-center gap-1.5 text-xs font-mono font-semibold transition-all ${
                  deviceType === "web"
                    ? "btn-clay-accent shadow-none text-white"
                    : "text-clay-textMuted hover:text-clay-text"
                }`}
                title="Simulate Laptop View"
              >
                <Laptop className="w-4 h-4" />
                Laptop
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {error ? (
              <span className="text-xs font-mono text-rose-500 font-semibold">{error}</span>
            ) : (
              <span className="text-[11px] font-mono text-clay-textLight flex items-center gap-1 leading-none select-none">
                <HelpCircle className="w-3.5 h-3.5 text-clay-textLight flex-shrink-0" />
                Some third-party sites restrict iframe embeds (CORS policies).
              </span>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-clay-sm btn-clay-accent text-white text-xs font-mono font-bold transition-all duration-300 focus:outline-none"
            >
              Inject Link & Spawn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}