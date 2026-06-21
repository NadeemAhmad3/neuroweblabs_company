"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function AcceptButton({ applicationId, currentStatus }: { applicationId: string; currentStatus?: string }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(currentStatus);
  const router = useRouter();

  const isSelected = status === "Selected";

  const handleToggleStatus = async (newStatus: "Selected" | "Unselected") => {
    if (loading) return;

    const confirmMessage = newStatus === "Selected"
      ? "Are you sure you want to select this candidate? This will immediately send an acceptance email."
      : "Are you sure you want to unselect this candidate?";

    if (!confirm(confirmMessage)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/applications/${applicationId}/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to update candidate status");
      }

      const data = await res.json();
      setStatus(newStatus);
      alert(data.message || `Candidate successfully marked as ${newStatus}!`);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "An error occurred while updating status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {isSelected ? (
        <button 
          onClick={() => handleToggleStatus("Unselected")}
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-500 hover:text-white hover:border-rose-500 rounded-xl text-sm font-bold shadow-sm transition-all"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <XCircle size={18} />}
          Unselect Candidate
        </button>
      ) : (
        <button 
          onClick={() => handleToggleStatus("Selected")}
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-[var(--color-islamabad-border)] text-emerald-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 rounded-xl text-sm font-bold shadow-[var(--shadow-luxury)] transition-all"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
          Select Candidate
        </button>
      )}
    </div>
  );
}