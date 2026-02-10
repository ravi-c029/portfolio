interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassCard({ children, className = "", hoverEffect = false }: GlassCardProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border border-glass-border 
        bg-glass-100 backdrop-blur-xl transition-all duration-500
        ${hoverEffect ? "hover:-translate-y-2 hover:bg-glass-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]" : ""}
        ${className}
      `}
    >
      {/* Optional: Add a subtle noise texture or gradient overlay here later */}
      {children}
    </div>
  );
}