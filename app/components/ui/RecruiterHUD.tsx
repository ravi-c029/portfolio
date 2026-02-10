"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, X, CheckCircle, Briefcase, 
  Clock, MapPin, Download, Calendar, ScanEye, 
  ArrowLeft, Send, Loader2, Mail, User, MessageSquare
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function RecruiterHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"dossier" | "form">("dossier"); // Switch between Dossier & Form
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  // Handle Form Submission
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    try {
      const { error } = await supabase.from("messages").insert([formData]);
      if (error) throw error;
      setFormState("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setFormState("error");
    }
  };

  // Reset when closing
  const closeHUD = () => {
    setIsOpen(false);
    setTimeout(() => {
        setView("dossier");
        setFormState("idle");
    }, 500);
  };

  return (
    <>
      {/* --- MOBILE TRIGGER (Orb) --- */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        className="md:hidden fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-cyan-500/10 backdrop-blur-xl border border-cyan-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] group"
      >
        <div className="absolute inset-0 rounded-full border border-cyan-400 opacity-20 animate-ping" />
        <ScanEye size={24} className="text-cyan-400 group-hover:scale-110 transition-transform" />
      </motion.button>

      {/* --- DESKTOP TRIGGER (Pill) --- */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="hidden md:flex fixed top-24 right-8 z-40 items-center gap-3 px-5 py-2.5 bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-full hover:bg-cyan-500/10 hover:border-cyan-400/80 transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] group"
      >
        <div className="relative">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <div className="absolute inset-0 bg-cyan-400 blur-sm opacity-50 animate-pulse" />
        </div>
        <div className="flex flex-col items-start leading-none">
           <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-cyan-300 tracking-widest transition-colors">
             RECRUITER_VIEW
           </span>
           <span className="text-[8px] text-cyan-500/50 font-mono">v2.4 ACTIVE</span>
        </div>
      </motion.button>

      {/* --- THE MODAL --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeHUD}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50, rotateX: -10 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
              className="relative w-full max-w-[90%] md:max-w-2xl bg-slate-950/90 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden"
            >
              {/* Scan Line VFX */}
              <motion.div 
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-cyan-400/50 shadow-[0_0_20px_cyan] z-10 pointer-events-none"
              />

              {/* HEADER */}
              <div className="bg-white/5 border-b border-white/10 p-5 flex justify-between items-center relative z-20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                        {view === "dossier" ? <FileText size={20} className="text-cyan-400" /> : <Mail size={20} className="text-cyan-400" />}
                    </div>
                    <div>
                        <h3 className="text-sm md:text-base font-bold text-white tracking-widest">
                            {view === "dossier" ? "PROFESSIONAL PROFILE" : "DIRECT_UPLINK_CHANNEL"}
                        </h3>
                        <p className="text-[10px] text-cyan-500/60 font-mono">Availability & Skills</p>
                    </div>
                </div>
                <button 
                  onClick={closeHUD}
                  className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* CONTENT AREA (SWITCHABLE) */}
              <div className="relative z-20 min-h-[400px]">
                  <AnimatePresence mode="wait">
                      
                      {/* VIEW 1: DOSSIER */}
                      {view === "dossier" && (
                          <motion.div
                             key="dossier"
                             initial={{ opacity: 0, x: -20 }}
                             animate={{ opacity: 1, x: 0 }}
                             exit={{ opacity: 0, x: -20 }}
                             className="p-6 md:p-8 grid md:grid-cols-2 gap-8"
                          >
                            <div className="space-y-6">
                                <div className="group">
                                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1 block">Current Role</label>
                                    <div className="flex items-center gap-3 text-white font-bold text-lg p-3 bg-white/5 rounded-lg border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                                        <Briefcase size={18} className="text-purple-400" />
                                        Software Engineering Student
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1 block">Notice Period</label>
                                    <div className="flex items-center gap-3 text-white font-bold text-lg p-3 bg-white/5 rounded-lg border border-white/5 group-hover:border-green-500/30 transition-colors">
                                        <Clock size={18} className="text-green-400" />
                                        Available Immediately
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1 block">Base Location</label>
                                    <div className="flex items-center gap-3 text-white font-bold text-lg p-3 bg-white/5 rounded-lg border border-white/5 group-hover:border-red-500/30 transition-colors">
                                        <MapPin size={18} className="text-red-400" />
                                        Patna, India · Open to Remote Opportunities
                                    </div>
                                </div>
                            </div>

                            <div className="bg-cyan-950/20 rounded-xl p-5 border border-cyan-500/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 opacity-20">
                                    <CheckCircle size={80} className="text-cyan-500" />
                                </div>
                                <h4 className="text-xs font-bold text-cyan-400 tracking-widest mb-4 relative z-10">CORE_COMPETENCIES</h4>
                                <ul className="space-y-3 relative z-10">
                                    {[
                                        "Modern Frontend Development (Next.js, React)",
                                        "AI Integration & Applied Machine Learning",
                                        "Backend & Database Systems (Supabase, PostgreSQL)",
                                        "Interactive & Animated User Interfaces (Three.js, Framer Motion)"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_cyan] mt-1.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                          </motion.div>
                      )}

                      {/* VIEW 2: CONTACT FORM */}
                      {view === "form" && (
                          <motion.div
                             key="form"
                             initial={{ opacity: 0, x: 20 }}
                             animate={{ opacity: 1, x: 0 }}
                             exit={{ opacity: 0, x: 20 }}
                             className="p-6 md:p-8 flex flex-col h-full justify-center"
                          >
                             {formState === "success" ? (
                                <div className="text-center py-10">
                                   <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mx-auto mb-4">
                                      <CheckCircle size={32} className="text-green-400" />
                                   </div>
                                   <h3 className="text-xl font-bold text-white mb-2">Message Sent Successfully</h3>
                                   <p className="text-slate-400 text-sm mb-6">Your message has been encrypted and sent to the recipient.</p>
                                   <button onClick={() => { setView("dossier"); setFormState("idle"); }} className="text-cyan-400 hover:text-white font-mono text-xs underline">RETURN_TO_DOSSIER</button>
                                </div>
                             ) : (
                                <form onSubmit={handleSend} className="space-y-4 max-w-md mx-auto w-full">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-mono text-slate-500 ml-1">Name</label>
                                            <div className="relative">
                                                <User size={14} className="absolute left-3 top-3 text-slate-500" />
                                                <input required type="text" placeholder="Recruiter Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-white text-sm focus:border-cyan-500/50 focus:bg-cyan-900/10 focus:outline-none transition-all placeholder:text-slate-600" />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-mono text-slate-500 ml-1">Email</label>
                                            <div className="relative">
                                                <Mail size={14} className="absolute left-3 top-3 text-slate-500" />
                                                <input required type="email" placeholder="company@mail.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-white text-sm focus:border-cyan-500/50 focus:bg-cyan-900/10 focus:outline-none transition-all placeholder:text-slate-600" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-mono text-slate-500 ml-1">Message</label>
                                        <div className="relative">
                                            <MessageSquare size={14} className="absolute left-3 top-3 text-slate-500" />
                                            <textarea required rows={4} placeholder="Discussing potential role..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-white text-sm focus:border-cyan-500/50 focus:bg-cyan-900/10 focus:outline-none transition-all placeholder:text-slate-600 resize-none" />
                                        </div>
                                    </div>
                                    <button type="submit" disabled={formState === "sending"} className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                                        {formState === "sending" ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                        {formState === "sending" ? "TRANSMITTING..." : "SEND MESSAGE"}
                                    </button>
                                </form>
                             )}
                          </motion.div>
                      )}

                  </AnimatePresence>
              </div>

              {/* FOOTER (Only show in Dossier View) */}
              {view === "dossier" && (
                <div className="p-4 md:p-6 bg-black/40 border-t border-white/5 flex flex-col md:flex-row gap-3 relative z-20">
                   <a href="https://jruxzkmkiodultnhljca.supabase.co/storage/v1/object/public/resume/resume_1770584539232.pdf" download className="flex-1">
                      <button className="w-full py-3 md:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/25 group">
                          <Download size={18} className="group-hover:animate-bounce" />
                          DOWNLOAD CV
                      </button>
                   </a>
                   <button 
                      onClick={() => setView("form")} // CLICKING THIS SWITCHES TO FORM
                      className="flex-1 w-full py-3 md:py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
                   >
                      <Calendar size={18} className="text-purple-400 group-hover:text-purple-300" />
                      SCHEDULE INTERVIEW
                   </button>
                </div>
              )}
              
              {/* BACK BUTTON (Only show in Form View) */}
              {view === "form" && formState !== "success" && (
                  <div className="p-4 md:p-6 bg-black/40 border-t border-white/5 relative z-20">
                      <button onClick={() => setView("dossier")} className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-mono transition-colors">
                          <ArrowLeft size={14} /> Back
                      </button>
                  </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}