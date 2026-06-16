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
    <div className="relative rounded-2xl glass-panel p-6 border border-slate-800/80 mt-12 bg-dots-pattern">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 rounded-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
        <div className="space-y-2 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> Device Sandbox Playground
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Test Your Own Deployment Link Live
          </h3>
          <p className="text-slate-400 text-sm font-light leading-relaxed">
            Want to see how your own live web or mobile compilation looks inside our device simulators? Paste any HTTPS deployment URL below!
          </p>
        </div>

        {/* Form panel */}
        <form onSubmit={handleSubmit} className="flex-1 w-full max-w-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            {/* Input field */}
            <div className="relative flex-1">
              <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="https://your-portfolio-app.vercel.app"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-violet-500/80 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-violet-500/50 font-mono transition-all"
              />
            </div>

            {/* Device Selector */}
            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 self-stretch sm:self-auto">
              <button
                type="button"
                onClick={() => setDeviceType("mobile")}
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 text-xs font-mono font-semibold transition-all ${
                  deviceType === "mobile"
                    ? "bg-slate-900 border border-slate-800 text-white"
                    : "text-slate-500 hover:text-slate-300"
                }`}
                title="Simulate Smartphone View"
              >
                <Smartphone className="w-4 h-4" />
                Phone
              </button>
              <button
                type="button"
                onClick={() => setDeviceType("web")}
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 text-xs font-mono font-semibold transition-all ${
                  deviceType === "web"
                    ? "bg-slate-900 border border-slate-800 text-white"
                    : "text-slate-500 hover:text-slate-300"
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
              <span className="text-xs font-mono text-rose-400 font-semibold">{error}</span>
            ) : (
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1 leading-none select-none">
                <HelpCircle className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                Some third-party sites restrict iframe embeds (CORS policies).
              </span>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-mono font-bold transition-all duration-300 shadow-lg shadow-indigo-950/20 hover:shadow-indigo-500/10 focus:outline-none"
            >
              Inject Link & Spawn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}