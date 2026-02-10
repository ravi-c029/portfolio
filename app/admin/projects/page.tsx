// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import {
//   ArrowLeft,
//   Save,
//   Trash2,
//   Upload,
//   Plus,
//   Image as ImageIcon,
// } from "lucide-react";
// import AdminGuard from "../../components/admin/AdminGuard";

// export default function ProjectManager() {
//   const router = useRouter();
//   const [projects, setProjects] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Form State
//   const [formData, setFormData] = useState({
//     title: "",
//     desc: "",
//     tech: "",
//     live: "",
//     repo: "",
//   });
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);

//   // 1. Fetch Existing Projects
//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     const { data } = await supabase
//       .from("projects")
//       .select("*")
//       .order("created_at", { ascending: false });
//     if (data) setProjects(data);
//     setLoading(false);
//   };

//   // 2. Handle Image Upload & Save
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setUploading(true);

//     let imageUrl = "";

//     try {
//       // A. Upload Image (if selected)
//       if (imageFile) {
//         const fileExt = imageFile.name.split(".").pop();
//         const fileName = `${Date.now()}.${fileExt}`;
//         const { error: uploadError } = await supabase.storage
//           .from("projects") // Make sure this bucket exists!
//           .upload(`projects/${fileName}`, imageFile);

//         if (uploadError) throw uploadError;

//         // Get Public URL
//         const { data: publicUrl } = supabase.storage
//           .from("projects")
//           .getPublicUrl(`projects/${fileName}`);

//         imageUrl = publicUrl.publicUrl;
//       }

//       // B. Save to Database
//       const { error: dbError } = await supabase.from("projects").insert([
//         {
//           title: formData.title,
//           description: formData.desc,
//           tech_stack: formData.tech.split(",").map((t) => t.trim()), // "React, Node" -> ["React", "Node"]
//           live_link: formData.live,
//           repo_link: formData.repo,
//           image_url: imageUrl || "https://via.placeholder.com/400", // Fallback
//         },
//       ]);

//       if (dbError) throw dbError;

//       // Reset & Refresh
//       setFormData({ title: "", desc: "", tech: "", live: "", repo: "" });
//       setImageFile(null);
//       fetchProjects();
//       alert("✅ PROJECT DEPLOYED SUCCESSFULLY");
//     } catch (error: any) {
//       alert("❌ ERROR: " + error.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // 3. Delete Project
//   const handleDelete = async (id: number) => {
//     if (!confirm("⚠️ WARNING: DELETE PROJECT DATA?")) return;

//     const { error } = await supabase.from("projects").delete().eq("id", id);
//     if (!error) fetchProjects();
//   };

//   return (
//     <AdminGuard>
//       <div className="min-h-screen bg-black text-cyan-500 font-mono p-8 selection:bg-cyan-500/30">
//         {/* Header */}
//         <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
//           <button
//             onClick={() => router.back()}
//             className="p-2 hover:bg-white/10 rounded-full transition-colors"
//           >
//             <ArrowLeft />
//           </button>
//           <div>
//             <h1 className="text-2xl font-black tracking-widest text-white">
//               PROJECT_PROTOCOLS
//             </h1>
//             <p className="text-[10px] text-cyan-400/60 tracking-[0.2em]">
//               DATABASE ACCESS: GRANTED
//             </p>
//           </div>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
//           {/* --- LEFT: INPUT TERMINAL (Form) --- */}
//           <div className="bg-white/5 border border-white/10 p-8 rounded-2xl relative overflow-hidden">
//             <div className="absolute top-0 right-0 p-4 opacity-10">
//               <Plus size={100} />
//             </div>

//             <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
//               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />{" "}
//               INITIALIZE NEW PROJECT
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
//               {/* Image Upload Area */}
//               <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-cyan-500/50 hover:bg-black/20 transition-all cursor-pointer relative group">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                 />
//                 <div className="flex flex-col items-center gap-2 text-white/40 group-hover:text-cyan-400 transition-colors">
//                   {imageFile ? (
//                     <>
//                       <ImageIcon size={32} className="text-green-400" />
//                       <span className="text-xs text-green-400">
//                         {imageFile.name}
//                       </span>
//                     </>
//                   ) : (
//                     <>
//                       <Upload size={32} />
//                       <span className="text-xs tracking-widest">
//                         DROP SCHEMATICS (IMAGE) HERE
//                       </span>
//                     </>
//                   )}
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <InputBox
//                   label="PROJECT TITLE"
//                   value={formData.title}
//                   onChange={(v: string) =>
//                     setFormData({ ...formData, title: v })
//                   }
//                   placeholder="e.g. NEURO-LINK V1"
//                 />

//                 <div>
//                   <label className="text-[9px] font-bold text-cyan-400/70 tracking-widest mb-1 block">
//                     DESCRIPTION
//                   </label>
//                   <textarea
//                     value={formData.desc}
//                     onChange={(e) =>
//                       setFormData({ ...formData, desc: e.target.value })
//                     }
//                     className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all h-24"
//                     placeholder="System capabilities and architecture..."
//                   />
//                 </div>

//                 <InputBox
//                   label="TECH STACK (Comma Separated)"
//                   value={formData.tech}
//                   onChange={(v: string) =>
//                     setFormData({ ...formData, tech: v })
//                   }
//                   placeholder="Next.js, Supabase, Three.js"
//                 />

//                 <div className="grid grid-cols-2 gap-4">
//                   <InputBox
//                     label="LIVE URL"
//                     value={formData.live}
//                     onChange={(v: string) =>
//                       setFormData({ ...formData, live: v })
//                     }
//                     placeholder="https://..."
//                   />
//                   <InputBox
//                     label="REPO URL"
//                     value={formData.repo}
//                     onChange={(v: string) =>
//                       setFormData({ ...formData, repo: v })
//                     }
//                     placeholder="https://github.com/..."
//                   />
//                 </div>
//               </div>

//               <button
//                 disabled={uploading}
//                 className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-4 rounded-xl tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {uploading ? (
//                   "UPLOADING DATA..."
//                 ) : (
//                   <>
//                     <Save size={18} /> DEPLOY TO MAINFRAME
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>

//           {/* --- RIGHT: DATABASE LOGS (List) --- */}
//           <div className="space-y-6">
//             <div className="flex justify-between items-end border-b border-white/10 pb-2">
//               <h2 className="text-sm font-bold text-white/50 tracking-widest">
//                 ACTIVE DEPLOYMENTS
//               </h2>
//               <span className="text-xs text-cyan-400">
//                 {projects.length} UNITS
//               </span>
//             </div>

//             <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
//               {loading ? (
//                 <div className="text-center text-white/20 animate-pulse mt-10">
//                   FETCHING DATA...
//                 </div>
//               ) : (
//                 projects.map((project) => (
//                   <div
//                     key={project.id}
//                     className="bg-white/5 border border-white/10 p-4 rounded-xl flex gap-4 group hover:border-cyan-500/30 transition-all"
//                   >
//                     {/* Thumbnail */}
//                     <div className="w-16 h-16 bg-black rounded-lg overflow-hidden border border-white/10 shrink-0">
//                       {project.image_url && (
//                         <img
//                           src={project.image_url}
//                           alt="img"
//                           className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
//                         />
//                       )}
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-bold text-white truncate">
//                         {project.title}
//                       </h3>
//                       <div className="flex flex-wrap gap-1 mt-1">
//                         {project.tech_stack
//                           ?.slice(0, 3)
//                           .map((t: string, i: number) => (
//                             <span
//                               key={i}
//                               className="text-[9px] bg-cyan-900/30 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-500/20"
//                             >
//                               {t}
//                             </span>
//                           ))}
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => handleDelete(project.id)}
//                       className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-black transition-all"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 ))
//               )}

//               {projects.length === 0 && !loading && (
//                 <div className="p-8 border-2 border-dashed border-white/10 rounded-xl text-center text-white/20">
//                   NO DATA FOUND IN SECTOR 7
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </AdminGuard>
//   );
// }

// // Helper Component
// function InputBox({ label, value, onChange, placeholder }: any) {
//   return (
//     <div>
//       <label className="text-[9px] font-bold text-cyan-400/70 tracking-widest mb-1 block">
//         {label}
//       </label>
//       <input
//         type="text"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all font-mono"
//         placeholder={placeholder}
//       />
//     </div>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Trash2,
  Upload,
  Plus,
  Image as ImageIcon,
  Cpu,
  Globe,
  Github,
  Layers,
  Sparkles
} from "lucide-react";
import AdminGuard from "../../components/admin/AdminGuard";

export default function ProjectManager() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    tech: "",
    live: "",
    repo: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // 1. Fetch Existing Projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  };

  // 2. Handle Image Upload & Save
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = "";

    try {
      // A. Upload Image (if selected)
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("projects")
          .upload(`projects/${fileName}`, imageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrl } = supabase.storage
          .from("projects")
          .getPublicUrl(`projects/${fileName}`);

        imageUrl = publicUrl.publicUrl;
      }

      // B. Save to Database
      const { error: dbError } = await supabase.from("projects").insert([
        {
          title: formData.title,
          description: formData.desc,
          tech_stack: formData.tech.split(",").map((t) => t.trim()),
          live_link: formData.live,
          repo_link: formData.repo,
          image_url: imageUrl || "https://via.placeholder.com/400",
        },
      ]);

      if (dbError) throw dbError;

      // Reset & Refresh
      setFormData({ title: "", desc: "", tech: "", live: "", repo: "" });
      setImageFile(null);
      fetchProjects();
      alert("✅ PROJECT DEPLOYED SUCCESSFULLY");
    } catch (error: any) {
      alert("❌ ERROR: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // 3. Delete Project
  const handleDelete = async (id: number) => {
    if (!confirm("⚠️ WARNING: DELETE PROJECT DATA?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) fetchProjects();
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-black text-cyan-500 font-mono relative overflow-hidden selection:bg-cyan-500/30">
        
        {/* --- BACKGROUND FX --- */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient(circle at top right, rgba(6,182,212,0.1), transparent 60%) pointer-events-none" />

        <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto">
          
          {/* Header */}
          <header className="flex items-center gap-4 mb-8 md:mb-12 border-b border-cyan-500/20 pb-6 bg-black/40 backdrop-blur-md sticky top-0 z-50 rounded-b-2xl px-4">
            <button
              onClick={() => router.back()}
              className="p-3 bg-white/5 hover:bg-cyan-500/20 text-cyan-400 rounded-full transition-all border border-white/10 hover:border-cyan-500/50 hover:scale-110 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-widest text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                Project Protocols
              </h1>
              <div className="flex items-center gap-2 text-[10px] md:text-xs text-cyan-400/60 tracking-[0.2em] mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_green]" />
                DATABASE ACCESS: GRANTED
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            
            {/* --- LEFT: INPUT TERMINAL (Form) --- */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black/60 border border-cyan-500/30 p-6 md:p-8 rounded-3xl relative overflow-hidden backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.05)]"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none text-cyan-500">
                  <Plus size={120} strokeWidth={1} />
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

                <h2 className="text-lg font-bold text-white mb-8 flex items-center gap-3">
                  <span className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30 text-cyan-400">
                     <Sparkles size={16} />
                  </span>
                  INITIALIZE NEW PROJECT
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  
                  {/* Image Upload Area */}
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-100 transition duration-500 blur"></div>
                    <div className="relative bg-black border border-white/10 rounded-xl p-8 text-center hover:bg-white/5 transition-all cursor-pointer overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 opacity-0 cursor-pointer z-20"
                      />
                      
                      {/* Scanning Line Animation */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400/50 shadow-[0_0_20px_cyan] z-10 animate-[scan_2s_linear_infinite]" />

                      <div className="flex flex-col items-center gap-3 text-white/40 group-hover:text-cyan-400 transition-colors">
                        {imageFile ? (
                          <>
                            <div className="w-16 h-16 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50 text-cyan-400">
                               <ImageIcon size={32} />
                            </div>
                            <span className="text-sm font-bold text-cyan-400 tracking-wide bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-500/30">
                              {imageFile.name}
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                               <Upload size={32} />
                            </div>
                            <span className="text-xs tracking-[0.2em] font-bold">
                              DROP SCHEMATICS (IMAGE)
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Form Inputs */}
                  <div className="space-y-5">
                    <InputBox
                      label="PROJECT TITLE"
                      icon={Cpu}
                      value={formData.title}
                      onChange={(v: string) => setFormData({ ...formData, title: v })}
                      placeholder="e.g. NEURO-LINK V1"
                    />

                    <div>
                      <label className="text-[10px] font-bold text-cyan-400 tracking-widest mb-2 flex items-center gap-2">
                        <Layers size={12} /> DESCRIPTION
                      </label>
                      <textarea
                        value={formData.desc}
                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all h-32 custom-scrollbar font-sans leading-relaxed"
                        placeholder="System capabilities and architecture..."
                      />
                    </div>

                    <InputBox
                      label="TECH STACK"
                      icon={Layers}
                      value={formData.tech}
                      onChange={(v: string) => setFormData({ ...formData, tech: v })}
                      placeholder="Next.js, Supabase, Three.js"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <InputBox
                        label="LIVE URL"
                        icon={Globe}
                        value={formData.live}
                        onChange={(v: string) => setFormData({ ...formData, live: v })}
                        placeholder="https://..."
                      />
                      <InputBox
                        label="REPO URL"
                        icon={Github}
                        value={formData.repo}
                        onChange={(v: string) => setFormData({ ...formData, repo: v })}
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>

                  <button
                    disabled={uploading}
                    className="w-full relative group overflow-hidden rounded-xl p-[1px]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 animate-gradient-x opacity-70 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-black hover:bg-black/80 text-white font-bold py-4 rounded-xl tracking-widest flex items-center justify-center gap-3 transition-all disabled:opacity-50">
                      {uploading ? (
                        "UPLOADING DATA..."
                      ) : (
                        <>
                          <Save size={18} className="text-cyan-400 group-hover:scale-110 transition-transform" /> 
                          DEPLOY TO MAINFRAME
                        </>
                      )}
                    </div>
                  </button>
                </form>
              </motion.div>
            </div>

            {/* --- RIGHT: DATABASE LOGS (List) --- */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex justify-between items-end border-b border-white/10 pb-4 px-2">
                <div>
                    <h2 className="text-sm font-bold text-white tracking-widest flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      ACTIVE DEPLOYMENTS
                    </h2>
                    <p className="text-[10px] text-white/40 mt-1">SECTOR 7 DATABASE</p>
                </div>
                <span className="text-xs font-mono px-2 py-1 rounded bg-cyan-950 text-cyan-400 border border-cyan-900">
                  {projects.length} UNITS
                </span>
              </div>

              <div className="space-y-4 max-h-[800px] overflow-y-auto custom-scrollbar pr-2 pb-20">
                {loading ? (
                  <div className="text-center text-white/20 animate-pulse mt-10 font-mono tracking-widest">
                    SCANNING SECTOR...
                  </div>
                ) : (
                  <AnimatePresence>
                    {projects.map((project, i) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: i * 0.05 }}
                        className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 p-4 rounded-2xl flex gap-4 transition-all duration-300"
                      >
                        {/* Thumbnail */}
                        <div className="w-20 h-20 bg-black rounded-xl overflow-hidden border border-white/10 shrink-0 relative group-hover:shadow-[0_0_15px_cyan]">
                          {project.image_url ? (
                            <img
                              src={project.image_url}
                              alt="img"
                              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                            />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center bg-cyan-900/20 text-cyan-700">
                                <ImageIcon size={20} />
                             </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <h3 className="font-bold text-white truncate text-lg group-hover:text-cyan-400 transition-colors">
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {project.tech_stack?.slice(0, 3).map((t: string, i: number) => (
                                <span
                                  key={i}
                                  className="text-[9px] bg-black border border-white/10 text-white/60 px-2 py-1 rounded-md"
                                >
                                  {t}
                                </span>
                              ))}
                          </div>
                        </div>

                        <button
                          onClick={() => handleDelete(project.id)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_red] transition-all self-center shrink-0"
                          title="Purge Data"
                        >
                          <Trash2 size={18} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}

                {projects.length === 0 && !loading && (
                  <div className="p-10 border-2 border-dashed border-white/10 rounded-2xl text-center text-white/20 font-mono">
                    NO DATA FOUND IN SECTOR 7
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

// Improved Input Component
function InputBox({ label, value, onChange, placeholder, icon: Icon }: any) {
  return (
    <div>
      <label className="text-[10px] font-bold text-cyan-400 tracking-widest mb-2 flex items-center gap-2">
        {Icon && <Icon size={12} />} {label}
      </label>
      <div className="relative group">
         <input
           type="text"
           value={value}
           onChange={(e) => onChange(e.target.value)}
           className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 pl-4 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-sans placeholder:text-white/20"
           placeholder={placeholder}
         />
         {/* Focus Glow Effect */}
         <div className="absolute inset-0 rounded-xl border border-cyan-500/50 opacity-0 group-focus-within:opacity-100 group-focus-within:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all pointer-events-none" />
      </div>
    </div>
  );
}