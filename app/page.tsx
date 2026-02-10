import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills"; // Import New Section
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import VirtualMe from "./components/ui/VirtualMe";
import RecruiterHUD from "./components/ui/RecruiterHUD";
import CommandCenter from "./components/ui/CommandCenter";
import LivingFooter from "./components/ui/LivingFooter";
import Copyright from "./components/ui/Copyright";
import SciFiCursor from "./components/ui/SciFiCursor";
import StealthMode from "./components/ui/StealthMode";
import VoiceCommand from "./components/ui/VoiceCommand";
import SystemBoot from "./components/ui/SystemBoot";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 pb-20">
      <SystemBoot />
      {/* 1. Hero (The Portal) */}
      <Hero />

      {/* 2. About (The Dossier) */}
      <About />

      {/* 3. Skills (The Reactor - NEW & SCI-FI) */}
      <Skills />

      {/* 4. Projects (The Hangar) */}
      <Projects />

      {/* 5. Contact (Coming Soon) */}
      <Contact />

      <RecruiterHUD />
      <CommandCenter />
      {/* 
      6. THE FOOTER (New)
      <footer className="py-8 text-center border-t border-white/5 bg-transparent/40 backdrop-blur-md">
        {" "}
        <p className="text-[10px] font-mono text-slate-600 tracking-widest uppercase">
          © 2026 Ravi Kumar Keshari. All rights reserved.
        </p>
      </footer> */}
      <LivingFooter />
      <Copyright />
      <VirtualMe />
      <SciFiCursor />
      <StealthMode />
      <VoiceCommand />
    </div>
  );
}
