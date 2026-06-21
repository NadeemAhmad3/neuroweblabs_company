"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowUpRight, Activity, Calendar, Inbox } from "lucide-react";

type AppRecord = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  trackName: string;
  university: string;
  status: string;
  createdAt: string;
};

export default function ApplicationsList({ initialApplications }: { initialApplications: AppRecord[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTrack, setFilterTrack] = useState("All");

  // Get unique tracks for the filter dropdown
  const tracks = useMemo(() => {
    const uniqueTracks = new Set(initialApplications.map(app => app.trackName));
    return ["All", ...Array.from(uniqueTracks).filter(Boolean)];
  }, [initialApplications]);

  const filteredApps = useMemo(() => {
    return initialApplications.filter(app => {
      const matchesSearch = 
        `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) || 
        app.email.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesTrack = filterTrack === "All" || app.trackName === filterTrack;

      return matchesSearch && matchesTrack;
    });
  }, [initialApplications, searchTerm, filterTrack]);

  return (
    <div className="space-y-6">
      {/* Filtering Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white border border-[var(--color-islamabad-border)] p-4 rounded-2xl shadow-[var(--shadow-luxury)]">
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-islamabad-secondary)]/50" size={18} />
          <input
            type="text"
            placeholder="Search candidates by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-islamabad-bg)]/50 border border-[var(--color-islamabad-border)] rounded-xl outline-none focus:border-[var(--color-islamabad-accent)] focus:ring-1 focus:ring-[var(--color-islamabad-accent)] transition-all font-medium text-sm text-[var(--color-islamabad-primary)]"
          />
        </div>
        
        {/* Track Filter */}
        <div className="relative w-full sm:w-64">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-islamabad-secondary)]/50" size={18} />
          <select
            value={filterTrack}
            onChange={(e) => setFilterTrack(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-islamabad-bg)]/50 border border-[var(--color-islamabad-border)] rounded-xl outline-none focus:border-[var(--color-islamabad-accent)] focus:ring-1 focus:ring-[var(--color-islamabad-accent)] transition-all font-medium text-sm text-[var(--color-islamabad-primary)] appearance-none cursor-pointer"
          >
            {tracks.map(track => (
              <option key={track} value={track}>{track} Track</option>
            ))}
          </select>
        </div>
      </div>

      {/* Applications Data Grid */}
      <div className="bg-white border border-[var(--color-islamabad-border)] rounded-3xl shadow-[var(--shadow-luxury)] overflow-hidden">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-islamabad-bg)] text-[var(--color-islamabad-secondary)] text-xs uppercase tracking-wider border-b border-[var(--color-islamabad-border)]">
                <th className="px-8 py-4 font-semibold">Candidate Info</th>
                <th className="px-8 py-4 font-semibold">Target Track</th>
                <th className="px-8 py-4 font-semibold">Status</th>
                <th className="px-8 py-4 font-semibold text-right">View Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-islamabad-border)]/50">
              <AnimatePresence>
                {filteredApps.length > 0 ? filteredApps.map((app) => {
                  const isApproved = (app.status ?? "").toLowerCase() === "selected";
                  const isUnselected = (app.status ?? "").toLowerCase() === "unselected";
                  
                  return (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={app._id} 
                      className="hover:bg-[var(--color-islamabad-bg)]/50 transition-colors group"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-islamabad-primary)]/10 to-[var(--color-islamabad-accent)]/10 flex items-center justify-center text-[var(--color-islamabad-primary)] font-bold text-sm border border-[var(--color-islamabad-primary)]/10">
                            {app.firstName.charAt(0)}{app.lastName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-[var(--color-islamabad-primary)]">{app.firstName} {app.lastName}</p>
                            <p className="text-xs text-[var(--color-islamabad-secondary)] underline decoration-transparent group-hover:decoration-[var(--color-islamabad-secondary)]/30 transition-all cursor-pointer">{app.email}</p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-8 py-5">
                        <p className="font-semibold text-[var(--color-islamabad-primary)] text-sm">{app.trackName}</p>
                        <p className="text-xs text-[var(--color-islamabad-secondary)] max-w-[180px] truncate">{app.university}</p>
                      </td>
                      
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          isApproved 
                            ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' 
                            : isUnselected
                              ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                              : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                        }`}>
                          {app.status || "Pending"}
                        </span>
                      </td>
                      
                      <td className="px-8 py-5 text-right">
                        <Link href={`/admin/applications/${app._id}`}>
                          <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[var(--color-islamabad-border)] text-[var(--color-islamabad-primary)] text-sm font-bold rounded-xl shadow-sm hover:shadow-md hover:border-[var(--color-islamabad-primary)]/20 transition-all group-hover:bg-[var(--color-islamabad-primary)] group-hover:text-white">
                            View Details <ArrowUpRight size={16} />
                          </button>
                        </Link>
                      </td>
                    </motion.tr>
                  );
                }) : (
                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <td colSpan={5} className="px-8 py-16">
                      <div className="flex flex-col items-center justify-center text-[var(--color-islamabad-secondary)] gap-3">
                        <div className="w-16 h-16 rounded-full bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)] flex items-center justify-center">
                          <Search size={24} className="opacity-50" />
                        </div>
                        <p className="font-semibold">No candidates match your filters</p>
                        <button 
                          onClick={() => { setSearchTerm(""); setFilterTrack("All"); }}
                          className="text-sm text-[var(--color-islamabad-accent)] hover:underline"
                        >
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}