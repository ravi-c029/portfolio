"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Activity } from "lucide-react";

// --- 🔧 TYPESCRIPT FIX (Global Window Extension) ---
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function VoiceCommand() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");
  const [hasGreeted, setHasGreeted] = useState(false); // New state to prevent loop

  // --- 🗣️ NATURAL VOICE ENGINE ---
  const speak = (text: string) => {
    // Check if browser supports speech synthesis
    if (!window.speechSynthesis) return;

    // Cancel any ongoing speech to prevent overlap
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    // Find a good English voice (Google US English or similar)
    utterance.voice =
      voices.find((v) => v.name.includes("Google US English")) ||
      voices.find((v) => v.lang.includes("en")) ||
      null;

    utterance.pitch = 1.0;
    utterance.rate = 1.0;
    utterance.volume = 1.0;

    window.speechSynthesis.speak(utterance);
    setFeedback(text);

    // Clear visual feedback after speech duration (approx)
    setTimeout(() => setFeedback(""), text.length * 50 + 2000);
  };

  // --- 🤖 AUTO INTRO ON LOAD ---
  useEffect(() => {
    // Wait for voices to load (sometimes takes a moment in Chrome)
    const initVoice = () => {
      // Check if we haven't greeted yet and user has interacted (best practice)
      // Note: Browsers block auto-audio until user interaction.
      // We will try, but it might require a click first.

      // Let's set a timeout to simulate "System Booting Up"
      setTimeout(() => {
        if (!hasGreeted) {
          // Optional: You can remove this check if you want it to trigger only on command
          // But since you asked for "Khub se intro de de", we try here.
          // speak("System Online. Welcome to the portfolio of Ravi Kumar. I am ready for your commands.");
          // setHasGreeted(true);
        }
      }, 2000);
    };

    window.speechSynthesis.onvoiceschanged = initVoice;
    initVoice();
  }, [hasGreeted]);

  // --- 🧠 COMMAND PROCESSOR ---
  const processCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase();

    // 1. SELF INTRO (Triggered by user or "Who are you")
    if (
      lowerCmd.includes("who are you") ||
      lowerCmd.includes("intro") ||
      lowerCmd.includes("yourself") ||
      lowerCmd.includes("about")
    ) {
      speak(
        "I am the digital assistant for Ravi Kumar. Ravi is a Creative Developer specializing in Next.js, AI, and building futuristic web experiences. He turns coffee into code and ideas into reality.",
      );
    }
    // 2. SHOW PROJECTS
    else if (
      lowerCmd.includes("project") ||
      lowerCmd.includes("work") ||
      lowerCmd.includes("show")
    ) {
      speak(
        "Affirmative. Pulling up the mission logs. Here are Ravi's top projects.",
      );
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth" });
    }

    // Show Skills
    else if (
      lowerCmd.includes("skills") ||
      lowerCmd.includes("abilities") ||
      lowerCmd.includes("tech stack")
    ) {
      speak(
        "Accessing skill matrix. Ravi is proficient in JavaScript, Python, Next.js, React, Node.js, and has experience with AI and machine learning frameworks.",
      );
      document
        .getElementById("skills")
        ?.scrollIntoView({ behavior: "smooth" });
    }
    // 3. CONTACT
    else if (
      lowerCmd.includes("contact") ||
      lowerCmd.includes("email") ||
      lowerCmd.includes("hire")
    ) {
      speak(
        "Smart choice. Initiating secure communication link. You can send him a message here.",
      );
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }
    // 4. GO HOME
    else if (
      lowerCmd.includes("home") ||
      lowerCmd.includes("top") ||
      lowerCmd.includes("start")
    ) {
      speak("Returning to base.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // 5. GREETING
    else if (lowerCmd.includes("hello") || lowerCmd.includes("hi")) {
      speak("Hello there. I am online and listening.");
    }
    // 6. UNKNOWN
    else {
      speak(
        "Command not recognized. Try asking 'Who are you' or 'Show Projects'.",
      );
    }
  };

  // --- 🎤 LISTENING LOGIC ---
  useEffect(() => {
    // @ts-ignore (Safety check wrapper)
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition: any;

    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "en-US";
      recognition.interimResults = true;

      recognition.onstart = () => setIsListening(true);

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);

        if (event.results[current].isFinal) {
          processCommand(transcriptText);
          setTranscript("");
        }
      };
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when typing in inputs
      if (
        e.code === "Space" &&
        !e.repeat &&
        !isListening &&
        document.activeElement?.tagName !== "TEXTAREA" &&
        document.activeElement?.tagName !== "INPUT"
      ) {
        e.preventDefault();
        recognition?.start();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        recognition?.stop();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      recognition?.abort();
    };
  }, []);

  return (
    <>
      {/* VISUAL FEEDBACK (Only when active) */}
      <AnimatePresence>
        {(isListening || feedback) && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[50] flex flex-col items-center gap-2 pointer-events-none"
          >
            {/* The Orb */}
            <div
              className={`
              w-12 h-12 rounded-full border flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_currentColor]
              ${isListening ? "border-red-500 bg-red-500/10 text-red-500" : "border-cyan-500 bg-cyan-500/10 text-cyan-500"}
            `}
            >
              {isListening ? (
                <Mic className="animate-pulse" size={20} />
              ) : (
                <Activity className="animate-bounce" size={20} />
              )}
            </div>

            {/* The Text */}
            <div className="bg-black/80 border border-slate-700 px-3 py-1 rounded text-[10px] font-mono text-cyan-400 tracking-widest uppercase backdrop-blur-md max-w-[250px] text-center">
              {isListening ? `LISTENING: "${transcript}"` : `AI: "${feedback}"`}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GHOST HINT (Transparent until hover) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 right-4 z-50 hidden md:flex items-center gap-2 cursor-help select-none"
      >
        <span className="text-[8px] font-mono text-cyan-500 tracking-[0.3em] uppercase drop-shadow-[0_0_2px_rgba(6,182,212,0.5)]">
          Hold [Space] Voice_Cmd
        </span>
        <Mic size={12} className="text-cyan-500" />
      </motion.div>
    </>
  );
}
