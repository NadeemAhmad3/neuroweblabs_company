"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Loader2 } from "lucide-react";

export default function AcceptButton({ applicationId, currentStatus }: { applicationId: string; currentStatus?: string }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(currentStatus);
  const router = useRouter();

  const normalizedStatus = (status ?? "").trim().toLowerCase();
  const isApproved = normalizedStatus === "approved" || normalizedStatus === "accepted";

  const handleAccept = async () => {
    if (isApproved || loading) return;

    if (!confirm("Are you sure you want to accept this candidate? This will immediately send an acceptance email.")) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/applications/${applicationId}/accept`, {
        method: "POST",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);

        // If backend says it is already approved, sync UI immediately.
        if (res.status === 400 && errorData?.message === "Application already approved") {
          setStatus("Approved");
          router.refresh();
          return;
        }

        throw new Error(errorData?.message || "Failed to accept application");
      }

      const data = await res.json();
      setStatus("Approved");
      alert(data.message || "Candidate successfully approved!");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("An error occurred while accepting the candidate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleAccept}
      disabled={isApproved || loading}
      className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all ${
        isApproved 
          ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-none cursor-not-allowed' 
          : 'bg-white border border-[var(--color-islamabad-border)] text-emerald-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 shadow-[var(--shadow-luxury)]'
      }`}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <CheckCircle size={18} />
      )}
      {isApproved ? "Approved & Emailed" : "Accept Candidate"}
    </button>
  );
}