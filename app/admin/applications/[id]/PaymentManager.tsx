"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentManager({
  id,
  paymentStatus,
  price,
  daysSinceAcceptance,
}: {
  id: string;
  paymentStatus: string;
  price: number;
  daysSinceAcceptance: number;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAction = async (action: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/applications/${id}/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to perform action");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-semibold flex items-center gap-2">
        <span className="text-[var(--color-islamabad-secondary)]">Payment Status:</span>
        <span className={`${paymentStatus === 'Paid' ? 'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded' : 'text-rose-500 bg-rose-50 px-2 py-0.5 rounded'}`}>
          {paymentStatus} (<span className="font-mono">Rs. {price}</span>)
        </span>
      </div>

      {daysSinceAcceptance > 0 && paymentStatus !== 'Paid' && (
        <div className="text-xs text-rose-500 font-bold mb-2">
          {daysSinceAcceptance} {daysSinceAcceptance === 1 ? 'day has' : 'days have'} passed since acceptance.
        </div>
      )}

      {paymentStatus !== 'Paid' && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => handleAction("verify_payment")}
            disabled={loading}
            className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 disabled:opacity-50 transition-all shadow-sm shadow-emerald-500/20"
          >
            Mark as Paid
          </button>
          <button
            onClick={() => handleAction("downgrade_to_free")}
            disabled={loading}
            className="px-4 py-2 border border-amber-500 text-amber-600 rounded-xl text-sm font-bold hover:bg-amber-50 disabled:opacity-50 transition-all"
          >
            Downgrade to Standard
          </button>
          {daysSinceAcceptance >= 3 && (
            <button
              onClick={() => handleAction("remove_candidate")}
              disabled={loading}
              className="px-4 py-2 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-700 disabled:opacity-50 transition-all shadow-sm shadow-rose-500/20"
            >
              Remove Application
            </button>
          )}
        </div>
      )}
    </div>
  );
}
