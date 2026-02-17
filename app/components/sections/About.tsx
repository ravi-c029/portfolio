"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, Activity, Terminal, Database } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    // IMPROVEMENT: Adjusted padding for mobile (py-20 instead of py-32)
    <section
      id="about"
      className="relative py-20 md:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* --- BACKGROUND FX: Tactical Grid --- */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* IMPROVEMENT: Reduced gap on mobile (gap-12) */}
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* --- LEFT: The Data Stream (Text) --- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative text-center lg:text-left" // IMPROVEMENT: Center text on mobile, left on desktop
        >
          {/* Decorative HUD Header */}
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 text-cyan-500/80 font-mono text-xs tracking-[0.2em]">
            <Activity size={14} className="animate-pulse" />
            <span>// portfolio: RAVI_KUMAR</span>
            <span className="w-8 md:w-12 h-[1px] bg-cyan-500/50" />
          </div>

          {/* IMPROVEMENT: Responsive font sizes for headings */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-8 leading-tight md:leading-none">
            ABOUT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
              MYSELF
            </span>
          </h2>

          <div className="text-slate-300 space-y-6 text-base sm:text-lg leading-relaxed border-l-2 border-white/10 pl-6 relative text-left mx-auto max-w-2xl lg:mx-0">
            {/* The Animated "Scanner" on the left border */}
            <motion.div
              animate={{
                height: ["0%", "100%", "0%"],
                top: ["0%", "0%", "100%"],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-[-2px] w-[2px] bg-cyan-400 shadow-[0_0_10px_cyan]"
            />

            <p>
              <span className="text-cyan-400 font-mono text-sm">
                [IDENTITY]:
              </span>{" "}
              <strong className="text-white">
                CSDA Undergrad @ IIT PATNA.
              </strong>
            </p>
            <p>
              I'm a Computer Science & Data Analytics undergraduate student at
              IIT Patna (CPI: 9.53). Focused on AI, machine learning, and
              full-stack development. Building scalable, data-driven, and
              user-centric software solutions.{" "}
              <strong className="text-white"></strong>
            </p>
            <p>
              I don’t just write code:{" "}
              <strong>I build solutions that matter.</strong>. I build
              applications that feel less like websites and more like extensions
              of the user's mind.
            </p>
          </div>

          {/* Sci-Fi Stats Row */}
          {/* IMPROVEMENT: Centered stats on mobile */}
          <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 backdrop-blur-sm w-full sm:w-auto">
              <Cpu className="text-cyan-400 shrink-0" size={20} />
              <div className="text-left">
                <div className="text-[10px] font-mono text-cyan-400/70">
                  CORE LOGIC
                </div>
                <div className="text-sm font-bold text-cyan-100">
                  Algorithmic Thinking & System Design
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-purple-950/30 border border-purple-500/20 backdrop-blur-sm w-full sm:w-auto">
              <Zap className="text-purple-400 shrink-0" size={20} />
              <div className="text-left">
                <div className="text-[10px] font-mono text-purple-400/70">
                  LATENCY
                </div>
                <div className="text-sm font-bold text-purple-100">
                  Real-time Execution
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT: The Holographic ID Card --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center perspective-1000 mt-8 lg:mt-0"
        >
          {/* IMPROVEMENT: Width full on mobile */}
          <div className="relative w-full max-w-[340px] sm:max-w-md bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl group">
            {/* 1. The Scanning Laser Animation */}
            <motion.div
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-cyan-400/50 shadow-[0_0_20px_cyan] z-20"
            />

            {/* 2. Top Bar */}
            <div className="h-10 border-b border-white/10 bg-black/20 flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                USER_PROFILE.json
              </div>
            </div>

            {/* 3. The Content Area */}
            <div className="p-6 sm:p-8 font-mono text-sm space-y-6 relative">
              {/* Background Noise Texture */}
              <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 pointer-events-none" />

              {/* --- NEW: Hexagonal Profile Image --- */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-6 group/image">
                <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full group-hover/image:blur-xl transition-all" />
                <div className="relative h-full w-full overflow-hidden [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)] bg-slate-900/50 border-2 border-cyan-500/50">
                  <Image
                    src="/about.jpeg"
                    alt="Ravi Kumar"
                    fill
                    className="w-full"
                  />
                </div>
                {/* Hexagon Border Overlay */}
                <div className="absolute inset-0 [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)] border-2 border-cyan-400/30 pointer-events-none shadow-[inset_0_0_20px_rgba(0,255,255,0.2)]" />
              </div>

              <div className="flex justify-between border-b border-dashed border-white/10 pb-4 text-xs sm:text-sm">
                <span className="text-slate-400">Class</span>
                <span className="text-cyan-300">CS Student</span>
              </div>

              <div className="flex justify-between border-b border-dashed border-white/10 pb-4 text-xs sm:text-sm">
                <span className="text-slate-400">College</span>
                <span className="text-purple-300">
                  Indian Institute of Technology Patna
                </span>
              </div>

              <div className="flex-1 flex flex-col gap-2 mb-16 overflow-hidden">
                <span className="text-slate-400 block text-[10px] uppercase tracking-widest font-semibold mb-1">
                  Primary Directives
                </span>

                <div className="flex flex-col gap-1.5 text-xs sm:text-sm font-medium">
                  <div className="flex items-center gap-2 text-green-400/90">
                    <Terminal size={14} /> <span>Full Stack Engineering</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400/90">
                    <Database size={14} /> <span>Scalable Architecture</span>
                  </div>
                  <div className="flex items-center gap-2 text-pink-400/90">
                    <Activity size={14} /> <span>Machine Learning & AI</span>
                  </div>
                </div>
              </div>

              {/* Bottom Status Block */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500">
                    CURRENT STATUS
                  </span>
                  <span className="text-xs text-green-400 animate-pulse">
                    ● Open to Internships & Projects
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold opacity-10">
                  01
                </div>
              </div>
            </div>
          </div>

          {/* Floating Decor behind the card */}
          <div className="absolute -z-10 -right-10 -bottom-10 w-40 h-40 bg-cyan-500/20 blur-[80px] rounded-full animate-pulse" />
          <div className="absolute -z-10 -left-10 -top-10 w-40 h-40 bg-purple-500/20 blur-[80px] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
