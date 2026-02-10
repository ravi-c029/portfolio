"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Terminal,
  Cpu,
  Globe,
  Play,
  Trash2,
  Satellite,
  Radio,
  Activity,
  Rocket,
} from "lucide-react";

// --- NASA / AERONAUTICS PAYLOADS ---
const snippets = {
  javascript: `// 🛰️ MISSION CONTROL: ORBITAL TRAJECTORY
console.log("INITIALIZING LAUNCH SEQUENCE...");

const flightData = {
  altitude: 400000,
  velocity: "27,600 km/h",
  status: "NOMINAL"
};

console.log("TELEMTRY CHECK: " + flightData.status);
// Calculate Thrust
const mass = 5000;
const accel = 9.8;
console.log("REQ THRUST: " + (mass * accel) + " N");`,

  python: `# 🚀 FLIGHT COMPUTER: GUIDANCE SYSTEM
import sys
import time

print("ACQUIRING TARGET LOCK...")

def calculate_burn(delta_v):
    fuel_rate = 4.5
    burn_time = delta_v / fuel_rate
    return f"BURN DURATION: {burn_time:.2f} SEC"

# Simulating Entry
print(calculate_burn(1500))
print("SYSTEM READY.")`,

  cpp: `// ⚙️ PROPULSION LOGIC MODULE (C++)
#include <iostream>

int main() {
    std::cout << "MAIN ENGINE START." << std::endl;
    
    int internal_temp = 2400;
    int max_safe_temp = 3000;
    
    if (internal_temp < max_safe_temp) {
        std::cout << "STATUS: GREEN" << std::endl;
    } else {
        std::cout << "STATUS: CRITICAL WARNING" << std::endl;
    }
    
    return 0;
}`,

  go: `// 📡 SATELLITE UPLINK (GO)
package main
import "fmt"

func main() {
    fmt.Println("CONNECTING TO DEEP SPACE NETWORK...")
    fmt.Println("SIGNAL STRENGTH: 98%")
}`,
};

const languages = [
  { name: "javascript", version: "18.15.0", icon: "⚡" },
  { name: "python", version: "3.10.0", icon: "🐍" },
  { name: "cpp", version: "10.2.0", icon: "⚙️" },
  { name: "go", version: "1.16.2", icon: "🐹" },
];

export default function StealthMode() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(languages[0]);
  const [code, setCode] = useState(snippets.javascript);
  const [logs, setLogs] = useState<string[]>(["WAITING FOR COMMAND..."]);
  const [isRunning, setIsRunning] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Toggle Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen((prev) => !prev);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Body Scroll Lock & Navbar Hide
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("stealth-active");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("stealth-active");
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Focus Logic
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const handleLangChange = (lang: (typeof languages)[0]) => {
    setActiveLang(lang);
    // @ts-ignore
    setCode(snippets[lang.name as keyof typeof snippets]);
    setLogs([`> SYSTEM SWITCHED: ${lang.name.toUpperCase()} PROTOCOL`]);
  };

  const runCode = async () => {
    setIsRunning(true);
    setLogs([]);

    // LOCAL JS RUN
    if (activeLang.name === "javascript") {
      const capturedLogs: string[] = [];
      const originalLog = console.log;
      console.log = (...args) => capturedLogs.push(args.join(" "));
      const print = (msg: any) => console.log(msg);

      try {
        setLogs(["> INTERNAL SIMULATION STARTED..."]);
        await new Promise((r) => setTimeout(r, 400));
        new Function("console", "print", code)(console, print);
        setLogs((prev) => [...prev, ...capturedLogs, "✔ SIMULATION COMPLETE"]);
      } catch (err: any) {
        setLogs((prev) => [...prev, `❌ MALFUNCTION: ${err.message}`]);
      } finally {
        console.log = originalLog;
        setIsRunning(false);
      }
      return;
    }

    // REMOTE RUN
    try {
      setLogs([
        `> 📡 UPLINKING TO ${activeLang.name.toUpperCase()} SATELLITE...`,
      ]);
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: activeLang.name,
          version: activeLang.version,
          files: [{ content: code }],
        }),
      });
      const data = await response.json();
      if (data.run) {
        const output = data.run.output
          ? data.run.output.split("\n")
          : ["(NO DATA PACKETS)"];
        setLogs((prev) => [
          ...prev,
          "> DATA RECEIVED:",
          "-----------------------",
          ...output,
        ]);
      } else {
        setLogs((prev) => [...prev, "❌ UPLINK FAILED"]);
      }
    } catch (error) {
      setLogs((prev) => [...prev, "❌ CONNECTION LOST"]);
    } finally {
      setIsRunning(false);
    }
  };

  // RENDER CODE (Syntax Highlighting)
  const renderCode = (text: string) => {
    return text.split("\n").map((line, i) => (
      // Changed min-h to match responsive line-height
      <div key={i} className="min-h-[1.5rem]">
        <span className="whitespace-pre-wrap">
          {line.split(/(\s+)/).map((word, j) => {
            if (
              [
                "const",
                "let",
                "var",
                "function",
                "return",
                "import",
                "def",
                "class",
                "if",
                "else",
              ].includes(word)
            )
              return (
                <span key={j} className="text-amber-500 font-bold">
                  {word}
                </span>
              );
            if (["print", "console.log", "cout", "fmt"].includes(word))
              return (
                <span key={j} className="text-blue-400 font-bold">
                  {word}
                </span>
              );
            if (["string", "number", "boolean", "int", "void"].includes(word))
              return (
                <span key={j} className="text-cyan-400">
                  {word}
                </span>
              );
            if (
              word.startsWith('"') ||
              word.endsWith('"') ||
              word.startsWith("'")
            )
              return (
                <span key={j} className="text-emerald-400">
                  {word}
                </span>
              );
            if (word.startsWith("//") || word.startsWith("#"))
              return (
                <span key={j} className="text-slate-500 italic">
                  {word}
                </span>
              );
            return (
              <span key={j} className="text-slate-300">
                {word}
              </span>
            );
          })}
        </span>
      </div>
    ));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          // --- NASA THEME BACKGROUND ---
          className="fixed inset-0 z-[100000] bg-[#0b0d17] font-mono text-slate-200 overflow-hidden flex flex-col"
        >
          {/* AERONAUTICS GRID BACKGROUND */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

          {/* --- TOP HUD (FLIGHT DECK) --- */}
          {/* Modified: Padding reduced for mobile */}
          <div className="relative z-10 flex items-center justify-between px-3 py-2 md:px-6 md:py-3 border-b border-slate-800 bg-[#0b0d17]/90 backdrop-blur">
            {/* LEFT: MISSION IDENTIFIER */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 border border-blue-500/50 flex items-center justify-center rounded bg-blue-500/10">
                <Rocket className="text-blue-400 w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h1 className="text-xs md:text-lg font-bold tracking-[0.2em] text-white">
                  FLIGHT_DECK_OS
                </h1>
                {/* Modified: Hidden on mobile to save space */}
                <div className="hidden sm:flex gap-4 text-[10px] text-slate-400 tracking-widest">
                  <span>LAT: 28.61° N</span>
                  <span>LNG: 77.20° E</span>
                </div>
              </div>
            </div>

            {/* CENTER: SYSTEM STATUS (Hidden on mobile) */}
            <div className="hidden md:flex gap-8">
              <div className="text-center">
                <div className="text-[9px] text-slate-500 uppercase tracking-widest">
                  ALTITUDE
                </div>
                <div className="text-blue-400 font-bold">400km</div>
              </div>
              <div className="text-center">
                <div className="text-[9px] text-slate-500 uppercase tracking-widest">
                  VELOCITY
                </div>
                <div className="text-blue-400 font-bold">7.6km/s</div>
              </div>
              <div className="text-center">
                <div className="text-[9px] text-slate-500 uppercase tracking-widest">
                  STATUS
                </div>
                <div className="text-emerald-500 font-bold animate-pulse">
                  NOMINAL
                </div>
              </div>
            </div>

            {/* RIGHT: CONTROLS */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Language Select */}
              <div className="flex items-center gap-2 border border-slate-700 bg-slate-900/50 px-2 py-1 md:px-3 md:py-1 rounded">
                <Globe size={14} className="text-slate-400" />
                <select
                  value={activeLang.name}
                  onChange={(e) =>
                    handleLangChange(
                      languages.find((l) => l.name === e.target.value) ||
                        languages[0],
                    )
                  }
                  // Modified: Smaller text and constrained width on mobile
                  className="bg-transparent text-[10px] md:text-xs text-white outline-none uppercase font-bold cursor-pointer max-w-[60px] md:max-w-none"
                >
                  {languages.map((l) => (
                    <option
                      key={l.name}
                      value={l.name}
                      className="bg-[#0b0d17]"
                    >
                      {l.icon} {l.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-red-500 transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          {/* --- MAIN COCKPIT AREA --- */}
          {/* Modified: Reduced padding/gap on mobile */}
          <div className="flex flex-1 overflow-hidden relative z-10 p-2 gap-2 md:p-6 md:gap-6">
            {/* LEFT PANEL: TELEMETRY (Sidebar) - Hidden on mobile */}
            <div className="w-56 hidden md:flex flex-col gap-4 border-r border-slate-800/50 pr-4">
              <div className="text-xs text-blue-500 font-bold tracking-widest border-b border-blue-900/30 pb-2">
                MODULES
              </div>

              <div className="p-3 bg-blue-500/10 border-l-2 border-blue-500 text-blue-100 text-xs font-bold tracking-wider flex items-center gap-3">
                <Terminal size={16} /> FLIGHT COMPUTER
              </div>
              <div className="p-3 text-slate-500 text-xs font-bold tracking-wider flex items-center gap-3 opacity-50">
                <Satellite size={16} /> COMM LINK
              </div>
              <div className="p-3 text-slate-500 text-xs font-bold tracking-wider flex items-center gap-3 opacity-50">
                <Radio size={16} /> RADAR
              </div>

              {/* Fake Radar Animation */}
              <div className="mt-auto aspect-square rounded-full border border-slate-700 relative overflow-hidden flex items-center justify-center bg-slate-900/50">
                <div
                  className="w-full h-[1px] bg-green-500/50 absolute top-1/2 left-0 animate-spin origin-center"
                  style={{ animationDuration: "4s" }}
                />
                <div className="w-1 h-1 bg-green-500 rounded-full absolute top-10 left-10 animate-pulse" />
                <div className="w-[1px] h-full bg-slate-800 absolute" />
                <div className="h-[1px] w-full bg-slate-800 absolute" />
              </div>
            </div>

            {/* CENTER: THE EDITOR */}
            <div className="flex-1 flex flex-col bg-[#0f111a] border border-slate-800 relative shadow-2xl">
              {/* Editor Header */}
              <div className="h-8 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-2 md:px-4 text-[10px] tracking-widest">
                <span className="text-blue-400 truncate max-w-[120px] md:max-w-none">
                  SOURCE: {activeLang.name.toUpperCase()}
                </span>

                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center gap-2 text-emerald-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  {isRunning ? (
                    <Activity size={12} className="animate-spin" />
                  ) : (
                    <Play size={12} fill="currentColor" />
                  )}
                  {/* Modified: Button text adapts to screen size */}
                  <span className="hidden sm:inline">
                    {isRunning ? "PROCESSING..." : "EXECUTE SEQUENCE"}
                  </span>
                  <span className="sm:hidden">{isRunning ? "..." : "RUN"}</span>
                </button>
              </div>

              {/* --- THE EDITOR CONTAINER --- */}
              <div className="flex-1 flex relative overflow-hidden">
                {/* 1. LINE NUMBERS (Left Sidebar) */}
                {/* Modified: Width and text size adjusted for mobile */}
                <div className="w-8 md:w-12 bg-[#0b0d17] border-r border-slate-800 text-right pr-2 md:pr-3 pt-4 text-slate-600 font-mono text-xs md:text-sm leading-6 select-none">
                  {code.split("\n").map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                {/* 2. CODE AREA (Relative Wrapper) */}
                <div className="flex-1 relative">
                  {/* A. TEXTAREA (Input Layer - Top) */}
                  <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    // Modified: Padding and text size adjusted for mobile
                    className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-white resize-none p-2 md:p-4 font-mono text-xs md:text-sm leading-6 outline-none z-10 whitespace-pre-wrap overflow-auto"
                    spellCheck="false"
                    autoComplete="off"
                  />

                  {/* B. SYNTAX HIGHLIGHTER (Background Layer - Bottom) */}
                  {/* Modified: Padding and text size adjusted for mobile */}
                  <div className="absolute inset-0 w-full h-full p-2 md:p-4 font-mono text-xs md:text-sm leading-6 pointer-events-none z-0 whitespace-pre-wrap overflow-hidden text-slate-300">
                    {renderCode(code)}
                  </div>
                </div>
              </div>

              {/* TERMINAL OUTPUT */}
              {/* Modified: Height adjusted for mobile */}
              <div className="h-32 md:h-40 border-t border-slate-800 bg-[#0b0d17] p-3 font-mono text-xs overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-center border-b border-slate-800 pb-1 mb-2">
                  <span className="text-amber-500 font-bold tracking-widest">
                    MISSION LOGS
                  </span>
                  <button onClick={() => setLogs([])}>
                    <Trash2
                      size={12}
                      className="text-slate-600 hover:text-red-500"
                    />
                  </button>
                </div>
                {logs.map((log, i) => (
                  <div
                    key={i}
                    className={`mb-1 ${log.includes("❌") ? "text-red-400" : log.includes("✔") ? "text-emerald-400" : "text-blue-200"}`}
                  >
                    {log}
                  </div>
                ))}
                {!isRunning && (
                  <div className="animate-pulse text-blue-500 mt-1">_</div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
