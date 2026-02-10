"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Cpu, Loader2, MessageSquare, ChevronLeft, Sparkles } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function VirtualMe() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "VirtualRavi Online." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Toggle Navbar Visibility (Logic remains same)
  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      navbar.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      if (isOpen) {
        navbar.style.opacity = "0";
        navbar.style.transform = "translateY(20px)"; 
        navbar.style.pointerEvents = "none";
      } else {
        navbar.style.opacity = "1";
        navbar.style.transform = "translateY(0)";
        navbar.style.pointerEvents = "auto";
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) throw new Error("Network error");
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Signal lost." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* =========================================================
          MOBILE TRIGGER (UNCHANGED)
      ========================================================== */}
      {!isOpen && (
        <motion.button
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed right-0 top-[60%] -translate-y-1/2 z-50 flex flex-col items-center gap-1 pl-2 pr-1 py-3 bg-cyan-500/10 backdrop-blur-md border-y border-l border-cyan-500/30 rounded-l-xl shadow-[0_0_15px_rgba(6,182,212,0.15)]"
        >
           <MessageSquare size={16} className="text-cyan-400" />
           <span className="text-[8px] font-mono text-cyan-400 rotate-180 text-vertical tracking-tighter opacity-80" style={{ writingMode: 'vertical-rl' }}>
              AI
           </span>
        </motion.button>
      )}


      {/* =========================================================
          DESKTOP TRIGGER (UNCHANGED)
      ========================================================== */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
           hidden md:flex fixed bottom-6 right-6 z-[100]
           group h-14 w-14 rounded-full items-center justify-center border backdrop-blur-xl transition-all duration-300 shadow-2xl
           ${isOpen 
             ? "bg-red-500/20 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.4)]" 
             : "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:bg-cyan-500/20"}
        `}
      >
         {isOpen ? (
            <X size={24} className="text-red-400" />
         ) : (
            <div className="relative">
                <div className="absolute inset-0 animate-ping bg-cyan-400 rounded-full opacity-20" />
                <Sparkles size={24} className="text-cyan-400 relative z-10" />
            </div>
         )}
      </motion.button>


      {/* =========================================================
          THE CHAT INTERFACE (DESKTOP UPGRADED)
      ========================================================== */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center md:items-end md:justify-end md:bottom-24 md:right-6 md:inset-auto pointer-events-none">
            
            {/* BACKDROP (Mobile Only - UNCHANGED) */}
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setIsOpen(false)}
               className="absolute inset-0 bg-black/40 backdrop-blur-[2px] md:hidden pointer-events-auto"
            />

            {/* CHAT WINDOW */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className={`
                pointer-events-auto
                /* --- MOBILE STYLE (Unchanged) --- */
                w-[85%] max-w-[320px] h-[50vh] 
                
                /* --- DESKTOP STYLE (BIGGER & BETTER) --- */
                md:w-[450px] md:h-[600px] md:max-w-none 
                
                bg-slate-950/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col relative
              `}
            >
              {/* Glossy Top Reflection */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-0" />

              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 relative z-10">
                 <div className="flex items-center gap-3">
                    <div className="relative">
                       <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_green]" />
                       <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20" />
                    </div>
                    <div>
                       <span className="block text-xs font-bold text-white tracking-widest font-heading">VIRTUAL_CORE_V2</span>
                       <span className="block text-[8px] text-cyan-400/70 font-mono tracking-wider">SYSTEM_READY</span>
                    </div>
                 </div>
                 <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg">
                    <X size={18} />
                 </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar relative z-10">
                {messages.map((msg, idx) => (
                  <motion.div 
                      initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={idx} 
                      className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                        <Cpu size={14} className="text-cyan-400" />
                      </div>
                    )}

                    <div className={`
                      max-w-[85%] text-sm p-3.5 border leading-relaxed backdrop-blur-md shadow-lg
                      ${msg.role === "user" 
                        ? "bg-cyan-500/20 border-cyan-500/30 text-cyan-50 rounded-2xl rounded-tr-sm" 
                        : "bg-white/5 border-white/10 text-slate-200 rounded-2xl rounded-tl-sm"}
                    `}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <div className="flex items-center gap-2 text-cyan-400/70 text-xs pl-2">
                     <Loader2 size={12} className="animate-spin" />
                     <span className="font-mono">COMPUTING_RESPONSE...</span>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>

              {/* Input Field */}
              <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/20 relative z-10">
                 <div className="relative flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:bg-white/10 focus-within:border-cyan-500/30 transition-all">
                    <input 
                      className="flex-1 bg-transparent border-none focus:outline-none text-sm text-white placeholder:text-white/30 font-sans"
                      placeholder="Ask me anything..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit" disabled={!input.trim()} className="text-cyan-400 hover:text-white transition-colors disabled:opacity-30 p-1 hover:bg-cyan-500/20 rounded-lg">
                       <Send size={16} />
                    </button>
                 </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}