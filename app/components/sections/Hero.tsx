"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import GlassButton from "../ui/GlassButton";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Hero() {
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      const { data } = await supabase
        .from("site_config")
        .select("resume_url")
        .single();
      if (data?.resume_url) setResumeUrl(data.resume_url);
    };
    fetchResume();
  }, []);
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10 px-6"
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* --- LEFT: Text Content --- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left z-10"
        >
          {/* Badge */}
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md">
            <span className="text-cyan-300 text-sm font-medium tracking-wider">
              Available for 2026 Roles
            </span>
          </div>

          {/* Name & Title */}
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight">
            Hi, I'm <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
              Ravi Kumar Keshari
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
            I work with{" "}
            <span className="text-white font-semibold">
              Data-Driven Solutions & Intelligent Web Systems.
            </span>{" "}
            I also deal with data analysis, machine learning, and full-stack
            development
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <a
              href={resumeUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              download // This forces the browser to download the file
            >
              <GlassButton className="...">DOWNLOAD CV</GlassButton>
            </a>
            <GlassButton href="#projects" variant="secondary" icon="arrow">
              View Projects
            </GlassButton>
          </div>
        </motion.div>

        {/* --- RIGHT: The Glass Orb (Your Identity) --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center"
        >
          {/* The Rotating Rings (Decorative) */}
          <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

          {/* The Glowing Backdrop Blob */}
          <div className="absolute w-[250px] h-[250px] bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 rounded-full blur-[60px] animate-pulse" />

          {/* The Main Image Container */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden group">
            {/* ⚠️ IMPORTANT:
               Replace '/profile-placeholder.jpg' with your actual image path.
               Put your image in the 'public' folder.
            */}
            <Image
              src="/profile.jpg"
              alt="Ravi Kumar"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
            />

            {/* Inner Highlight Ring */}
            <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
          </div>

          {/* Floating Tech Badges (Decorations) */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 top-10 md:right-10 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-xs font-mono text-cyan-300 shadow-lg"
          >
            AI Engineer
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -left-4 bottom-10 md:left-10 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-xs font-mono text-purple-300 shadow-lg"
          >
            Next.js 15
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
