"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Command, FileText, Home, 
  Cpu, Briefcase, Mail, Github, 
  ArrowRight, X, Terminal, ExternalLink 
} from "lucide-react";

// --- THE COMMAND DATABASE ---
const commands = [
  {
    id: "home",
    title: "GO_TO_HOME",
    shortcut: "H",
    icon: Home,
    action: (router: any) => router.push("/#hero"),
    section: "NAVIGATION",
  },
  {
    id: "projects",
    title: "VIEW_PROJECTS",
    shortcut: "P",
    icon: Briefcase,
    action: (router: any) => router.push("/#projects"),
    section: "NAVIGATION",
  },
  {
    id: "skills",
    title: "CHECK_SKILLS",
    shortcut: "S",
    icon: Cpu,
    action: (router: any) => router.push("/#skills"),
    section: "NAVIGATION",
  },
  {
    id: "contact",
    title: "INITIATE_CONTACT",
    shortcut: "C",
    icon: Mail,
    action: (router: any) => router.push("/#contact"),
    section: "NAVIGATION",
  },
  {
    id: "resume",
    title: "DOWNLOAD_RESUME",
    shortcut: "R",
    icon: FileText,
    action: () => window.open("https://jruxzkmkiodultnhljca.supabase.co/storage/v1/object/public/resume/resume_1770584539232.pdf", "_blank"), // Ensure resume.pdf is in public folder
    section: "SYSTEM",
  },
  {
    id: "github",
    title: "OPEN_GITHUB",
    shortcut: "G",
    icon: Github,
    action: () => window.open("https://github.com/ravi-c029", "_blank"),
    section: "EXTERNAL",
  },
];

export default function CommandCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // --- 1. KEYBOARD LISTENERS ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on Ctrl+K or Cmd+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      // Close on Escape
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter commands based on search
  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase())
  );

  const execute = (action: any) => {
    action(router);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <>
      {/* --- FLOATING TRIGGER (Bottom Right) --- */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-50 hidden md:flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-slate-400 text-xs font-mono hover:text-cyan-400 hover:border-cyan-500/50 transition-colors shadow-2xl"
      >
        <Command size={14} />
        <span>CMD + K</span>
      </motion.button>

      {/* --- THE COMMAND CENTER MODAL --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* The Terminal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
              className="relative w-full max-w-lg bg-slate-950 border border-cyan-500/30 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden"
            >
              
              {/* Header / Input */}
              <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-white/5">
                <Terminal size={20} className="text-cyan-500 animate-pulse" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent border-none text-white placeholder:text-slate-600 focus:outline-none font-mono text-sm h-6"
                />
                <div className="hidden md:flex gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-slate-400 font-mono">ESC</span>
                </div>
              </div>

              {/* Results List */}
              <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd) => (
                    <motion.button
                      key={cmd.id}
                      onClick={() => execute(cmd.action)}
                      whileHover={{ scale: 1.01, x: 2 }}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-cyan-500/10 hover:border hover:border-cyan-500/20 group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded bg-white/5 text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                            <cmd.icon size={16} />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-bold text-slate-200 group-hover:text-white font-mono tracking-wide">
                                {cmd.title}
                            </span>
                            <span className="text-[10px] text-slate-600 group-hover:text-cyan-500/70">
                                {cmd.section}
                            </span>
                        </div>
                      </div>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                         <ArrowRight size={14} className="text-cyan-400" />
                      </div>
                    </motion.button>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-500 font-mono text-xs">
                    <p>ERROR: COMMAND_NOT_FOUND</p>
                    <p className="mt-1 opacity-50">Try 'Home', 'Resume', or 'Projects'</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-2 bg-black/40 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-600 font-mono px-4">
                 <span>SYSTEM_READY</span>
                 <span>v2.4.0-stable</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}