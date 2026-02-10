"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { usePathname } from "next/navigation"; // 1. Import this
import { Home, User, Code, FolderGit2, Mail } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", icon: <Home size={20} />, id: "hero" },
  { name: "About", icon: <User size={20} />, id: "about" },
  { name: "Skills", icon: <Code size={20} />, id: "skills" },
  { name: "Projects", icon: <FolderGit2 size={20} />, id: "projects" },
  { name: "Contact", icon: <Mail size={20} />, id: "contact" },
];

export default function Navbar() {
  const pathname = usePathname(); // 2. Get current route
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileKeyboardOpen, setIsMobileKeyboardOpen] = useState(false);

  // 🕵️‍♂️ THE TRACKER CODE
  const hasLogged = useRef(false);
  const [visitorId, setVisitorId] = useState<number | null>(null);

  // 1. IDENTIFY VISITOR (The Gatekeeper)
  useEffect(() => {
    // Don't track if we are in Admin panel
    if (pathname.includes("/admin")) return;

    const initTracking = async () => {
      // Check session storage so we don't count refresh as a new visitor
      const storedId = sessionStorage.getItem("visitor_id");
      if (storedId) {
        setVisitorId(parseInt(storedId));
        return;
      }

      try {
        // Get Location
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        // Save to Supabase
        const { data: newVisitor, error } = await supabase
          .from("visitors")
          .insert([
            {
              city: data.city || "Unknown",
              country: data.country_name || "Unknown",
              device: /Mobile/.test(navigator.userAgent) ? "Mobile" : "Desktop",
            },
          ])
          .select()
          .single();

        if (newVisitor) {
          setVisitorId(newVisitor.id);
          sessionStorage.setItem("visitor_id", newVisitor.id.toString());
        }
      } catch (e) {
        console.error("Tracking Error:", e);
      }
    };

    initTracking();
  }, []);
  // 2. TRACK SECTION VIEWS (The Spy)
  useEffect(() => {
    // Only run if we have a Visitor ID and are NOT in admin
    if (!visitorId || pathname.includes("/admin")) return;

    // Debounce: Wait 1.5s to ensure they are actually reading, not just scrolling past
    const timer = setTimeout(async () => {
      await supabase.from("analytics_events").insert([
        {
          visitor_id: visitorId,
          event_name: "VIEWED_SECTION",
          metadata: { section: activeSection }, // 'activeSection' comes from your existing code
        },
      ]);
    }, 1500);

    return () => clearTimeout(timer); // Cancel if they scroll away quickly
  }, [activeSection, visitorId]);

  useEffect(() => {
    if (hasLogged.current) return; // Only run once per session
    hasLogged.current = true;

    const logVisitor = async () => {
      try {
        // 1. Get Location Data (Free service)
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        // 2. Send to Supabase
        await supabase.from("visitors").insert([
          {
            city: data.city || "Unknown",
            country: data.country_name || "Unknown",
            device: /Mobile/.test(navigator.userAgent) ? "Mobile" : "Desktop",
          },
        ]);
      } catch (e) {
        console.error("Tracking blocked by browser");
      }
    };

    // Run only in production (or remove check to test locally)
    logVisitor();
  }, []);

  // ... (Your existing useEffects for Scroll Spy and Keyboard stay here) ...
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section) => {
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (
        window.visualViewport &&
        window.visualViewport.height < window.innerHeight - 100
      ) {
        setIsMobileKeyboardOpen(true);
      } else {
        setIsMobileKeyboardOpen(false);
      }
    };

    const handleFocus = (e: FocusEvent) => {
      if (
        (e.target as HTMLElement).tagName === "INPUT" ||
        (e.target as HTMLElement).tagName === "TEXTAREA"
      ) {
        setIsMobileKeyboardOpen(true);
      }
    };
    const handleBlur = () => setIsMobileKeyboardOpen(false);

    window.visualViewport?.addEventListener("resize", handleResize);
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleBlur);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleBlur);
    };
  }, []);

  // 3. THE FIX: If url contains '/admin', hide the navbar
  if (pathname.includes("/admin")) {
    return null;
  }

  // Existing check for mobile keyboard
  if (isMobileKeyboardOpen) return null;

  return (
    <>
      {/* --- DESKTOP NAV --- */}
      <nav className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-6">
        <div className="flex flex-col gap-4 p-3 rounded-full bg-glass-200 border border-glass-border backdrop-blur-xl shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="relative group p-3 rounded-full transition-all duration-300 hover:bg-white/10"
            >
              <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1 rounded-md bg-glass-300 backdrop-blur-md border border-glass-border text-sm font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">
                {item.name}
              </span>
              <div
                className={`transition-colors duration-300 ${activeSection === item.id ? "text-cyan-400" : "text-slate-400 group-hover:text-white"}`}
              >
                {item.icon}
              </div>
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]"
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* --- MOBILE NAV --- */}
      <nav
        id="navbar"
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[400px]"
      >
        <div className="flex justify-between items-center px-6 py-4 rounded-2xl bg-glass-200 border border-glass-border backdrop-blur-xl shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={`relative p-2 transition-all duration-300 ${
                activeSection === item.id
                  ? "text-cyan-400 -translate-y-2 scale-110"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {item.icon}
              {activeSection === item.id && (
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_cyan]" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
