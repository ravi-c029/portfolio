// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Scan,
//   Key,
//   ShieldAlert,
//   Cpu,
//   Lock,
//   Orbit,
//   ChevronRight,
// } from "lucide-react";
// import Particles from "react-tsparticles";
// import { loadSlim } from "tsparticles-slim";
// import type { Engine } from "tsparticles-engine";
// import useSound from "use-sound";

// // Particle Config for "Aerospace Data Stream" look
// const particlesOptions: any = {
//   background: { color: { value: "#000000" } },
//   fpsLimit: 120,
//   interactivity: {
//     events: { onHover: { enable: true, mode: "grab" }, resize: true },
//     modes: { grab: { distance: 140, links: { opacity: 1 } } },
//   },
//   particles: {
//     color: { value: "#06b6d4" },
//     links: {
//       color: "#06b6d4",
//       distance: 150,
//       enable: true,
//       opacity: 0.2,
//       width: 1,
//     },
//     move: {
//       direction: "none",
//       enable: true,
//       outModes: { default: "bounce" },
//       random: false,
//       speed: 1,
//       straight: false,
//     },
//     number: { density: { enable: true, area: 800 }, value: 80 },
//     opacity: { value: 0.5 },
//     shape: { type: "circle" },
//     size: { value: { min: 1, max: 3 } },
//   },
//   detectRetina: true,
// };

// export default function AdminLogin() {
//   const [loginMethod, setLoginMethod] = useState<"qr" | "pass">("qr");
//   const [scanProgress, setScanProgress] = useState(0);
//   const [password, setPassword] = useState("");
//   const [status, setStatus] = useState<
//     "idle" | "scanning" | "success" | "error" | "denied"
//   >("idle");
//   const router = useRouter();

//   // --- SOUND FX SETUP (Make sure files exist in public/sounds/) ---
//   const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.5 });
//   const [playScan, { stop: stopScan }] = useSound("/sounds/scan.mp3", {
//     volume: 0.3,
//     loop: true,
//   });
//   const [playDenied] = useSound("/sounds/denied.mp3", { volume: 0.7 });
//   const [playGranted] = useSound("/sounds/granted.mp3", { volume: 0.7 });

//   const particlesInit = useCallback(async (engine: Engine) => {
//     await loadSlim(engine);
//   }, []);

//   // QR Trap Logic with Sound
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (loginMethod === "qr" && status === "scanning") {
//       playScan();
//       interval = setInterval(() => {
//         setScanProgress((prev) => {
//           if (prev >= 100) {
//             clearInterval(interval);
//             stopScan();
//             playDenied();
//             setStatus("denied");
//             return 100;
//           }
//           return prev + 1;
//         });
//       }, 30);
//     } else {
//       setScanProgress(0);
//       stopScan();
//     }
//     return () => {
//       clearInterval(interval);
//       stopScan();
//     };
//   }, [loginMethod, status, playScan, stopScan, playDenied]);

//   const handlePasswordLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (password === "raviverse_access_granted") {
//       playGranted();
//       setStatus("success");
//       localStorage.setItem("isAdmin", "true");
//       setTimeout(() => router.push("/admin/dashboard"), 2000);
//     } else {
//       playDenied();
//       setStatus("error");
//       setTimeout(() => setStatus("idle"), 2000);
//     }
//   };

//   const switchTab = (method: "qr" | "pass") => {
//     playHover();
//     setLoginMethod(method);
//     setStatus("idle");
//   };

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden selection:bg-cyan-500/30 font-mono">
//       {/* --- BACKGROUND: Aerospace Particle Field --- */}
//       <Particles
//         id="tsparticles"
//         init={particlesInit}
//         options={particlesOptions}
//         className="absolute inset-0 z-0"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-0 pointer-events-none" />

//       {/* --- HUD ELEMENTS (Spinning Rings) --- */}
//       <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-30">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
//           className="w-[700px] h-[700px] border-[1px] border-cyan-500/30 rounded-full border-dashed"
//         />
//         <motion.div
//           animate={{ rotate: -360 }}
//           transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
//           className="absolute w-[500px] h-[500px] border-[2px] border-cyan-500/20 rounded-full"
//         />
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//           className="absolute w-[600px] h-[600px] border-[1px] border-purple-500/20 rounded-full border-dotted"
//         />
//       </div>

//       {/* --- MAIN PORTAL INTERFACE --- */}
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 20 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         transition={{ type: "spring", duration: 1.5 }}
//         className={`relative z-10 w-full max-w-[450px] backdrop-blur-xl border-2 rounded-3xl overflow-hidden transition-all duration-500
//           ${
//             status === "denied" || status === "error"
//               ? "border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.3)] bg-red-950/30"
//               : status === "success"
//                 ? "border-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.3)] bg-green-950/30"
//                 : "border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] bg-slate-900/40"
//           }`}
//       >
//         {/* Decorative Corners */}
//         <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-xl" />
//         <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-xl" />
//         <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-xl" />
//         <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 rounded-br-xl" />

//         {/* Header */}
//         <div className="p-8 pb-4 flex items-center justify-between border-b border-white/10 relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-50" />
//           <div className="flex items-center gap-4 relative z-10">
//             <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-cyan-500/50 shadow-[inset_0_0_20px_rgba(6,182,212,0.2)]">
//               <Orbit className="text-cyan-300 animate-spin-slow" size={28} />
//             </div>
//             <div>
//               <h1 className="text-white font-bold tracking-[0.25em] text-lg">
//                 ORBITAL COMMAND
//               </h1>
//               <p className="text-cyan-400/70 text-xs tracking-wider flex items-center gap-2">
//                 <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />{" "}
//                 SYSTEM ONLINE
//               </p>
//             </div>
//           </div>
//           <Cpu className="text-white/20" size={32} />
//         </div>

//         {/* Tab Switcher (HUD Style) */}
//         <div className="flex p-2 mx-8 my-4 bg-black/40 rounded-lg border border-white/10 relative z-10">
//           <button
//             onMouseEnter={() => playHover()}
//             onClick={() => switchTab("qr")}
//             className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-widest rounded-md transition-all relative overflow-hidden group ${loginMethod === "qr" ? "text-cyan-300 bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.2)] border border-cyan-500/30" : "text-white/40 hover:text-white"}`}
//           >
//             <Scan size={16} /> BIOMETRIC SCAN
//             {loginMethod === "qr" && (
//               <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 animate-pulse" />
//             )}
//           </button>
//           <button
//             onMouseEnter={() => playHover()}
//             onClick={() => switchTab("pass")}
//             className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-widest rounded-md transition-all relative overflow-hidden group ${loginMethod === "pass" ? "text-purple-300 bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.2)] border border-purple-500/30" : "text-white/40 hover:text-white"}`}
//           >
//             <Key size={16} /> SECURE CODE
//             {loginMethod === "pass" && (
//               <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400 animate-pulse" />
//             )}
//           </button>
//         </div>

//         {/* Content Area */}
//         <div className="p-8 pt-2 relative z-10 min-h-[280px] flex flex-col justify-center">
//           <AnimatePresence mode="wait">
//             {/* --- QR MODE (THE TRAP) --- */}
//             {loginMethod === "qr" && (
//               <motion.div
//                 key="qr"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="flex flex-col items-center relative"
//               >
//                 {/* Holographic Scanner Box */}
//                 <div
//                   className={`w-48 h-48 relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 border-2
//                     ${
//                       status === "denied"
//                         ? "border-red-500 bg-red-500/10 shadow-[0_0_40px_red]"
//                         : status === "scanning"
//                           ? "border-cyan-400 bg-cyan-400/5 shadow-[0_0_30px_cyan]"
//                           : "border-white/10 hover:border-cyan-500/50 bg-black/50"
//                     }`}
//                   onClick={() => status === "idle" && setStatus("scanning")}
//                 >
//                   {status !== "denied" && (
//                     <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')] bg-center" />
//                   )}

//                   {/* The "Trap" Content */}
//                   {status === "denied" ? (
//                     <motion.div
//                       animate={{ scale: [0.9, 1.1, 1] }}
//                       className="absolute inset-0 flex flex-col items-center justify-center text-red-500 z-20"
//                     >
//                       <ShieldAlert
//                         size={64}
//                         className="animate-pulse mb-2 drop-shadow-[0_0_10px_red]"
//                       />
//                       <span className="font-bold tracking-widest">DENIED</span>
//                     </motion.div>
//                   ) : (
//                     // Fake QR Pattern
//                     <div className="absolute inset-4 flex flex-wrap content-start gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
//                       {Array.from({ length: 81 }).map((_, i) => (
//                         <div
//                           key={i}
//                           className={`w-3 h-3 ${Math.random() > 0.6 ? "bg-cyan-400" : "bg-white/10"} rounded-[2px]`}
//                         />
//                       ))}
//                     </div>
//                   )}

//                   {/* High-Tech Laser Scanner */}
//                   {status === "scanning" && (
//                     <>
//                       <motion.div
//                         className="absolute left-0 right-0 h-2 bg-cyan-400/80 shadow-[0_0_30px_cyan,0_0_10px_white]"
//                         animate={{ top: ["-10%", "110%"] }}
//                         transition={{
//                           duration: 1.2,
//                           repeat: Infinity,
//                           ease: "easeInOut",
//                         }}
//                       />
//                       <div className="absolute inset-0 bg-cyan-500/20 animate-pulse" />
//                     </>
//                   )}
//                 </div>

//                 {/* Status Text HUD */}
//                 <div className="mt-6 text-center h-12 flex items-center justify-center">
//                   {status === "idle" && (
//                     <p className="text-xs text-cyan-400/60 tracking-widest uppercase animate-pulse">
//                       &lt; Initiate Sequence &gt;
//                     </p>
//                   )}
//                   {status === "scanning" && (
//                     <div className="w-full px-8">
//                       <div className="flex justify-between text-[10px] text-cyan-300 mb-1 tracking-widest">
//                         <span>ANALYZING BIOMETRICS...</span>
//                         <span>{Math.floor(scanProgress)}%</span>
//                       </div>
//                       <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-cyan-500/30">
//                         <motion.div
//                           className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 relative"
//                           style={{ width: `${scanProgress}%` }}
//                         >
//                           <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50 blur-md animate-pulse" />
//                         </motion.div>
//                       </div>
//                     </div>
//                   )}
//                   {status === "denied" && (
//                     <motion.div
//                       initial={{ y: 10, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       className="text-red-500 text-sm font-bold tracking-[0.2em] flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/50 drop-shadow-[0_0_20px_red]"
//                     >
//                       <ShieldAlert size={18} /> UNKNOWN LIFEFORM DETECTED
//                     </motion.div>
//                   )}
//                 </div>
//               </motion.div>
//             )}

//             {/* --- PASSWORD MODE (REAL ACCESS) --- */}
//             {loginMethod === "pass" && (
//               <motion.div
//                 key="pass"
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -50 }}
//                 className="px-4"
//               >
//                 <form onSubmit={handlePasswordLogin} className="space-y-6">
//                   <div className="space-y-2 group">
//                     <label className="text-[10px] uppercase tracking-[0.2em] text-purple-300/70 font-bold ml-1 flex items-center gap-2">
//                       <Key size={12} /> Authorization Key
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="w-full bg-black/60 border-2 border-purple-900/50 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:border-purple-400 focus:outline-none focus:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all font-mono tracking-[0.3em] text-center text-lg"
//                         placeholder="••••••"
//                         autoFocus
//                       />
//                       {/* HUD accents around input */}
//                       <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-purple-400 group-hover:w-6 group-hover:h-6 transition-all" />
//                       <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-purple-400 group-hover:w-6 group-hover:h-6 transition-all" />
//                     </div>
//                   </div>

//                   <button
//                     onMouseEnter={() => playHover()}
//                     type="submit"
//                     disabled={status === "success"}
//                     className={`w-full p-4 rounded-xl font-bold text-sm tracking-[0.3em] transition-all relative overflow-hidden group
//                         ${
//                           status === "success"
//                             ? "bg-green-500 text-black shadow-[0_0_50px_green]"
//                             : status === "error"
//                               ? "bg-red-500 text-white"
//                               : "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_30px_rgba(168,85,247,0.4)]"
//                         }`}
//                   >
//                     <span className="relative z-10 flex items-center justify-center gap-2">
//                       {status === "success" ? (
//                         "ACCESS GRANTED"
//                       ) : status === "error" ? (
//                         "INVALID KEY"
//                       ) : (
//                         <>
//                           ENGAGE UPLINK <ChevronRight />
//                         </>
//                       )}
//                     </span>
//                     {status !== "success" && status !== "error" && (
//                       <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700" />
//                     )}
//                   </button>
//                 </form>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* System Footer */}
//         <div className="bg-black/40 p-3 text-[10px] text-center text-white/30 flex justify-between px-8 border-t border-white/5 font-mono">
//           <span>UNIT: 884-XJ-9</span>
//           <span className="flex items-center gap-1">
//             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{" "}
//             SERVER SECURE
//           </span>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient"; // 👈 Real Auth Import
import {
  Scan,
  Key,
  ShieldAlert,
  Cpu,
  Orbit,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import useSound from "use-sound";

// Particle Config (Same as before)
const particlesOptions: any = {
  background: { color: { value: "#000000" } },
  fpsLimit: 120,
  interactivity: {
    events: { onHover: { enable: true, mode: "grab" }, resize: true },
    modes: { grab: { distance: 140, links: { opacity: 1 } } },
  },
  particles: {
    color: { value: "#06b6d4" },
    links: { color: "#06b6d4", distance: 150, enable: true, opacity: 0.2, width: 1 },
    move: { enable: true, speed: 1 },
    number: { density: { enable: true, area: 800 }, value: 80 },
    opacity: { value: 0.5 },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};

export default function AdminLogin() {
  const [loginMethod, setLoginMethod] = useState<"qr" | "pass">("qr");
  const [scanProgress, setScanProgress] = useState(0);
  
  // Form State
  const [email, setEmail] = useState(""); // 👈 Added Email
  const [password, setPassword] = useState("");
  
  const [status, setStatus] = useState<
    "idle" | "scanning" | "success" | "error" | "denied" | "loading"
  >("idle");
  const router = useRouter();

  // Sounds
  const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.5 });
  const [playScan, { stop: stopScan }] = useSound("/sounds/scan.mp3", { volume: 0.3, loop: true });
  const [playDenied] = useSound("/sounds/denied.mp3", { volume: 0.7 });
  const [playGranted] = useSound("/sounds/granted.mp3", { volume: 0.7 });

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // QR Trap Logic (Same as before)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loginMethod === "qr" && status === "scanning") {
      playScan();
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            stopScan();
            playDenied();
            setStatus("denied");
            return 100;
          }
          return prev + 1;
        });
      }, 30);
    } else {
      setScanProgress(0);
      stopScan();
    }
    return () => {
      clearInterval(interval);
      stopScan();
    };
  }, [loginMethod, status, playScan, stopScan, playDenied]);

  // 🔒 REAL AUTHENTICATION LOGIC
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading"); // Show loading state

    try {
      // 1. Supabase Login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // 2. Identity Check (Double Security)
      if (data.user?.email !== "ravi.keshari029@gmail.com") {
        await supabase.auth.signOut();
        throw new Error("UNAUTHORIZED IDENTITY");
      }

      // 3. Success
      playGranted();
      setStatus("success");
      setTimeout(() => router.push("/admin/dashboard"), 2000);

    } catch (err) {
      console.error(err);
      playDenied();
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  const switchTab = (method: "qr" | "pass") => {
    playHover();
    setLoginMethod(method);
    setStatus("idle");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden selection:bg-cyan-500/30 font-mono">
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-0 pointer-events-none" />

      {/* Rings Animation (Same as before) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-30">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="w-[700px] h-[700px] border-[1px] border-cyan-500/30 rounded-full border-dashed" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute w-[500px] h-[500px] border-[2px] border-cyan-500/20 rounded-full" />
      </div>

      {/* MAIN INTERFACE */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className={`relative z-10 w-full max-w-[450px] backdrop-blur-xl border-2 rounded-3xl overflow-hidden transition-all duration-500
          ${status === "denied" || status === "error" ? "border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.3)] bg-red-950/30" 
          : status === "success" ? "border-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.3)] bg-green-950/30" 
          : "border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] bg-slate-900/40"}`}
      >
        
        {/* Header */}
        <div className="p-8 pb-4 flex items-center justify-between border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-50" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-cyan-500/50">
              <Orbit className="text-cyan-300 animate-spin-slow" size={28} />
            </div>
            <div>
              <h1 className="text-white font-bold tracking-[0.25em] text-lg">ORBITAL COMMAND</h1>
              <p className="text-cyan-400/70 text-xs tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" /> SYSTEM ONLINE
              </p>
            </div>
          </div>
          <Cpu className="text-white/20" size={32} />
        </div>

        {/* Tab Switcher */}
        <div className="flex p-2 mx-8 my-4 bg-black/40 rounded-lg border border-white/10 relative z-10">
          <button onClick={() => switchTab("qr")} className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-widest rounded-md transition-all ${loginMethod === "qr" ? "text-cyan-300 bg-cyan-500/20 border border-cyan-500/30" : "text-white/40"}`}>
            <Scan size={16} /> BIOMETRIC SCAN
          </button>
          <button onClick={() => switchTab("pass")} className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-widest rounded-md transition-all ${loginMethod === "pass" ? "text-purple-300 bg-purple-500/20 border border-purple-500/30" : "text-white/40"}`}>
            <Key size={16} /> SECURE CODE
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 pt-2 relative z-10 min-h-[280px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            
            {/* QR MODE (Trap) */}
            {loginMethod === "qr" && (
               /* ... (Same QR Logic as before) ... */
               <motion.div key="qr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                  <div className={`w-48 h-48 relative rounded-2xl overflow-hidden cursor-pointer border-2 ${status === "denied" ? "border-red-500 bg-red-500/10" : status === "scanning" ? "border-cyan-400 bg-cyan-400/5" : "border-white/10 bg-black/50"}`} onClick={() => status === "idle" && setStatus("scanning")}>
                     {status === "denied" ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500"><ShieldAlert size={64} className="animate-pulse mb-2" /><span className="font-bold tracking-widest">DENIED</span></div>
                     ) : (
                        <div className="absolute inset-4 flex flex-wrap content-start gap-1.5 opacity-60">
                           {Array.from({ length: 81 }).map((_, i) => <div key={i} className={`w-3 h-3 ${Math.random() > 0.6 ? "bg-cyan-400" : "bg-white/10"} rounded-[2px]`} />)}
                        </div>
                     )}
                     {status === "scanning" && <motion.div className="absolute left-0 right-0 h-2 bg-cyan-400/80 shadow-[0_0_30px_cyan]" animate={{ top: ["-10%", "110%"] }} transition={{ duration: 1.2, repeat: Infinity }} />}
                  </div>
                  <div className="mt-6 text-center h-12 flex items-center justify-center">
                     {status === "idle" && <p className="text-xs text-cyan-400/60 tracking-widest uppercase animate-pulse">&lt; Initiate Sequence &gt;</p>}
                     {status === "scanning" && <div className="w-full px-8"><div className="h-2 bg-black/50 rounded-full overflow-hidden border border-cyan-500/30"><motion.div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${scanProgress}%` }} /></div></div>}
                  </div>
               </motion.div>
            )}

            {/* PASSWORD MODE (Real Auth) */}
            {loginMethod === "pass" && (
              <motion.div key="pass" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="px-4">
                <form onSubmit={handlePasswordLogin} className="space-y-4">
                  
                  {/* EMAIL INPUT (Added) */}
                  <div className="space-y-1">
                     <label className="text-[10px] uppercase tracking-[0.2em] text-purple-300/70 font-bold ml-1">Admin ID</label>
                     <input 
                       type="email" 
                       value={email} 
                       onChange={(e) => setEmail(e.target.value)} 
                       className="w-full bg-black/60 border border-purple-900/50 rounded-lg px-4 py-3 text-white text-sm focus:border-purple-400 focus:outline-none transition-all font-mono" 
                       placeholder="admin@system.com" 
                     />
                  </div>

                  {/* PASSWORD INPUT */}
                  <div className="space-y-1">
                     <label className="text-[10px] uppercase tracking-[0.2em] text-purple-300/70 font-bold ml-1">Passcode</label>
                     <input 
                       type="password" 
                       value={password} 
                       onChange={(e) => setPassword(e.target.value)} 
                       className="w-full bg-black/60 border border-purple-900/50 rounded-lg px-4 py-3 text-white text-lg focus:border-purple-400 focus:outline-none transition-all font-mono tracking-widest" 
                       placeholder="••••••" 
                     />
                  </div>

                  <button type="submit" disabled={status === "loading" || status === "success"} className={`w-full p-4 rounded-xl font-bold text-sm tracking-[0.3em] transition-all relative overflow-hidden group ${status === "success" ? "bg-green-500 text-black" : status === "error" ? "bg-red-500 text-white" : "bg-purple-600 hover:bg-purple-500 text-white"}`}>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {status === "loading" ? <Loader2 className="animate-spin" /> : status === "success" ? "ACCESS GRANTED" : status === "error" ? "INVALID CREDENTIALS" : <>ENGAGE UPLINK <ChevronRight /></>}
                    </span>
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}