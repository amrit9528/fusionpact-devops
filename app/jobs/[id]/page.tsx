"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [jobId, setJobId] = useState<string | null>(null);

  // Resolve the params promise to get the ID
  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await params;
      setJobId(resolvedParams.id);
    }

    resolveParams();
  }, [params]);

  // Only run this effect when jobId is available
  useEffect(() => {
    if (!jobId) return;

    // Redirect after a short delay to allow metadata to be fetched and processed
    const redirectTimer = setTimeout(() => {
      router.push(`/jobs?highlight=${jobId}`);
    }, 600);

    return () => clearTimeout(redirectTimer);
  }, [jobId, router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      Redirecting to job...
    </div>
  );
}
