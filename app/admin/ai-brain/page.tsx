// "use client";

// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Brain,
//   Save,
//   Trash2,
//   Zap,
//   Sparkles,
//   MessageSquare,
//   ArrowLeft,
//   Upload,
// } from "lucide-react";
// import AdminGuard from "../../components/admin/AdminGuard";
// import { useRouter } from "next/navigation";

// export default function AIBrainEditor() {
//   const router = useRouter();
//   const [facts, setFacts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [newFact, setNewFact] = useState({
//     category: "General",
//     fact: "",
//     importance: 3,
//   });

//   const [ingesting, setIngesting] = useState(false);
//   const handleIngestPDF = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setIngesting(true);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("category", "PDF_Upload");

//     try {
//       const res = await fetch("/api/ingest-pdf", {
//         method: "POST",
//         body: formData,
//       });
//       if (res.ok) {
//         alert("🧠 BRAIN UPDATED VIA PDF SCAN");
//         fetchFacts(); // Refresh the list after successful PDF ingestion
//       }
//     } catch (err) {
//       alert("❌ SCAN FAILED");
//     } finally {
//       setIngesting(false);
//     }
//   };

//   useEffect(() => {
//     fetchFacts();
//   }, []);

//   const fetchFacts = async () => {
//     const { data } = await supabase
//       .from("ai_knowledge_base")
//       .select("*")
//       .order("created_at", { ascending: false });
//     if (data) setFacts(data);
//     setLoading(false);
//   };

//   const handleAddFact = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newFact.fact) return;

//     const { error } = await supabase
//       .from("ai_knowledge_base")
//       .insert([newFact]);
//     if (!error) {
//       setNewFact({ category: "General", fact: "", importance: 3 });
//       fetchFacts();
//     }
//   };

//   const deleteFact = async (id: number) => {
//     await supabase.from("ai_knowledge_base").delete().eq("id", id);
//     fetchFacts();
//   };

//   return (
//     <AdminGuard>
//       <div className="border-2 border-dashed border-cyan-500/20 rounded-2xl p-6 bg-cyan-500/5 mb-8">
//         <h3 className="text-xs font-bold mb-4 flex items-center gap-2">
//           <Upload size={14} /> NEURAL_DOCUMENT_SCANNER
//         </h3>
//         <input
//           type="file"
//           accept=".pdf"
//           onChange={handleIngestPDF}
//           className="text-xs text-cyan-400 file:bg-cyan-500 file:text-black file:border-none file:px-4 file:py-2 file:rounded-lg cursor-pointer"
//         />
//         {ingesting && (
//           <p className="text-[10px] animate-pulse mt-2">
//             SCANNING DOCUMENT... EXTRACTING KNOWLEDGE...
//           </p>
//         )}
//       </div>
//       <div className="min-h-screen bg-black text-cyan-400 font-mono p-4 md:p-10 relative overflow-hidden">
//         {/* Futuristic Background */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none" />

//         <header className="max-w-6xl mx-auto flex items-center justify-between mb-12 border-b border-cyan-900/50 pb-6 relative z-10">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => router.back()}
//               className="p-2 hover:bg-cyan-500/10 rounded-full border border-cyan-500/20"
//             >
//               <ArrowLeft size={20} />
//             </button>
//             <div>
//               <h1 className="text-3xl font-black tracking-tighter text-white flex items-center gap-3">
//                 <Brain className="text-cyan-400 animate-pulse" /> BRAIN_TUNER_V1
//               </h1>
//               <p className="text-[10px] text-cyan-500/50 tracking-widest uppercase mt-1">
//                 Cognitive Data Management System
//               </p>
//             </div>
//           </div>
//         </header>

//         <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 relative z-10">
//           {/* LEFT: INPUT NEURON (The Form) */}
//           <section className="bg-cyan-950/10 border border-cyan-500/20 p-8 rounded-[2rem] backdrop-blur-xl relative overflow-hidden h-fit">
//             <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
//               <Sparkles size={150} />
//             </div>

//             <h2 className="text-sm font-bold text-white mb-8 flex items-center gap-2 tracking-[0.3em]">
//               <Zap size={14} className="text-yellow-400" /> INJECT_NEW_FACT
//             </h2>

//             <form onSubmit={handleAddFact} className="space-y-6">
//               <div>
//                 <label className="text-[10px] text-cyan-500/50 mb-2 block uppercase">
//                   Category
//                 </label>
//                 <select
//                   value={newFact.category}
//                   onChange={(e) =>
//                     setNewFact({ ...newFact, category: e.target.value })
//                   }
//                   className="w-full bg-black border border-cyan-500/20 rounded-xl p-4 text-sm focus:border-cyan-400 outline-none transition-all"
//                 >
//                   <option>General</option>
//                   <option>Projects</option>
//                   <option>Experience</option>
//                   <option>Skills</option>
//                   <option>Personality</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="text-[10px] text-cyan-500/50 mb-2 block uppercase">
//                   Fact / Information
//                 </label>
//                 <textarea
//                   value={newFact.fact}
//                   onChange={(e) =>
//                     setNewFact({ ...newFact, fact: e.target.value })
//                   }
//                   className="w-full bg-black border border-cyan-500/20 rounded-xl p-4 text-sm focus:border-cyan-400 outline-none h-32 transition-all"
//                   placeholder="e.g. Ravi developed Ravi Medical Agency using Next.js and Supabase in 30 days."
//                 />
//               </div>

//               <button className="w-full py-4 bg-cyan-500 text-black font-black rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-3">
//                 <Save size={18} /> SYNC_TO_BRAIN
//               </button>
//             </form>
//           </section>

//           {/* RIGHT: KNOWLEDGE STREAM (The List) */}
//           <section className="space-y-6">
//             <div className="flex justify-between items-end border-b border-cyan-900/50 pb-2">
//               <h2 className="text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2">
//                 <MessageSquare size={14} /> Knowledge_Stream
//               </h2>
//               <span className="text-[10px] text-cyan-500">
//                 {facts.length} NODES_ACTIVE
//               </span>
//             </div>

//             <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
//               <AnimatePresence>
//                 {facts.map((f) => (
//                   <motion.div
//                     key={f.id}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     className="bg-white/5 border border-white/10 p-5 rounded-2xl group hover:border-cyan-500/40 transition-all relative overflow-hidden"
//                   >
//                     <div className="flex justify-between items-start mb-2">
//                       <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20">
//                         {f.category}
//                       </span>
//                       <button
//                         onClick={() => deleteFact(f.id)}
//                         className="opacity-0 group-hover:opacity-100 text-red-500 hover:scale-110 transition-all"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                     <p className="text-sm text-slate-300 leading-relaxed">
//                       {f.fact}
//                     </p>
//                     <div className="mt-3 flex gap-1">
//                       {[...Array(f.importance)].map((_, i) => (
//                         <div
//                           key={i}
//                           className="w-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_5px_cyan]"
//                         />
//                       ))}
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//           </section>
//         </div>
//       </div>
//     </AdminGuard>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Save,
  Trash2,
  Zap,
  Sparkles,
  MessageSquare,
  ArrowLeft,
  Upload,
  Loader2,
  FileText,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import AdminGuard from "../../components/admin/AdminGuard";
import { useRouter } from "next/navigation";

export default function AIBrainEditor() {
  const router = useRouter();
  const [facts, setFacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // States for Manual Input
  const [newFact, setNewFact] = useState({
    category: "General",
    fact: "",
    importance: 3,
  });

  // States for PDF Ingestion
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [ingesting, setIngesting] = useState(false);

  useEffect(() => {
    fetchFacts();
  }, []);

  const fetchFacts = async () => {
    const { data } = await supabase
      .from("ai_knowledge_base")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setFacts(data);
    setLoading(false);
  };

  const handleAddFact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFact.fact) return;
    const { error } = await supabase
      .from("ai_knowledge_base")
      .insert([newFact]);
    if (!error) {
      setNewFact({ category: "General", fact: "", importance: 3 });
      fetchFacts();
    }
  };

  const handleIngestPDF = async () => {
    if (!pdfFile) return;

    setIngesting(true);
    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      const res = await fetch("/api/ingest-pdf", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        alert(`✅ BRAIN UPDATED: ${data.count} new facts extracted.`);
        setPdfFile(null); // Clear the scanner
        fetchFacts(); // Refresh the Knowledge Stream list
      } else {
        const errorData = await res.json();
        alert(`❌ UPLINK FAILED: ${errorData.error}`);
      }
    } catch (err) {
      alert("❌ CRITICAL ERROR: Connection to Neural Port lost.");
    } finally {
      setIngesting(false);
    }
  };

  const deleteFact = async (id: number) => {
    await supabase.from("ai_knowledge_base").delete().eq("id", id);
    fetchFacts();
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-black text-cyan-500 font-mono relative overflow-hidden selection:bg-cyan-500/30">
        {/* --- BACKGROUND FX --- */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient(circle at 50% 50%, rgba(6,182,212,0.1), transparent 80%) pointer-events-none" />

        <div className="relative z-10 p-4 md:p-10 max-w-7xl mx-auto">
          {/* --- HEADER --- */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-cyan-500/20 pb-8">
            <div className="flex items-center gap-6">
              <button
                onClick={() => router.back()}
                className="p-3 bg-white/5 hover:bg-cyan-500/20 text-cyan-400 rounded-full transition-all border border-white/10 hover:border-cyan-500/50"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-3xl font-black tracking-widest text-white uppercase flex items-center gap-3">
                  <Brain className="text-cyan-400 animate-pulse" />{" "}
                  Brain_Tuner_V2
                </h1>
                <div className="flex items-center gap-2 text-[10px] text-cyan-400/60 tracking-[0.2em] mt-1">
                  <ShieldCheck size={12} /> IDENTITY_SYNC: SECURE
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            {/* --- LEFT: INGESTION COMMANDS --- */}
            <div className="lg:col-span-7 space-y-8">
              {/* 🧬 NEURAL DOCUMENT SCANNER */}
              <div className="bg-black/60 border border-cyan-500/30 p-8 rounded-3xl relative overflow-hidden backdrop-blur-xl group">
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none text-cyan-500">
                  <Cpu size={100} strokeWidth={1} />
                </div>

                <h2 className="text-sm font-bold text-white mb-8 flex items-center gap-2 tracking-[0.3em]">
                  <Sparkles size={14} className="text-cyan-400" />{" "}
                  Neural_Ingestion_Port
                </h2>

                <div className="relative border-2 border-dashed border-cyan-500/20 rounded-2xl p-8 text-center bg-cyan-500/5 hover:bg-cyan-500/10 transition-all group-hover:border-cyan-500/50 overflow-hidden">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                  />

                  {/* Scanning Animation (Only when file is selected) */}
                  {pdfFile && (
                    <motion.div
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_cyan] z-10 pointer-events-none"
                    />
                  )}

                  {pdfFile ? (
                    <div className="space-y-4">
                      <FileText size={48} className="text-cyan-400 mx-auto" />
                      <p className="text-white font-bold tracking-widest uppercase">
                        {pdfFile.name}
                      </p>
                      <p className="text-[10px] text-cyan-500/60 uppercase">
                        Ready for Neural Extraction
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 opacity-40 group-hover:opacity-100 transition-opacity">
                      <Upload size={48} className="mx-auto" />
                      <p className="text-xs tracking-[0.2em] font-bold">
                        Inject PDF Identity Data
                      </p>
                      <p className="text-[10px] text-white/30">
                        Drag & Drop Resume or Certificates
                      </p>
                    </div>
                  )}
                </div>

                {pdfFile && (
                  <button
                    onClick={handleIngestPDF} // 👈 Call the new function
                    disabled={ingesting || !pdfFile}
                    className="w-full mt-6 py-4 bg-cyan-500 text-black font-black rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                  >
                    {ingesting ? "ANALYZING..." : "EXECUTE_UPLINK"}
                  </button>
                )}
              </div>

              {/* 🛠️ MANUAL FACT INJECTION */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden backdrop-blur-md">
                <h2 className="text-sm font-bold text-white mb-8 flex items-center gap-2 tracking-[0.3em]">
                  <Zap size={14} className="text-yellow-400" />{" "}
                  Manual_Memory_Write
                </h2>

                <form onSubmit={handleAddFact} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] text-cyan-500/50 tracking-widest">
                        CATEGORY
                      </label>
                      <select
                        value={newFact.category}
                        onChange={(e) =>
                          setNewFact({ ...newFact, category: e.target.value })
                        }
                        className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white focus:border-cyan-500 outline-none transition-all"
                      >
                        <option>General</option>
                        <option>Projects</option>
                        <option>Experience</option>
                        <option>Skills</option>
                        <option>Personality</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-cyan-500/50 tracking-widest">
                        PRIORITY_LEVEL
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={newFact.importance}
                        onChange={(e) =>
                          setNewFact({
                            ...newFact,
                            importance: parseInt(e.target.value),
                          })
                        }
                        className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white focus:border-cyan-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-cyan-500/50 tracking-widest">
                      DATA_STRING
                    </label>
                    <textarea
                      value={newFact.fact}
                      onChange={(e) =>
                        setNewFact({ ...newFact, fact: e.target.value })
                      }
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm text-white focus:border-cyan-500 outline-none h-32 transition-all font-sans leading-relaxed"
                      placeholder="Inject specific information into the AI knowledge base..."
                    />
                  </div>

                  <button className="w-full py-4 bg-white/5 border border-cyan-500/30 text-cyan-400 font-bold rounded-xl hover:bg-cyan-500 hover:text-black transition-all flex items-center justify-center gap-3 tracking-widest">
                    <Save size={18} /> Sync_To_Mainframe
                  </button>
                </form>
              </div>
            </div>

            {/* --- RIGHT: KNOWLEDGE STREAM (Live Feed) --- */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-sm font-bold text-white tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    Knowledge_Stream
                  </h2>
                  <p className="text-[10px] text-white/40 mt-1 uppercase">
                    Active Neural Nodes
                  </p>
                </div>
                <span className="text-xs font-mono text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">
                  {facts.length} NODES
                </span>
              </div>

              <div className="space-y-4 max-h-[850px] overflow-y-auto pr-2 custom-scrollbar pb-20">
                <AnimatePresence>
                  {facts.map((f, i) => (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white/5 border border-white/10 p-5 rounded-2xl group hover:border-cyan-500/50 transition-all relative"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-bold bg-cyan-950/50 text-cyan-400 px-2 py-1 rounded border border-cyan-500/20 tracking-tighter uppercase">
                          {f.category}
                        </span>
                        <button
                          onClick={() => deleteFact(f.id)}
                          className="p-1.5 bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed font-sans">
                        {f.fact}
                      </p>

                      {/* Priority Indicators */}
                      <div className="mt-4 flex gap-1.5">
                        {[...Array(f.importance)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_cyan]"
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {facts.length === 0 && !loading && (
                  <div className="p-10 border-2 border-dashed border-white/10 rounded-2xl text-center text-white/20 font-mono italic">
                    BRAIN_EMPTY. NO_DATA_DETECTED.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
