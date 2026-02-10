"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Music, Clock, Wifi } from "lucide-react";

export default function LivingFooter() {
  const [data, setData] = useState<any>(null);
  const [time, setTime] = useState("");
  const [isVisible, setIsVisible] = useState(false); // Default Hidden

  // 1. Live Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/stats");
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Failed to fetch stats");
      }
    };
    fetchData();
  }, []);

  // 3. SCROLL DETECTION (The Magic Logic)
  useEffect(() => {
    const handleScroll = () => {
      // Check if user is near the bottom of the page (offset 100px)
      const isBottom = 
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      
      setIsVisible(isBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          // Change: Positioned slightly up from bottom
          className="fixed bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none"
        >
          <div className="
            /* CHANGE: Transparent Background */
            bg-black/20 backdrop-blur-sm border border-white/5 rounded-full 
            px-6 py-3 flex items-center gap-6 shadow-lg pointer-events-auto
            text-[10px] md:text-xs font-mono tracking-wide text-slate-300
          ">
            
            {/* Location & Time */}
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-cyan-500/80" />
              <div className="flex flex-col leading-none">
                <span className="font-bold text-white/90">PATNA</span>
                <span className="opacity-60">{time}</span>
              </div>
            </div>

            <div className="h-4 w-[1px] bg-white/10" />

            {/* GitHub */}
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer" 
                 onClick={() => window.open("https://github.com/ravi-c029", "_blank")}>
              <Github size={14} className="text-purple-500/80" />
              <span className="hidden sm:inline opacity-70">
                {data?.github?.lastPush ? "COMMITTED TODAY" : "GIT FETCHING..."}
              </span>
            </div>

            <div className="h-4 w-[1px] bg-white/10" />

            {/* Spotify */}
            <div className="flex items-center gap-2 min-w-[120px]">
               {data?.spotify?.isPlaying ? (
                 <>
                   <Music size={14} className="text-green-500/80 animate-pulse" />
                   <div className="flex flex-col leading-none overflow-hidden max-w-[120px]">
                     <span className="font-bold text-white/90 truncate">{data.spotify.song}</span>
                     <span className="text-[9px] truncate opacity-60">{data.spotify.artist}</span>
                   </div>
                 </>
               ) : (
                 <>
                   <Wifi size={14} className="text-green-400" />
                   <span className="opacity-80">ONLINE</span>
                 </>
               )}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}