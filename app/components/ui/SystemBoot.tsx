"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Wifi, Zap, Globe, ShieldCheck } from "lucide-react";

export default function SystemBoot() {
  const [showBoot, setShowBoot] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIALIZING...");

  useEffect(() => {
    // Session Check (Taaki baar baar na aaye)
    const hasBooted = sessionStorage.getItem("hasBooted");
    if (hasBooted) {
      setShowBoot(false);
      return;
    }

    // Fast Loading Sequence
    const sequence = [
      { text: "ESTABLISHING UPLINK...", p: 20 },
      { text: "VERIFYING BIOMETRICS...", p: 40 },
      { text: "OPTIMIZING ASSETS...", p: 65 },
      { text: "SYNCING NEURAL NET...", p: 85 },
      { text: "ACCESS GRANTED.", p: 100 },
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i >= sequence.length) {
        clearInterval(interval);
        setTimeout(() => {
            setShowBoot(false);
            sessionStorage.setItem("hasBooted", "true");
        }, 800);
        return;
      }
      setStatus(sequence[i].text);
      setProgress(sequence[i].p);
      i++;
    }, 300); // 300ms per step = ~1.5 seconds total

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {showBoot && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }} // Fade out with blur
          transition={{ duration: 0.8 }}
          // GLASSMORPHISM BACKGROUND (Blur + Dark Overlay)
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505]/80 backdrop-blur-xl font-mono text-cyan-400"
        >
          {/* Background Grid for depth */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* --- CENTRAL ARC REACTOR (The Loader) --- */}
          <div className="relative z-10 mb-8">
            {/* Outer Spinning Ring */}
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border-t-2 border-b-2 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            />
            {/* Inner Static Core */}
            <div className="absolute inset-0 flex items-center justify-center">
                <Zap size={32} className="text-white fill-cyan-400 animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
            {/* Reverse Ring */}
            <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-l-2 border-r-2 border-dashed border-cyan-800"
            />
          </div>

          {/* --- TEXT & PROGRESS --- */}
          <div className="z-10 flex flex-col items-center gap-2">
            <h2 className="text-xl font-bold tracking-[0.3em] text-white animate-pulse">
                {progress < 100 ? "SYSTEM_BOOT" : "WELCOME"}
            </h2>
            
            <p className="text-xs text-cyan-500/80 tracking-widest uppercase min-w-[200px] text-center">
                {">"} {status}
            </p>

            {/* Progress Bar */}
            <div className="w-64 h-1 bg-cyan-900/30 rounded-full mt-4 overflow-hidden relative">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-cyan-400 shadow-[0_0_10px_currentColor]"
                />
            </div>
          </div>

          {/* --- BOTTOM STATS (Visual Noise) --- */}
          <div className="absolute bottom-10 flex gap-8 text-[9px] text-cyan-700 tracking-widest uppercase opacity-60">
             <div className="flex items-center gap-2">
                 <Cpu size={12}/> CORE_TEMP: NORMAL
             </div>
             <div className="flex items-center gap-2">
                 <ShieldCheck size={12}/> FIREWALL: ACTIVE
             </div>
             <div className="flex items-center gap-2">
                 <Globe size={12}/> UPLINK: SECURE
             </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}