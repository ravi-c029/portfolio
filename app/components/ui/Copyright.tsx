"use client";

import { motion } from "framer-motion";

export default function Copyright() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full pt-2 pb-10 text-center overflow-hidden"> 
      {/* Reduced padding: pt-4 and pb-24 (Just enough for Floating Pill) */}

      {/* --- SCANNER LINE (Top Border) --- */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent">
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[2px]"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 relative z-10 px-4">
        
        {/* --- LEFT: COPYRIGHT --- */}
        <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase opacity-70">
           &copy; {year} RAVI_KUMAR_Keshari <span className="text-cyan-500/50 mx-1">//</span> ALL RIGHTS RESERVED
        </p>
        
        {/* --- RIGHT: TECH SPECS (Compact Pill) --- */}
        <div className="flex items-center gap-2 bg-black/20 border border-white/5 px-3 py-1 rounded-full backdrop-blur-sm">
           <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
           <p className="text-[9px] text-slate-600 font-mono">
             PWR: <span className="text-cyan-600 font-bold">NEXT.JS</span> 
             <span className="mx-1 opacity-20">|</span> 
             FUEL: <span className="text-purple-600 font-bold">Coffee</span>
           </p>
        </div>

      </div>

    </footer>
  );
}