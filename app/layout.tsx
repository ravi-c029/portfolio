import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Navbar from "./components/layout/Navbar"; // 👈 UPDATED IMPORT PATH
import "./globals.css";

// 1. Load the Fonts
const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700"] 
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-jakarta", 
  weight: ["400", "500", "600"] 
});

const jetbrains = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono", 
  weight: ["400"] 
});

export const metadata: Metadata = {
  title: "Ravi Kumar | Premium Portfolio",
  description: "2026 AI-Powered Glass Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${jakarta.variable} ${jetbrains.variable} font-sans antialiased overflow-x-hidden bg-slate-900 text-slate-100`}>
        {/* The Animated Background Layer */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-[#0a0a0a]">
          <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/40 blur-[100px] animate-blob" />
          <div className="absolute top-[20%] right-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-500/40 blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-10%] left-[20%] h-[600px] w-[600px] rounded-full bg-pink-500/40 blur-[100px] animate-blob animation-delay-4000" />
        </div>
        
        <Navbar />
        
        {/* Main Content */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}