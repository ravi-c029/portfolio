"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Database, Cpu, Code, Server, 
  Layers, Zap, Box, Terminal, LayoutTemplate, 
  ArrowRight, Activity, ShieldCheck 
} from "lucide-react";

// --- DATA ---
const skillCategories = [
  {
    id: "frontend",
    title: "FRONTEND ARCH",
    subtitle: "UI/UX Systems",
    description: "Creating scalable and performant frontend interfaces with modern web technologies.",
    color: "cyan",
    mainIcon: <Globe size={24} />,
    stats: "98% PERFORMANCE",
    skills: [
      { name: "Next.js", icon: <LayoutTemplate size={16} /> },
      { name: "React Three Fiber", icon: <Box size={16} /> },
      { name: "Tailwind", icon: <Layers size={16} /> },
      { name: "Framer Motion", icon: <Zap size={16} /> },
      { name: "WebGL", icon: <Globe size={16} /> },
    ]
  },
  {
    id: "backend",
    title: "BACKEND OPS",
    subtitle: "Infra & Scaling",
    description: "Scalable infrastructure designed for speed, security, and real-time data synchronization.",
    color: "purple",
    mainIcon: <Server size={24} />,
    stats: "99.9% UPTIME",
    skills: [
      { name: "Node.js", icon: <Terminal size={16} /> },
      { name: "Supabase", icon: <Database size={16} /> },
      { name: "PostgreSQL", icon: <Database size={16} /> },
      { name: "Redis", icon: <Zap size={16} /> },
      { name: "Edge Functions", icon: <Code size={16} /> },
    ]
  },
  {
    id: "ai",
    title: "NEURAL CORE",
    subtitle: "ML Pipelines",
    description: "Designing and implementing machine learning models and AI-driven systems to extract insights.",
    color: "pink",
    mainIcon: <Cpu size={24} />,
    stats: "V.4.0 MODEL",
    skills: [
      { name: "OpenAI SDK", icon: <Cpu size={16} /> },
      { name: "RAG Pipelines", icon: <Layers size={16} /> },
      { name: "Vector DB", icon: <Database size={16} /> },
      { name: "Python", icon: <Code size={16} /> },
      { name: "LangChain", icon: <Globe size={16} /> },
    ]
  }
];

export default function Skills() {
  const [activeId, setActiveId] = useState("frontend");
  const [floatingSkills, setFloatingSkills] = useState<{name: string, top: number, left: number, duration: number}[]>([]);

  const activeCategory = skillCategories.find(c => c.id === activeId) || skillCategories[0];
  const activeIndex = skillCategories.findIndex(c => c.id === activeId);

  // --- EFFECT: Background Particles ---
  useEffect(() => {
    const allSkills = skillCategories.flatMap(cat => cat.skills.map(s => s.name));
    const items = allSkills.map(skill => ({
      name: skill,
      top: Math.random() * 90,
      left: Math.random() * 90,
      duration: Math.random() * 20 + 20 
    }));
    setFloatingSkills(items);
  }, []);

  return (
    <section id="skills" className="relative py-20 lg:py-32 px-4 lg:px-8 min-h-[800px] flex items-center justify-center overflow-hidden">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glow Blob */}
        <div className={`absolute top-1/2 left-0 w-[500px] h-[500px] bg-${activeCategory.color}-500/10 blur-[120px] rounded-full transition-colors duration-1000 transform -translate-y-1/2`} />

        {/* Floating Words */}
        {floatingSkills.map((item, i) => (
          <motion.div
            key={i}
            style={{ position: "absolute", top: `${item.top}%`, left: `${item.left}%` }}
            animate={{ 
              y: [0, -30, 0], 
              opacity: [0, 0.08, 0] 
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-[10px] md:text-sm font-mono font-bold text-white tracking-widest pointer-events-none select-none z-0"
          >
            {item.name}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="mb-12 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-bold font-heading text-white tracking-tighter">
              Technical <span className={`text-${activeCategory.color}-500 transition-colors duration-500`}>Skills</span>
            </h2>
        </div>

        {/* --- THE LAYOUT --- */}
        <div className="flex flex-col lg:grid lg:grid-cols-[300px_100px_1fr] gap-6 lg:gap-0 relative">
          
          {/* COLUMN 1: THE CONTROL LIST (Redesigned) */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 order-1">
             {skillCategories.map((category, index) => {
                const isActive = activeId === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveId(category.id)}
                    className={`
                      group relative flex items-center justify-between p-4 w-[240px] lg:w-full shrink-0
                      border-l-2 transition-all duration-300 overflow-hidden
                      ${isActive 
                        ? `border-${category.color}-500 bg-gradient-to-r from-${category.color}-500/10 to-transparent` 
                        : "border-white/10 hover:border-white/30 hover:bg-white/5"}
                    `}
                  >
                    {/* Active Scanline (Decoration) */}
                    {isActive && (
                        <motion.div 
                            layoutId="scanline"
                            className={`absolute inset-0 bg-gradient-to-r from-${category.color}-500/0 via-${category.color}-500/10 to-${category.color}-500/0`}
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        />
                    )}

                    <div className="flex items-center gap-4 relative z-10">
                        {/* Icon Box */}
                        <div className={`
                            w-10 h-10 flex items-center justify-center rounded bg-black/40 backdrop-blur-sm border transition-colors
                            ${isActive ? `text-${category.color}-400 border-${category.color}-500/50` : "text-slate-500 border-white/10"}
                        `}>
                           {category.mainIcon}
                        </div>

                        {/* Text Block */}
                        <div className="text-left">
                            <div className={`text-[10px] font-mono uppercase tracking-widest mb-0.5 ${isActive ? `text-${category.color}-400` : "text-slate-600"}`}>
                                0{index+1} // {category.subtitle}
                            </div>
                            <div className={`font-bold font-heading uppercase text-lg leading-none ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
                                {category.title}
                            </div>
                        </div>
                    </div>

                    {/* Tech Decor (Right Side) */}
                    <div className="hidden lg:flex flex-col gap-1 items-end opacity-50">
                        <div className={`w-1 h-1 rounded-full ${isActive ? `bg-${category.color}-500` : "bg-slate-700"}`} />
                        <div className={`w-1 h-1 rounded-full ${isActive ? `bg-${category.color}-500` : "bg-slate-700"}`} />
                        <div className={`w-1 h-4 rounded-full ${isActive ? `bg-${category.color}-500` : "bg-slate-700"}`} />
                    </div>
                  </button>
                )
             })}
          </div>

          {/* COLUMN 2: THE NEURAL LINK (Desktop Only) */}
          <div className="hidden lg:flex items-center justify-center relative order-2 pointer-events-none">
             <div className="absolute inset-0 w-full h-full">
                <svg className="w-full h-full overflow-visible">
                    <motion.path 
                        key={activeId}
                        // Path starts from vertical center of active button index
                        d={`M 0 ${38 + (activeIndex * 74)} C 50 ${38 + (activeIndex * 74)}, 30 50%, 100 50%`} 
                        fill="none"
                        stroke={`url(#gradient-${activeCategory.color})`}
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                    <defs>
                        <linearGradient id={`gradient-${activeCategory.color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <motion.circle r="3" fill="white">
                        <animateMotion 
                            dur="1s" 
                            repeatCount="indefinite"
                            path={`M 0 ${38 + (activeIndex * 74)} C 50 ${38 + (activeIndex * 74)}, 30 50%, 100 50%`}
                        />
                    </motion.circle>
                </svg>
             </div>
          </div>

          {/* COLUMN 3: THE MAIN DISPLAY */}
          <div className="h-auto lg:h-[500px] order-3 relative perspective-1000">
             <AnimatePresence mode="wait">
                <motion.div
                    key={activeId}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full relative bg-slate-900/60 border border-white/10 rounded-3xl p-8 lg:p-12 backdrop-blur-xl shadow-2xl flex flex-col justify-center overflow-hidden"
                >
                    {/* Corner Accent */}
                    <div className={`absolute top-0 right-0 p-8 opacity-20 text-${activeCategory.color}-500`}>
                        <Activity size={120} strokeWidth={1} />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                        {/* Status Bar */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono bg-${activeCategory.color}-500/20 text-${activeCategory.color}-300 border border-${activeCategory.color}-500/30 flex items-center gap-2`}>
                                <span className="relative flex h-2 w-2">
                                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${activeCategory.color}-400 opacity-75`}></span>
                                  <span className={`relative inline-flex rounded-full h-2 w-2 bg-${activeCategory.color}-500`}></span>
                                </span>
                                SYSTEM_ONLINE
                            </div>
                            <div className="text-xs font-mono text-slate-500">
                                // CAPABILITY: {activeCategory.stats}
                            </div>
                        </div>

                        <h3 className="text-3xl lg:text-5xl font-bold text-white mb-6 uppercase tracking-tight">
                            {activeCategory.title.replace("ARCH", "ARCHITECTURE").replace("OPS", "OPERATIONS").replace("CORE", "INTELLIGENCE")}
                        </h3>
                        
                        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-12">
                            {activeCategory.description}
                        </p>

                        {/* Skills Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {activeCategory.skills.map((skill, idx) => (
                                <motion.div 
                                    key={skill.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-black/20 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all cursor-default"
                                >
                                    <div className={`p-3 rounded-lg bg-${activeCategory.color}-500/10 text-${activeCategory.color}-400 group-hover:text-white group-hover:scale-110 transition-all duration-300`}>
                                        {skill.icon}
                                    </div>
                                    <span className="text-xs font-bold font-mono text-slate-400 group-hover:text-white text-center">
                                        {skill.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </motion.div>
             </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}