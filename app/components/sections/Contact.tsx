"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Terminal,
  Signal,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function Contact() {
  const [formState, setFormState] = useState("idle"); // idle | sending | sent | error
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    try {
      // 1. Send to Supabase
      const { error } = await supabase.from("messages").insert([formData]);

      if (error) throw error;

      // 2. Success
      setFormState("sent");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      console.error("Transmission Error:", error);
      setFormState("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-16 md:py-24 px-4 sm:px-6 min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-slate-900/0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-purple-500/10 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start md:items-center">
        {/* --- LEFT: COMMS ARRAY (Contact Info) --- */}
        <div className="order-2 md:order-1 mt-8 md:mt-0">
          {/* (Content remains exactly same as previous version) */}
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-4 tracking-widest justify-center md:justify-start">
            <Signal size={14} className="animate-pulse" />
            <span>// Contact</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white mb-6 text-center md:text-left">
            Get in <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Touch
            </span>
          </h2>

          <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-md mx-auto md:mx-0 text-center md:text-left">
            Open to internships, collaborations, freelance opportunities, and technical discussions.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <a
              href="mailto:ravi.keshari029@gmail.com"
              className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 hover:bg-white/10 transition-all"
            >
              <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 transition-colors">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-500 mb-1">
                  mail_id
                </div>
                <div className="text-slate-300 font-bold group-hover:text-white text-sm md:text-base">
                  ravi.keshari029@gmail.com
                </div>
              </div>
            </a>
            {/* Add other contact items here if needed */}
            {/* Location Node */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-500 mb-1">
                  COORDINATES
                </div>
                <div className="text-slate-300 font-bold text-sm md:text-base">
                  Patna, Bihar, India
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="flex gap-4 mt-4">
              {[
                { icon: <Github size={20} />, href: "https://github.com/ravi-c029", label: "GitHub" },
                { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/ravi-kumar-keshari-a37828347/", label: "LinkedIn" },
                { icon: <Twitter size={20} />, href: "https://x.com/ravi_c029", label: "X" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
                >
                  <span className="text-slate-400 group-hover:text-white transition-colors">
                    {social.icon}
                  </span>
                  <span className="text-[10px] font-mono text-slate-600 group-hover:text-cyan-400">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT: THE TRANSMISSION TERMINAL (Form) --- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative order-1 md:order-2"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl opacity-20 blur-lg" />

          <div className="relative p-6 md:p-8 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-6 md:mb-8 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Terminal size={16} />
                <span className="text-xs font-mono">CONTACT_FORM.json</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
            </div>

            {formState === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-[320px] flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 border border-green-500/50">
                  <ShieldCheck size={32} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  TRANSMISSION SECURE
                </h3>
                <p className="text-slate-400 text-sm">
                  Your packet has been delivered to the mainframe.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-6 text-xs font-mono text-cyan-400 hover:text-cyan-300 underline"
                >
                  SEND_NEW_PACKET
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSend} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-500 ml-1">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-cyan-500/50 focus:bg-cyan-900/10 focus:outline-none transition-all placeholder:text-slate-600"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-500 ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-cyan-500/50 focus:bg-cyan-900/10 focus:outline-none transition-all placeholder:text-slate-600"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-500 ml-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Brief briefing on the project..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-cyan-500/50 focus:bg-cyan-900/10 focus:outline-none transition-all placeholder:text-slate-600 resize-none"
                    required
                  />
                </div>

                {formState === "error" && (
                  <p className="text-xs text-red-400 font-mono text-center">
                    ⚠️ UPLINK FAILED. CHECK CONNECTION.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full group relative flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 rounded-lg transition-all overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                  {formState === "sending" ? (
                    <div className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="animate-pulse">ENCRYPTING...</span>
                    </div>
                  ) : (
                    <>
                      <span className="text-sm tracking-wide">
                        Send Message
                      </span>
                      <Send
                        size={16}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="mt-6 flex justify-between items-center text-[10px] font-mono text-slate-600">
              <span>Your message will be kept confidential.</span>
              <span>ID: 884-X9</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
