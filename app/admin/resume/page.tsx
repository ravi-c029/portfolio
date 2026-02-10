// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import { motion } from "framer-motion";
// import { ArrowLeft, Upload, FileText, CheckCircle, AlertTriangle, Download, RefreshCw } from "lucide-react";
// import AdminGuard from "../../components/admin/AdminGuard";

// export default function ResumeManager() {
//   const router = useRouter();
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [currentResume, setCurrentResume] = useState<string | null>(null);
//   const [lastUpdated, setLastUpdated] = useState<string | null>(null);

//   // 1. Fetch Current Resume from Database
//   useEffect(() => {
//     fetchResumeData();
//   }, []);

//   const fetchResumeData = async () => {
//     const { data } = await supabase.from('site_config').select('resume_url, updated_at').single();
//     if (data) {
//       setCurrentResume(data.resume_url);
//       setLastUpdated(new Date(data.updated_at).toLocaleDateString());
//     }
//   };

//   // 2. Handle Upload
//   const handleUpload = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) return alert("❌ NO FILE DETECTED");

//     setUploading(true);
//     try {
//       const fileExt = file.name.split('.').pop();
//       const fileName = `resume_${Date.now()}.${fileExt}`;

//       // A. Upload to Storage
//       const { error: uploadError } = await supabase.storage
//         .from('resume') // 👈 Make sure bucket is named 'resume'
//         .upload(fileName, file);

//       if (uploadError) throw uploadError;

//       // B. Get Public Link
//       const { data: publicData } = supabase.storage
//         .from('resume')
//         .getPublicUrl(fileName);

//       // C. Update Database
//       const { error: dbError } = await supabase
//         .from('site_config')
//         .update({ resume_url: publicData.publicUrl, updated_at: new Date() })
//         .eq('id', 1); // Assuming you have one row with ID 1 (from our SQL setup)

//       if (dbError) throw dbError;

//       alert("✅ RESUME TRANSMITTED SUCCESSFULLY");
//       setFile(null);
//       fetchResumeData();

//     } catch (error: any) {
//       alert("❌ UPLOAD FAILED: " + error.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <AdminGuard>
//       <div className="min-h-screen bg-black text-cyan-500 font-mono relative overflow-hidden selection:bg-cyan-500/30">
        
//         {/* Background FX */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

//         <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-10">
          
//           {/* Header */}
//           <header className="flex items-center gap-4 mb-12 border-b border-purple-500/30 pb-6">
//              <button onClick={() => router.back()} className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all">
//                 <ArrowLeft size={20} />
//              </button>
//              <div>
//                 <h1 className="text-3xl font-black tracking-widest text-white uppercase flex items-center gap-3">
//                    <FileText className="text-purple-500" /> IDENTITY_DOCS
//                 </h1>
//                 <p className="text-xs text-purple-400/60 tracking-[0.3em]">CLASSIFIED UPLINK // SECURE</p>
//              </div>
//           </header>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
//             {/* --- LEFT: CURRENT STATUS --- */}
//             <div className="space-y-6">
//                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
//                   <div className="absolute top-0 right-0 p-4 opacity-10"><FileText size={150} /></div>
                  
//                   <h2 className="text-sm font-bold text-white/50 tracking-widest mb-6">CURRENT_FIRMWARE</h2>

//                   {currentResume ? (
//                     <div className="space-y-6">
//                        <div className="flex items-center gap-4">
//                           <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
//                              <CheckCircle size={32} className="text-green-400" />
//                           </div>
//                           <div>
//                              <h3 className="text-xl font-bold text-white">ACTIVE & ONLINE</h3>
//                              <p className="text-xs text-green-400 font-mono mt-1">Last Update: {lastUpdated}</p>
//                           </div>
//                        </div>

//                        <div className="p-4 bg-black/40 rounded-xl border border-white/10 font-mono text-xs text-white/60 break-all">
//                           {currentResume}
//                        </div>

//                        <a 
//                          href={currentResume} 
//                          target="_blank" 
//                          className="flex items-center justify-center gap-2 w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_purple]"
//                        >
//                           <Download size={18} /> TEST DOWNLOAD
//                        </a>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col items-center justify-center h-48 text-red-400">
//                        <AlertTriangle size={48} className="mb-2 animate-pulse" />
//                        <p className="tracking-widest font-bold">NO FILE FOUND</p>
//                     </div>
//                   )}
//                </div>
//             </div>

//             {/* --- RIGHT: UPLOAD TERMINAL --- */}
//             <div className="bg-black/40 border border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl relative">
//                <h2 className="text-sm font-bold text-white/50 tracking-widest mb-6 flex items-center gap-2">
//                   <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" /> UPLOAD NEW DATA
//                </h2>

//                <form onSubmit={handleUpload} className="space-y-6">
                  
//                   {/* Holographic Dropzone */}
//                   <div className="relative group cursor-pointer">
//                      <input 
//                        type="file" 
//                        accept=".pdf"
//                        onChange={(e) => setFile(e.target.files?.[0] || null)}
//                        className="absolute inset-0 opacity-0 cursor-pointer z-20"
//                      />
//                      <div className="border-2 border-dashed border-purple-500/30 rounded-2xl p-10 flex flex-col items-center justify-center bg-purple-500/5 group-hover:bg-purple-500/10 group-hover:border-purple-400 transition-all duration-300">
                        
//                         {/* Scanning Bar Animation */}
//                         <motion.div 
//                           animate={{ top: ["0%", "100%", "0%"] }}
//                           transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//                           className="absolute left-0 right-0 h-[2px] bg-purple-400/50 shadow-[0_0_15px_purple] mx-4 pointer-events-none"
//                         />

//                         {file ? (
//                            <div className="text-center">
//                               <FileText size={48} className="text-purple-400 mx-auto mb-4" />
//                               <p className="text-white font-bold text-lg">{file.name}</p>
//                               <p className="text-xs text-purple-400 mt-2">READY FOR TRANSMISSION</p>
//                            </div>
//                         ) : (
//                            <div className="text-center opacity-60 group-hover:opacity-100 transition-opacity">
//                               <Upload size={48} className="text-white mx-auto mb-4" />
//                               <p className="text-sm font-bold tracking-widest text-white">DROP PDF FILE</p>
//                               <p className="text-[10px] text-white/50 mt-2">SECURE SERVER ACCESS ONLY</p>
//                            </div>
//                         )}
//                      </div>
//                   </div>

//                   <button 
//                      disabled={uploading || !file}
//                      className="w-full py-4 bg-white text-black font-black tracking-widest rounded-xl hover:bg-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                      {uploading ? (
//                         <><RefreshCw className="animate-spin" /> UPLOADING...</>
//                      ) : (
//                         "INITIATE UPLOAD"
//                      )}
//                   </button>
//                </form>
//             </div>

//           </div>

//         </div>
//       </div>
//     </AdminGuard>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Upload, FileText, CheckCircle, 
  AlertTriangle, Download, RefreshCw, ShieldCheck, 
  Zap, Database, Cpu
} from "lucide-react";
import AdminGuard from "../../components/admin/AdminGuard";

export default function ResumeManager() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [currentResume, setCurrentResume] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    fetchResumeData();
  }, []);

  const fetchResumeData = async () => {
    const { data } = await supabase.from('site_config').select('resume_url, updated_at').single();
    if (data) {
      setCurrentResume(data.resume_url);
      setLastUpdated(new Date(data.updated_at).toLocaleDateString());
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `firmware_v${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('resume')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage
        .from('resume')
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase
        .from('site_config')
        .update({ resume_url: publicData.publicUrl, updated_at: new Date() })
        .eq('id', 1);

      if (dbError) throw dbError;

      setFile(null);
      fetchResumeData();
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-black text-purple-400 font-mono relative overflow-hidden selection:bg-purple-500/30">
        
        {/* --- DYNAMIC SCI-FI BACKGROUND --- */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(168,85,247,0.15),transparent_50%)]" />
        </div>

        {/* SCANLINE EFFECT */}
        <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_2px,3px_100%]" />

        <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-12">
          
          {/* HEADER */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 border-b border-purple-500/20 pb-8">
             <div className="flex items-center gap-6">
                <motion.button 
                  whileHover={{ scale: 1.1, x: -5 }}
                  onClick={() => router.back()} 
                  className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 hover:bg-purple-500/20 transition-all"
                >
                   <ArrowLeft size={24} />
                </motion.button>
                <div>
                   <h1 className="text-4xl font-black tracking-[0.2em] text-white uppercase drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                      Identity_Core
                   </h1>
                   <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-2 text-[10px] tracking-widest text-purple-400/60">
                         <ShieldCheck size={12} /> ENCRYPTION: AES-256
                      </span>
                      <span className="w-1 h-1 bg-purple-500 rounded-full" />
                      <span className="text-[10px] tracking-widest text-green-400/60 uppercase animate-pulse">
                         Live_Uplink_Active
                      </span>
                   </div>
                </div>
             </div>

             <div className="hidden lg:flex items-center gap-8">
                <div className="text-right">
                   <p className="text-[10px] text-purple-400/40 uppercase tracking-tighter">System_Load</p>
                   <div className="w-32 h-1 bg-purple-900/30 mt-1 rounded-full overflow-hidden border border-purple-500/20">
                      <motion.div 
                        animate={{ width: ["10%", "40%", "25%"] }} 
                        transition={{ duration: 4, repeat: Infinity }}
                        className="h-full bg-purple-500 shadow-[0_0_10px_#a855f7]" 
                      />
                   </div>
                </div>
             </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* --- LEFT: CURRENT STATUS PANE --- */}
            <div className="lg:col-span-5 space-y-6">
               <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="bg-purple-950/10 border border-purple-500/20 rounded-[2rem] p-8 backdrop-blur-md relative overflow-hidden group"
               >
                  <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                     <FileText size={300} />
                  </div>
                  
                  <h2 className="text-xs font-bold text-purple-300/40 tracking-[0.4em] mb-10 flex items-center gap-3 uppercase">
                     <Database size={14} /> Local_Buffer_Status
                  </h2>

                  {currentResume ? (
                    <div className="space-y-8">
                       <div className="flex items-center gap-6">
                          <div className="relative">
                             <div className="w-20 h-20 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                                <CheckCircle size={40} className="text-purple-400" />
                             </div>
                             <motion.div 
                               animate={{ opacity: [0, 1, 0] }}
                               transition={{ duration: 2, repeat: Infinity }}
                               className="absolute -inset-2 border border-purple-500/20 rounded-2xl"
                             />
                          </div>
                          <div>
                             <h3 className="text-2xl font-bold text-white tracking-tight">FIRMWARE_V2.0</h3>
                             <p className="text-xs text-purple-400/60 mt-1 font-mono tracking-widest">STABLE // {lastUpdated}</p>
                          </div>
                       </div>

                       <div className="space-y-2">
                          <p className="text-[10px] text-purple-500/50 uppercase font-bold">Network_Path</p>
                          <div className="p-4 bg-black/60 rounded-xl border border-purple-500/10 font-mono text-[10px] text-purple-300/80 break-all leading-relaxed relative">
                             {currentResume}
                             <div className="absolute right-2 top-2 w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping" />
                          </div>
                       </div>

                       <motion.a 
                         whileHover={{ scale: 1.02, y: -2 }}
                         whileTap={{ scale: 0.98 }}
                         href={currentResume} 
                         target="_blank" 
                         className="flex items-center justify-center gap-3 w-full py-5 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl transition-all shadow-[0_10px_30px_rgba(168,85,247,0.3)] border border-purple-400/50 uppercase tracking-widest text-sm"
                       >
                          <Download size={20} /> Verify_Download
                       </motion.a>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-red-500/50 border border-dashed border-red-500/20 rounded-2xl">
                       <AlertTriangle size={60} className="mb-4 animate-pulse" />
                       <p className="tracking-[0.5em] font-black text-xs">VOID_SECTOR_DETECTED</p>
                    </div>
                  )}
               </motion.div>

               {/* SYSTEM INFO MINI-CARD */}
               <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <Cpu size={20} className="text-purple-500" />
                     <span className="text-[10px] tracking-widest text-white/40 uppercase font-bold">Kernel_Sync</span>
                  </div>
                  <span className="text-xs text-purple-400 font-bold">OPTIMIZED</span>
               </div>
            </div>

            {/* --- RIGHT: HOLOGRAPHIC UPLOAD TERMINAL --- */}
            <div className="lg:col-span-7">
               <motion.div 
                 initial={{ opacity: 0, x: 30 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="bg-black/60 border border-purple-500/30 rounded-[2.5rem] p-10 backdrop-blur-2xl relative shadow-[0_0_50px_rgba(168,85,247,0.1)]"
               >
                  <h2 className="text-xs font-bold text-white/30 tracking-[0.4em] mb-10 flex items-center gap-3 uppercase">
                     <Zap size={14} className="text-purple-500" /> Data_Transmission_Port
                  </h2>

                  <form onSubmit={handleUpload} className="space-y-8">
                     
                     {/* THE DROPZONE */}
                     <div className="relative group cursor-pointer">
                        <input 
                          type="file" 
                          accept=".pdf"
                          onChange={(e) => setFile(e.target.files?.[0] || null)}
                          className="absolute inset-0 opacity-0 cursor-pointer z-20"
                        />
                        <div className="relative border-2 border-dashed border-purple-500/20 rounded-[2rem] p-16 flex flex-col items-center justify-center bg-purple-500/[0.02] group-hover:bg-purple-500/[0.05] group-hover:border-purple-400/50 transition-all duration-500 overflow-hidden">
                           
                           {/* SCANNING LASER ANIMATION */}
                           <motion.div 
                             animate={{ top: ["-10%", "110%", "-10%"] }}
                             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                             className="absolute left-0 right-0 h-[2px] bg-purple-400 shadow-[0_0_20px_#a855f7] z-10 pointer-events-none"
                           />

                           {file ? (
                              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
                                 <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                                    <FileText size={40} className="text-purple-300" />
                                 </div>
                                 <p className="text-white font-black text-xl tracking-tight max-w-[250px] truncate">{file.name}</p>
                                 <p className="text-[10px] text-purple-400 font-bold mt-2 uppercase tracking-[0.2em]">Ready_For_Burst_Transmission</p>
                              </motion.div>
                           ) : (
                              <div className="text-center">
                                 <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                                    <Upload size={32} className="text-white/40 group-hover:text-white transition-colors" />
                                 </div>
                                 <p className="text-sm font-black tracking-[0.3em] text-white uppercase">Inject_Identity_PDF</p>
                                 <p className="text-[10px] text-white/30 mt-4 tracking-tighter">MAX_FILE_SIZE: 10MB // PROTOCOL: PDF_ONLY</p>
                              </div>
                           )}
                        </div>
                     </div>

                     <motion.button 
                        whileHover={!file ? {} : { scale: 1.01, boxShadow: "0 0 30px rgba(168,85,247,0.4)" }}
                        whileTap={!file ? {} : { scale: 0.98 }}
                        disabled={uploading || !file}
                        className="w-full py-6 bg-white text-black font-black tracking-[0.5em] rounded-2xl hover:bg-purple-400 transition-all disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center gap-4 text-sm uppercase"
                     >
                        {uploading ? (
                           <><RefreshCw className="animate-spin" size={20} /> SYNCHRONIZING...</>
                        ) : (
                           "Execute_Uplink"
                        )}
                     </motion.button>
                  </form>
               </motion.div>
            </div>
          </div>

          {/* FOOTER SYSTEM STATS */}
          <footer className="mt-16 flex flex-wrap gap-8 justify-center opacity-30">
             {['LOG_STREAMS: ACTIVE', 'DB_CONNECTION: GREEN', 'AUTH_LEVEL: ADMIN'].map((stat, i) => (
                <span key={i} className="text-[9px] font-bold tracking-[0.3em]">{stat}</span>
             ))}
          </footer>
        </div>
      </div>
    </AdminGuard>
  );
}