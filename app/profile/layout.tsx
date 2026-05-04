import AnimatedNav from "@/app/components/navigation/AnimatedNav";

export default function ProfileLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatedNav bgColor="bg-white/5" />
      <main className="container max-w-8xl mx-auto px-4 pt-32 pb-16">
        {children}
      </main>
    </div>
  );
}
