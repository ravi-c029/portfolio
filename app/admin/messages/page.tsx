"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import {
  Mail,
  Trash2,
  CheckCircle,
  ArrowLeft,
  Clock,
  User,
  ShieldAlert,
  Loader2,
  Signal,
} from "lucide-react";
import AdminGuard from "../../components/admin/AdminGuard";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export default function AdminMessages() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setMessages(data);
    setLoading(false);
  };

  const markAsRead = async (id: number) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, is_read: true } : m)),
    );
    await supabase.from("messages").update({ is_read: true }).eq("id", id);
  };

  const deleteMessage = async (id: number) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    await supabase.from("messages").delete().eq("id", id);
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-black text-cyan-500 font-mono relative p-4 md:p-6 overflow-hidden">
        {/* --- LAYER 0: CYBER GRID BACKGROUND --- */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none perspective-1000 transform-gpu" />
        <div className="fixed inset-0 bg-radial-gradient(circle at center, transparent 0%, #000 90%) pointer-events-none" />

        {/* Floating Particles/Stars */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-500 rounded-full opacity-20 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* --- LAYER 1: HUD HEADER --- */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 border-b border-cyan-500/30 pb-6 relative z-10 bg-black/40 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="group p-3 hover:bg-cyan-500/10 rounded-full border border-cyan-500/20 transition-all relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyan-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              <ArrowLeft
                size={20}
                className="relative z-10 group-hover:text-white"
              />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-[0.2em] text-white flex items-center gap-3 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                <Mail className="text-cyan-400" /> SECURE_INBOX
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-1 w-20 bg-cyan-900 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 animate-[loading_2s_ease-in-out_infinite] w-1/2" />
                </div>
                <p className="text-[10px] text-cyan-500/70 tracking-widest uppercase">
                  ENCRYPTED: {messages.filter((m) => !m.is_read).length} UNREAD
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-cyan-900 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/20">
            <Signal size={14} className="animate-pulse text-green-400" />
            UPLINK_STABLE
          </div>
        </header>

        {/* --- LAYER 2: MESSAGE GRID --- */}
        <div className="max-w-6xl mx-auto relative z-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-cyan-500/50 gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 animate-pulse" />
                <Loader2 className="animate-spin relative z-10" size={48} />
              </div>
              <span className="font-mono tracking-widest animate-pulse">
                DECRYPTING DATA STREAM...
              </span>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-cyan-900/50 rounded-2xl bg-black/50 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <ShieldAlert className="mx-auto mb-4 text-cyan-900" size={48} />
              <p className="text-cyan-700 font-bold tracking-widest">
                NO TRANSMISSIONS DETECTED
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      relative p-6 rounded-xl border transition-all duration-300 group overflow-hidden
                      ${
                        msg.is_read
                          ? "bg-black/60 border-cyan-900/30 opacity-70 hover:opacity-100 hover:border-cyan-500/50"
                          : "bg-cyan-950/30 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] hover:border-cyan-400"
                      }
                    `}
                  >
                    {/* Holographic Glare Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    {/* Unread Indicator (Glowing Dot) */}
                    {!msg.is_read && (
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <span className="text-[9px] font-bold text-cyan-400 animate-pulse tracking-widest">
                          NEW_PACKET
                        </span>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping shadow-[0_0_10px_cyan]" />
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
                      {/* Left: Metadata */}
                      <div className="md:w-1/4 space-y-3 border-b md:border-b-0 md:border-r border-cyan-500/20 pb-4 md:pb-0">
                        <div className="flex items-center gap-2 text-white font-bold text-lg tracking-wide">
                          <div className="p-1.5 bg-cyan-500/20 rounded border border-cyan-500/30">
                            <User size={14} className="text-cyan-400" />
                          </div>
                          {msg.name}
                        </div>
                        <div className="text-xs text-cyan-300/70 break-all font-mono pl-1">
                          &lt;{msg.email}&gt;
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono bg-black/40 w-fit px-2 py-1 rounded">
                          <Clock size={10} />
                          {new Date(msg.created_at).toLocaleString()}
                        </div>
                      </div>

                      {/* Center: The Message */}
                      <div className="md:w-2/4 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans pl-2 border-l-2 border-transparent group-hover:border-cyan-500/30 transition-colors">
                        {msg.message}
                      </div>

                      {/* Right: Actions */}
                      <div className="md:w-1/4 flex md:flex-col items-end justify-between md:justify-start gap-3">
                        {!msg.is_read && (
                          <button
                            onClick={() => markAsRead(msg.id)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500 hover:text-black transition-all text-xs font-bold hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                          >
                            <CheckCircle size={14} /> MARK READ
                          </button>
                        )}
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className={`w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs font-bold hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] ${msg.is_read ? "mt-auto" : ""}`}
                        >
                          <Trash2 size={14} /> DELETE
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </AdminGuard>
  );
}
