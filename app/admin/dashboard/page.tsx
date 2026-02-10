"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { supabase } from "@/lib/supabaseClient";
import {
  Activity,
  Users,
  Eye,
  Cpu,
  Edit3,
  FileText,
  Share2,
  PlusSquare,
  Power,
  Terminal,
  MapPin,
  Globe,
  Mail,
} from "lucide-react";
import AdminGuard from "../../components/admin/AdminGuard";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import useSound from "use-sound";

// --- CONFIG: PARTICLE BACKGROUND (The "Neural Net" Look) ---
const particlesOptions: any = {
  background: { color: { value: "#000000" } },
  fpsLimit: 60,
  particles: {
    color: { value: "#06b6d4" }, // Cyan
    links: {
      color: "#06b6d4",
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1,
    },
    move: { enable: true, speed: 0.8 },
    number: { density: { enable: true, area: 800 }, value: 60 },
    opacity: { value: 0.3 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 2 } },
  },
  detectRetina: true,
};

type Log = {
  id: number;
  event_name: string;
  metadata: any;
  timestamp: string;
  visitors: { city: string; country: string; device: string };
};

export default function Dashboard() {
  const router = useRouter();

  // Data State
  const [visitorCount, setVisitorCount] = useState(0);
  const [liveLogs, setLiveLogs] = useState<Log[]>([]);
  const [systemHealth, setSystemHealth] = useState(98);

  // Audio FX
  const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.2 });
  const [playAlert] = useSound("/sounds/denied.mp3", { volume: 0.5 }); // New visitor alert

  // Particles Init
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  // Real-Time Logic
  useEffect(() => {
    // 1. Initial Load
    const fetchStats = async () => {
      const { count } = await supabase
        .from("visitors")
        .select("*", { count: "exact", head: true });
      if (count) setVisitorCount(count);

      const { data } = await supabase
        .from("analytics_events")
        .select(
          `id, event_name, metadata, timestamp, visitors ( city, country, device )`,
        )
        .order("timestamp", { ascending: false })
        .limit(10);
      if (data) setLiveLogs(data as any);
    };
    fetchStats();

    // 2. LIVE RADAR (Supabase Realtime)
    const channel = supabase
      .channel("dashboard_spy")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "analytics_events" },
        async (payload) => {
          playAlert(); // 🔊 BEEP! New Data!

          const { data: visitorData } = await supabase
            .from("visitors")
            .select("city, country, device")
            .eq("id", payload.new.visitor_id)
            .single();

          const newLog = { ...payload.new, visitors: visitorData } as Log;

          setLiveLogs((prev) => [newLog, ...prev.slice(0, 14)]); // Keep last 15 logs
          if (payload.new.event_name === "PAGE_VIEW")
            setVisitorCount((p) => p + 1);

          // Simulate System Load spike on new visitor
          setSystemHealth(Math.floor(Math.random() * (99 - 85) + 85));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [playAlert]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/admin");
  };

  return (
    <AdminGuard>
      {/* FIX 1: Changed 'overflow-hidden' to 'overflow-x-hidden'.
         This allows the page to scroll vertically on mobile while keeping horizontal contained.
      */}
      <div className="min-h-screen bg-black text-cyan-500 font-mono relative overflow-x-hidden selection:bg-cyan-500/30">
        {/* --- LAYER 0: PARTICLES & GRID --- */}
        {/* Changed to fixed so background stays put while scrolling */}
        <div className="fixed inset-0 z-0">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
        </div>

        {/* --- LAYER 1: HUD OVERLAY (Vignette & Scanlines) --- */}
        <div className="fixed inset-0 pointer-events-none z-50 bg-[url('/scanline.png')] opacity-10" />
        <div className="fixed inset-0 pointer-events-none z-50 bg-radial-gradient(circle, transparent 60%, black 100%)" />

        {/* --- MAIN INTERFACE --- */}
        {/* FIX 2: Changed 'h-screen' to 'lg:h-screen min-h-screen'.
            On mobile, it grows with content. On Desktop (lg), it locks to screen height for that "Dashboard" feel.
        */}
        <div className="relative z-10 p-4 md:p-6 max-w-[1600px] mx-auto lg:h-screen min-h-screen flex flex-col">
          {/* HEADER */}
          <header className="flex flex-col md:flex-row justify-between md:items-end border-b border-cyan-500/30 pb-4 mb-6 bg-black/40 backdrop-blur-sm gap-4 md:gap-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-cyan-500/50 rounded flex items-center justify-center bg-cyan-500/10 shadow-[0_0_15px_cyan]">
                <Activity className="animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-[0.2em] text-white">
                  MAINFRAME
                </h1>
                <p className="text-[10px] text-cyan-400/60 tracking-widest">
                  SECURE UPLINK ESTABLISHED //{" "}
                  <span className="text-green-400">ONLINE</span>
                </p>
              </div>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-cyan-500/50">SYSTEM_INTEGRITY</p>
              <div className="w-32 h-2 bg-gray-900 rounded-full mt-1 overflow-hidden border border-cyan-500/30">
                <motion.div
                  animate={{ width: `${systemHealth}%` }}
                  className="h-full bg-cyan-400 shadow-[0_0_10px_cyan]"
                />
              </div>
            </div>
          </header>

          {/* CONTENT GRID */}
          {/* FIX 3: Added 'lg:flex-1 lg:min-h-0'. 
              On desktop, we restrict height to force internal scrolling. On mobile, we let it flow naturally.
          */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:flex-1 lg:min-h-0">
            {/* --- COL 1: LEFT SIDEBAR (Stats) --- */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <HUDCard
                label="TOTAL TRAFFIC"
                value={visitorCount.toLocaleString()}
                icon={Globe}
                color="cyan"
                delay={0}
              />
              <HUDCard
                label="LIVE NODES"
                value="1"
                icon={Users}
                color="green"
                delay={0.1}
              />
              <HUDCard
                label="CPU THREADS"
                value="12"
                icon={Cpu}
                color="purple"
                delay={0.2}
              />

              {/* Mini Map Visual */}
              <div className="h-48 lg:flex-1 border border-cyan-500/20 bg-black/40 rounded-xl p-4 relative overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/U3qYN8S0j3bpK/giphy.gif')] opacity-20 bg-cover mix-blend-screen" />
                <MapPin
                  className="text-red-500 animate-bounce relative z-10 drop-shadow-[0_0_10px_red]"
                  size={32}
                />
                <p className="text-xs mt-2 relative z-10 tracking-widest bg-black/50 px-2">
                  TRACKING TARGETS
                </p>
              </div>
            </div>

            {/* --- COL 2: CENTER (The Terminal) --- */}
            {/* FIX 4: Added 'h-[500px] lg:h-full'. 
                On mobile, gives the terminal a fixed usable height. On desktop, fills remaining space.
            */}
            <div className="lg:col-span-6 flex flex-col h-[500px] lg:h-full">
              <div className="flex-1 bg-black/80 border border-cyan-500/30 rounded-xl overflow-hidden relative shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col">
                {/* Terminal Header */}
                <div className="bg-cyan-900/20 p-2 border-b border-cyan-500/30 flex justify-between items-center px-4">
                  <span className="text-xs font-bold tracking-widest flex items-center gap-2">
                    <Terminal size={12} /> LIVE_FEED_V2.0
                  </span>
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  </div>
                </div>

                {/* The Logs */}
                <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3 custom-scrollbar">
                  <AnimatePresence initial={false}>
                    {liveLogs.map((log) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -50, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: "auto" }}
                        exit={{ opacity: 0 }}
                        className="border-l-2 border-cyan-500/30 pl-3 py-1 hover:bg-white/5 transition-colors group"
                      >
                        <div className="flex gap-2 opacity-50 text-[10px] flex-wrap">
                          <span>
                            [{new Date(log.timestamp).toLocaleTimeString()}]
                          </span>
                          <span>
                            IP_HASH: ***.***.{Math.floor(Math.random() * 99)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-cyan-100 flex-wrap">
                          <span
                            className={
                              log.event_name === "VIEWED_SECTION"
                                ? "text-yellow-400"
                                : "text-green-400"
                            }
                          >
                            {log.event_name === "VIEWED_SECTION"
                              ? ">> SCANNING"
                              : ">> DETECTED"}
                          </span>
                          <span className="font-bold uppercase tracking-wider glow-text">
                            {log.metadata?.section ||
                              log.metadata?.target ||
                              "ENTRY_POINT"}
                          </span>
                        </div>
                        <div className="text-[10px] text-cyan-600 mt-1 group-hover:text-cyan-400 transition-colors">
                          LOCATION: {log.visitors?.city},{" "}
                          {log.visitors?.country} // DEVICE:{" "}
                          {log.visitors?.device}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {liveLogs.length === 0 && (
                    <div className="text-cyan-900 text-center mt-20 animate-pulse">
                      AWAITING INPUT STREAM...
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* --- COL 3: RIGHT SIDEBAR (Controls) --- */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <h2 className="text-xs font-bold tracking-[0.3em] text-white/50 border-b border-white/10 pb-2">
                COMMANDS
              </h2>

              <ControlKey
                title="PROJECTS"
                sub="INIT_UPDATE"
                icon={PlusSquare}
                color="cyan"
                onClick={() => router.push("/admin/projects")}
                onHover={playHover}
              />
              <ControlKey
                title="RESUME"
                sub="UPLOAD_PDF"
                icon={FileText}
                color="purple"
                onClick={() => router.push("/admin/resume")}
                onHover={playHover}
              />
              <ControlKey
                title="AI BRAIN"
                sub="EDIT_KNOWLEDGE"
                icon={Share2}
                color="green"
                onClick={() => router.push("/admin/ai-brain")}
                onHover={playHover}
              />
              <ControlKey
                title="INBOX"
                sub="SECURE_MESSAGES"
                icon={Mail}
                color="cyan" // or "yellow" if you want it to pop
                onClick={() => router.push("/admin/messages")}
                onHover={playHover}
              />

              <div className="mt-6 lg:mt-auto pt-6 border-t border-red-500/30">
                <button
                  onClick={handleLogout}
                  onMouseEnter={() => playHover()}
                  className="w-full group relative overflow-hidden bg-red-950/30 border border-red-500/50 p-4 rounded-xl flex items-center justify-center gap-3 hover:bg-red-500 hover:text-black transition-all duration-300"
                >
                  <Power className="group-hover:animate-pulse" />
                  <span className="font-black tracking-widest text-sm">
                    EMERGENCY SHUTDOWN
                  </span>
                  {/* Hazard Stripes */}
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)] opacity-50" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}

// --- SUB COMPONENTS FOR THAT "IRON MAN" FEEL ---

function HUDCard({ label, value, icon: Icon, color, delay }: any) {
  const colors: any = {
    cyan: "text-cyan-400 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]",
    green:
      "text-green-400 border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]",
    purple:
      "text-purple-400 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.1)]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={`bg-black/50 backdrop-blur-md border p-4 rounded-xl flex items-center justify-between relative overflow-hidden group ${colors[color]}`}
    >
      <div className="relative z-10">
        <p className="text-[9px] font-bold tracking-widest opacity-70 mb-1">
          {label}
        </p>
        <h3 className="text-2xl font-mono font-bold text-white">{value}</h3>
      </div>
      <Icon
        className="opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
        size={24}
      />

      {/* Scanning Light Effect */}
      <div className="absolute top-0 bottom-0 w-1 bg-white/20 blur-md left-0 group-hover:left-100% transition-all duration-1000" />
    </motion.div>
  );
}

function ControlKey({ title, sub, icon: Icon, color, onClick, onHover }: any) {
  const colors: any = {
    cyan: "hover:border-cyan-400 hover:shadow-[0_0_15px_cyan] hover:text-cyan-400",
    purple:
      "hover:border-purple-400 hover:shadow-[0_0_15px_purple] hover:text-purple-400",
    green:
      "hover:border-green-400 hover:shadow-[0_0_15px_green] hover:text-green-400",
  };

  return (
    <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05}>
      <button
        onClick={onClick}
        onMouseEnter={onHover}
        className={`w-full bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4 transition-all duration-300 group ${colors[color]}`}
      >
        <div className="p-2 bg-black/50 rounded-lg border border-white/5 group-hover:border-current transition-colors">
          <Icon size={20} />
        </div>
        <div className="text-left">
          <h4 className="font-bold tracking-widest text-sm text-white">
            {title}
          </h4>
          <p className="text-[9px] text-white/40 group-hover:text-white/80">
            {sub}
          </p>
        </div>
        {/* Arrow */}
        <div className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
          →
        </div>
      </button>
    </Tilt>
  );
}