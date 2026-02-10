export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      {/* This renders the page content (Login or Dashboard) */}
      {children}
    </section>
  );
}