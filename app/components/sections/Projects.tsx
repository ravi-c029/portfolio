// "use client";

// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Github,
//   Terminal,
//   ArrowRight,
//   Play,
//   Radio,
//   Cpu,
//   Layers,
//   Code2,
//   Database,
// } from "lucide-react";

// export default function Projects() {
//   // 1. STATE
//   const [projects, setProjects] = useState<any[]>([]);
//   const [activeId, setActiveId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);

//   // 2. FETCH
//   useEffect(() => {
//     const fetchProjects = async () => {
//       const { data, error } = await supabase
//         .from("projects")
//         .select("*")
//         .order("created_at", { ascending: false });

//       if (data && data.length > 0) {
//         const formattedData = data.map((p) => ({
//           ...p,
//           category: "FULL STACK",
//           status: "LIVE",
//           features: p.tech_stack?.slice(0, 3) || [
//             "Responsive",
//             "Secure",
//             "Fast",
//           ],
//           tech: p.tech_stack || [],
//           links: { live: p.live_link, github: p.repo_link },
//         }));
//         setProjects(formattedData);
//         setActiveId(formattedData[0].id);
//       }
//       setLoading(false);
//     };

//     fetchProjects();
//   }, []);

//   const activeProject = projects.find((p) => p.id === activeId) || projects[0];
//   const activeIndex = projects.findIndex((p) => p.id === activeId);

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-cyan-500 font-mono">
//         INITIALIZING ARCHIVE...
//       </div>
//     );
//   if (projects.length === 0) return null;

//   return (
//     <section
//       id="projects"
//       className="relative py-12 lg:py-24 px-4 lg:px-6 min-h-screen flex items-center bg-slate-900/0 overflow-hidden"
//     >
//       {/* Background Grid */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

//       <div className="container mx-auto max-w-7xl relative z-10">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="flex items-end justify-between mb-10 lg:mb-20 border-b border-white/10 pb-6"
//         >
//           <div>
//             <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-2 tracking-widest">
//               <Terminal size={14} />
//               <span>// MISSION_LOGS</span>
//             </div>
//             <h2 className="text-3xl lg:text-5xl font-bold font-heading text-white">
//               PROJECT{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
//                 ARCHIVE
//               </span>
//             </h2>
//           </div>
//           <div className="hidden md:flex items-center gap-4 text-slate-400 font-mono text-xs">
//             <div className="flex items-center gap-2">
//               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//               SYSTEM ONLINE
//             </div>
//           </div>
//         </motion.div>

//         {/* --- THE COMMAND CENTER GRID --- */}
//         {/* Responsive Logic: Flex Column on Mobile, Grid on Desktop */}
//         <div className="flex flex-col lg:grid lg:grid-cols-[350px_100px_1fr] lg:h-[650px] items-start gap-8 lg:gap-0">
//           {/* COLUMN 1: THE LIST (Horizontal Scroll on Mobile, Vertical on Desktop) */}
//           <div className="flex lg:flex-col gap-4 relative z-20 w-full overflow-x-auto lg:overflow-y-auto lg:h-full pr-2 custom-scrollbar pb-4 lg:pb-0">
//             {projects.map((project) => {
//               const isActive = activeId === project.id;
//               return (
//                 <button
//                   key={project.id}
//                   onClick={() => setActiveId(project.id)}
//                   className={`
//                     group relative text-left p-6 rounded-xl border transition-all duration-300 shrink-0 w-[85vw] md:w-[300px] lg:w-full
//                     ${
//                       isActive
//                         ? "bg-white/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
//                         : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
//                     }
//                   `}
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <span
//                       className={`font-mono text-xs ${isActive ? "text-cyan-300" : "text-slate-500"}`}
//                     >
//                       0{project.id} //
//                     </span>
//                     {isActive && (
//                       <Radio
//                         size={14}
//                         className="text-cyan-400 animate-pulse"
//                       />
//                     )}
//                   </div>
//                   <h3
//                     className={`text-lg font-bold font-heading mb-1 ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`}
//                   >
//                     {project.title}
//                   </h3>

//                   {/* The "Plug" Point (Only visible on Desktop) */}
//                   {isActive && (
//                     <div className="hidden lg:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]" />
//                   )}
//                   {/* Mobile Indicator (Bottom Border) */}
//                   {isActive && (
//                     <div className="lg:hidden absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_10px_cyan]" />
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           {/* COLUMN 2: THE NEURAL LINK (Hidden on Mobile) */}
//           <div className="relative h-full w-full hidden lg:block pointer-events-none">
//             <svg className="absolute inset-0 w-full h-full overflow-visible">
//               <defs>
//                 <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
//                   <feGaussianBlur stdDeviation="2" result="blur" />
//                   <feComposite in="SourceGraphic" in2="blur" operator="over" />
//                 </filter>
//                 <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                   <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
//                   <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
//                   <stop offset="100%" stopColor="#a855f7" stopOpacity="1" />
//                 </linearGradient>
//               </defs>

//               <motion.path
//                 key={activeId}
//                 d={`M 0 ${60 + activeIndex * 120} C 50 ${60 + activeIndex * 120}, 50 60, 100 60`}
//                 fill="none"
//                 stroke="url(#gradient)"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 initial={{ pathLength: 0, opacity: 0 }}
//                 animate={{ pathLength: 1, opacity: 1 }}
//                 transition={{ duration: 0.5, ease: "circOut" }}
//                 filter="url(#glow)"
//               />

//               <motion.circle r="3" fill="#fff">
//                 <animateMotion
//                   dur="1.5s"
//                   repeatCount="indefinite"
//                   path={`M 0 ${60 + activeIndex * 120} C 50 ${60 + activeIndex * 120}, 50 60, 100 60`}
//                 />
//               </motion.circle>
//             </svg>
//           </div>

//           {/* COLUMN 3: THE MAINFRAME VIEWER */}
//           <div className="relative w-full h-auto lg:h-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden flex flex-col shadow-2xl z-20 min-h-[500px]">
//             {/* The Input Port (Desktop Only) */}
//             <div className="hidden lg:block absolute -left-1.5 top-[60px] -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_15px_purple]" />

//             {/* CRT Scanline Overlay */}
//             <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] opacity-20" />

//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeProject.id}
//                 initial={{ opacity: 0, filter: "blur(10px)" }}
//                 animate={{ opacity: 1, filter: "blur(0px)" }}
//                 exit={{ opacity: 0, filter: "blur(10px)" }}
//                 transition={{ duration: 0.4 }}
//                 className="flex flex-col h-full"
//               >
//                 {/* 4. IMAGE SECTION */}
//                 <div className="relative h-48 lg:h-56 w-full bg-black/50 flex items-center justify-center overflow-hidden border-b border-white/10 group shrink-0">
//                   <motion.div
//                     initial={{ top: "-10%" }}
//                     animate={{ top: "110%" }}
//                     transition={{
//                       duration: 3,
//                       repeat: Infinity,
//                       ease: "linear",
//                     }}
//                     className="absolute left-0 right-0 h-1 bg-cyan-400/50 shadow-[0_0_15px_cyan] z-10"
//                   />

//                   {/* REAL IMAGE */}
//                   {activeProject.image_url ? (
//                     <img
//                       src={activeProject.image_url}
//                       alt={activeProject.title}
//                       className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
//                     />
//                   ) : (
//                     <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/20" />
//                   )}

//                   <div className="text-center p-4 lg:p-8 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl relative z-10">
//                     <p className="text-[10px] lg:text-xs font-mono text-cyan-300 mb-2">
//                       // IMAGE_FEED_ONLINE
//                     </p>
//                     <div className="text-xl lg:text-3xl font-heading font-bold text-white">
//                       {activeProject.title}
//                     </div>
//                   </div>

//                   <div className="absolute bottom-4 right-4 px-3 py-1 rounded bg-black/80 border border-white/10 text-[10px] lg:text-xs font-mono text-green-400 flex items-center gap-2 z-10">
//                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//                     STATUS: {activeProject.status}
//                   </div>
//                 </div>

//                 {/* Content Area */}
//                 <div className="p-6 lg:p-8 flex-1 overflow-y-auto custom-scrollbar flex flex-col">
//                   <div className="mb-6">
//                     <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 flex items-center gap-3">
//                       MISSION BRIEF <span className="h-px flex-1 bg-white/10" />
//                     </h3>
//                     <p className="text-slate-300 leading-relaxed text-sm">
//                       {activeProject.description}
//                     </p>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-6 mb-8">
//                     {/* Left: Key Features */}
//                     <div>
//                       <div className="text-xs font-mono text-slate-500 mb-3 uppercase tracking-widest">
//                         // Key_Features
//                       </div>
//                       <div className="space-y-2">
//                         {activeProject.features.map(
//                           (feature: string, i: number) => (
//                             <div
//                               key={i}
//                               className="flex items-start gap-2 text-sm text-slate-400"
//                             >
//                               <ArrowRight
//                                 size={14}
//                                 className="text-cyan-400 mt-0.5 shrink-0"
//                               />
//                               <span>{feature}</span>
//                             </div>
//                           ),
//                         )}
//                       </div>
//                     </div>

//                     {/* Right: Architecture */}
//                     <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm mt-4 md:mt-0">
//                       <div className="text-xs font-mono text-slate-500 mb-3 uppercase tracking-widest border-b border-white/10 pb-2 flex items-center gap-2">
//                         <Cpu size={12} /> System_Architecture
//                       </div>
//                       <div className="space-y-2">
//                         {activeProject.tech.map((t: string, i: number) => (
//                           <div
//                             key={i}
//                             className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/5 group hover:border-cyan-500/30 transition-colors"
//                           >
//                             <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:shadow-[0_0_5px_cyan]" />
//                             <span className="text-xs font-bold text-slate-200">
//                               {t}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="mt-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-4">
//                     {activeProject.links.github && (
//                       <a
//                         href={activeProject.links.github}
//                         target="_blank"
//                         className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 font-bold text-white text-sm transition-all border border-white/10"
//                       >
//                         <Github size={16} /> CODEBASE
//                       </a>
//                     )}
//                     {activeProject.links.live && (
//                       <a
//                         href={activeProject.links.live}
//                         target="_blank"
//                         className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all shadow-[0_0_20px_cyan]"
//                       >
//                         <Play size={16} fill="currentColor" /> INITIATE
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  Terminal,
  Cpu,
  ArrowRight,
  Zap,
} from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Constants for SVG calculations (Button height fix rakhne se line perfect match karegi)
  const ITEM_HEIGHT = 64; // 64px height per button

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        const formatted = data.map((p) => ({
          ...p,
          tech: p.tech_stack || [],
          links: { live: p.live_link, github: p.repo_link },
        }));
        setProjects(formatted);
        setActiveId(formatted[0].id);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const activeProject = projects.find((p) => p.id === activeId) || projects[0];
  const activeIndex = projects.findIndex((p) => p.id === activeId);

  if (loading) return null;

  return (
    <section
      id="projects"
      className="relative py-20 lg:py-28 px-4 lg:px-8 min-h-screen flex items-center overflow-hidden"
>
      {/* --- BACKGROUND GLOWS & GRID --- */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/15 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="container mx-auto max-w-7xl relative z-10 h-full">
        {/* Header Title */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight flex items-center gap-3">
            <Terminal className="text-cyan-500" size={32} />
            <span className="text-slate-600">/</span> PROJECTS
          </h2>
        </div>

        {/* --- MAIN LAYOUT (Grid Adjustments here) --- */}
        {/* Changed Grid Cols: Left is fixed 240px, Right takes rest space */}
        <div className="flex flex-col lg:grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12 relative min-h-[500px]">
          {/* LEFT COLUMN: The Selection Menu */}
          {/* Mobile: Horizontal Scroll | Desktop: Vertical Stack */}
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-3 relative z-20 order-1 scrollbar-hide">
            {/* The Vertical Spine Line (Desktop Only) */}
            <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10 hidden lg:block" />

            {projects.map((project, index) => {
              const isActive = activeId === project.id;
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveId(project.id)}
                  style={{ height: ITEM_HEIGHT }} // Fixed height calculation ke liye
                  className={`
                    group relative shrink-0 text-left px-4 lg:px-6 transition-all duration-300 rounded-lg lg:rounded-none flex items-center justify-between
                    ${isActive ? "bg-white/5 lg:bg-transparent" : "hover:bg-white/5 lg:hover:bg-transparent"}
                  `}
                >
                  <div className="flex flex-col">
                    <span
                      className={`text-[10px] font-mono mb-1 ${isActive ? "text-cyan-400" : "text-slate-600"}`}
                    >
                      0{index + 1}
                    </span>
                    <h3
                      className={`text-sm font-bold uppercase tracking-widest transition-colors ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {/* Desktop Active Indicator (Small arrow on right border) */}
                  {isActive && (
                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-cyan-400 rotate-45 shadow-[0_0_10px_cyan]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* MIDDLE: THE "NEURAL BRIDGE" (Desktop Only) */}
          {/* Isko adjust kiya hai taaki wo new position se start ho */}
          <div className="hidden lg:block absolute left-[240px] top-0 bottom-0 w-[100px] pointer-events-none z-10 overflow-visible">
            <svg className="w-full h-full overflow-visible">
              <motion.path
                key={activeId}
                // Math: Start at (0, Center of button) -> End at (100, Arbitrary Middle of card approx 250px)
                d={`M 0 ${activeIndex * ITEM_HEIGHT + ITEM_HEIGHT / 2} C 50 ${activeIndex * ITEM_HEIGHT + ITEM_HEIGHT / 2}, 20 250, 100 250`}
                fill="none"
                stroke="url(#gradient-line)"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "circOut" }}
              />
              <defs>
                <linearGradient
                  id="gradient-line"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Animated Dot */}
              <motion.circle r="3" fill="#fff" filter="url(#glow)">
                <animateMotion
                  dur="1.5s"
                  repeatCount="indefinite"
                  path={`M 0 ${activeIndex * ITEM_HEIGHT + ITEM_HEIGHT / 2} C 50 ${activeIndex * ITEM_HEIGHT + ITEM_HEIGHT / 2}, 20 250, 100 250`}
                />
              </motion.circle>
            </svg>
          </div>

          {/* RIGHT COLUMN: The Project Card */}
          <div className="relative w-full lg:h-[500px] order-2 perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full relative bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl flex flex-col lg:flex-row group shadow-2xl"
              >
                {/* 1. Image Area (Mobile: Top, Desktop: Left/Main) */}
                <div className="relative h-[200px] lg:h-full lg:w-7/12 overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 lg:hidden" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/80 z-10 hidden lg:block" />

                  {activeProject.image_url ? (
                    <img
                      src={activeProject.image_url}
                      alt={activeProject.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                      <Cpu size={40} className="text-slate-600" />
                    </div>
                  )}
                </div>

                {/* 2. Content Area (Mobile: Bottom, Desktop: Right Sidebar) */}
                <div className="flex-1 p-6 lg:p-8 flex flex-col relative bg-slate-900/40">
                  {/* Floating Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {activeProject.tech
                      .slice(0, 3)
                      .map((t: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-[10px] font-bold font-mono bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 rounded"
                        >
                          {t}
                        </span>
                      ))}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 font-heading leading-tight">
                    {activeProject.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-8 overflow-y-auto custom-scrollbar lg:max-h-[200px]">
                    {activeProject.description}
                  </p>

                  {/* Actions Buttons */}
                  <div className="mt-auto grid grid-cols-2 gap-3">
                    {activeProject.links.live && (
                      <a
                        href={activeProject.links.live}
                        target="_blank"
                        className="flex items-center justify-center gap-2 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider rounded transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      >
                        <ExternalLink size={14} /> Live
                      </a>
                    )}
                    {activeProject.links.github && (
                      <a
                        href={activeProject.links.github}
                        target="_blank"
                        className="flex items-center justify-center gap-2 py-3 border border-white/20 hover:bg-white/5 text-white font-mono text-xs rounded transition-all"
                      >
                        <Github size={14} /> Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Background Glow behind the card */}
            <div className="absolute inset-0 bg-cyan-500/5 blur-[80px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
