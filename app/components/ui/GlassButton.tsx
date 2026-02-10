import { ArrowRight, Download } from "lucide-react";

interface GlassButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  icon?: "arrow" | "download" | "none";
  className?: string;
}

export default function GlassButton({ 
  children, 
  href, 
  variant = "primary", 
  icon = "none",
  className = "" 
}: GlassButtonProps) {
  
  const baseStyles = "relative inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all duration-300 group overflow-hidden";
  
  // 1. Primary: White Glass with Glow
  const primaryStyles = "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] backdrop-blur-md";
  
  // 2. Secondary: Ghost/Transparent
  const secondaryStyles = "bg-transparent text-slate-300 border border-transparent hover:text-white hover:bg-white/5";

  const styles = `${baseStyles} ${variant === "primary" ? primaryStyles : secondaryStyles} ${className}`;
  const Icon = icon === "arrow" ? ArrowRight : icon === "download" ? Download : null;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {Icon && (
        <Icon className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
      )}
      {/* Shiny shimmer effect on hover */}
      {variant === "primary" && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
      )}
    </>
  );

  if (href) {
    return <a href={href} className={styles}>{content}</a>;
  }

  return <button className={styles}>{content}</button>;
}