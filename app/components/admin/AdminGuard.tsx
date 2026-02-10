// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AdminGuard({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const [authorized, setAuthorized] = useState(false);

//   useEffect(() => {
//     // 1. Check for the Key
//     const isAdmin = localStorage.getItem("isAdmin");

//     if (isAdmin === "true") {
//       // ✅ Key found! Allow entry.
//       setAuthorized(true);
//     } else {
//       // ❌ No Key? Kick them back to the Login Gate.
//       router.push("/admin");
//     }
//   }, [router]);

//   // 2. While checking, show a black loading screen (prevents flashing)
//   if (!authorized) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="text-cyan-500 font-mono animate-pulse">
//           VERIFYING ENCRYPTION...
//         </div>
//       </div>
//     );
//   }

//   // 3. If authorized, render the Dashboard
//   return <>{children}</>;
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, ShieldAlert } from "lucide-react";

// ⚠️ IMPORTANT: Replace this with your EXACT email used in Supabase Auth
const ADMIN_EMAIL = "ravi.keshari029@gmail.com";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      // 1. Ask Supabase: "Is anyone logged in?"
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // ❌ No one is logged in. Kick to Login Page.
        console.log("No session found. Redirecting...");
        router.replace("/admin");
        return;
      }

      // 2. Security Check: "Is this Ravi?"
      if (session.user.email !== ADMIN_EMAIL) {
        // ❌ Someone is logged in, but it's NOT you.
        console.warn("Unauthorized Access Attempt by:", session.user.email);
        
        // Force logout them out immediately
        await supabase.auth.signOut();
        
        // Kick to Login Page
        router.replace("/admin");
        return;
      }

      // ✅ Authorized! It is Ravi.
      setAuthorized(true);
      setLoading(false);
    };

    checkUser();
  }, [router]);

  // 3. Loading Screen (Sci-Fi Style)
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-cyan-500 gap-4">
        <Loader2 size={48} className="animate-spin text-cyan-400" />
        <div className="flex flex-col items-center">
            <span className="font-mono tracking-widest text-xs animate-pulse">VERIFYING BIOMETRICS...</span>
            <span className="text-[10px] text-cyan-800 font-mono mt-2">ENCRYPTION_LEVEL_5</span>
        </div>
      </div>
    );
  }

  // 4. Render Dashboard if Secure
  if (!authorized) return null;

  return <>{children}</>;
}