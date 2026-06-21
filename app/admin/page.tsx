import connectToDatabase from "@/lib/mongodb";
import Application from "@/models/Application";
import { Users, CheckCircle2, AlertCircle, TrendingUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 0; // Disable static caching for admin

type ApplicationRecord = {
  _id: { toString: () => string };
  firstName: string;
  lastName: string;
  email: string;
  trackName: string;
  university: string;
  status: string;
  createdAt: string | Date;
};

export default async function AdminDashboard() {
  await connectToDatabase();
  const applications = await Application.find().sort({ createdAt: -1 }).limit(6).lean();
  const totalApps = await Application.countDocuments();
  const selectedApps = await Application.countDocuments({ status: "Selected" });
  const pendingApps = await Application.countDocuments({ status: "Pending" });
  
  const metrics = [
    { label: "Total Applications", value: totalApps, icon: Users, change: "+12%", trend: "up", boxColor: "bg-[var(--color-islamabad-primary)]", iconColor: "text-[var(--color-islamabad-bg)]" },
    { label: "Selected Candidates", value: selectedApps, icon: CheckCircle2, change: "+8%", trend: "up", boxColor: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20", iconColor: "text-emerald-600" },
    { label: "Pending Candidates", value: pendingApps, icon: AlertCircle, change: "-3%", trend: "down", boxColor: "bg-amber-500/10 text-amber-600 border border-amber-500/20", iconColor: "text-amber-600" },
    { label: "Selection Rate", value: totalApps ? Math.round((selectedApps / totalApps) * 100) + "%" : "0%", icon: TrendingUp, change: "+2%", trend: "up", boxColor: "bg-[var(--color-islamabad-bg)] border border-[var(--color-islamabad-border)]", iconColor: "text-[var(--color-islamabad-primary)]" }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold font-[family-name:var(--font-plus-jakarta)] tracking-tight text-[var(--color-islamabad-primary)]">
            Dashboard Overview
          </h1>
          <p className="text-[var(--color-islamabad-secondary)] mt-1 font-medium">
            Welcome back to NeuroWebLabs HQ. Here is what&apos;s happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-[var(--color-islamabad-border)] text-[var(--color-islamabad-primary)] font-bold rounded-xl shadow-sm hover:shadow-md transition-all text-sm">
            Export Data
          </button>
          <button className="px-5 py-2.5 bg-[var(--color-islamabad-primary)] text-white font-bold rounded-xl shadow-md shadow-[var(--color-islamabad-primary)]/10 hover:bg-[var(--color-islamabad-accent)] transition-all text-sm">
            Generate Report
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="bg-white rounded-3xl p-6 border border-[var(--color-islamabad-border)] shadow-[var(--shadow-luxury)] relative overflow-hidden group">
               <div className="flex justify-between items-start mb-6 z-10 relative">
                <div className={`p-3 rounded-2xl ${metric.boxColor} transition-transform group-hover:scale-110 duration-300`}>
                  <Icon size={24} className={metric.iconColor} />
                </div>
                <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full text-[var(--color-islamabad-accent)] bg-[var(--color-islamabad-accent)]/10">
                  <TrendingUp size={12} />
                  {metric.change}
                </div>
              </div>
              <h3 className="text-[var(--color-islamabad-secondary)] font-semibold text-sm mb-1 z-10 relative">{metric.label}</h3>
              <p className="text-3xl font-extrabold text-[var(--color-islamabad-primary)] font-[family-name:var(--font-plus-jakarta)] z-10 relative">{metric.value}</p>
              
              {/* Subtle background decoration */}
              <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none">
                <Icon size={120} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Applications Table Section */}
      <div className="bg-white border border-[var(--color-islamabad-border)] rounded-3xl shadow-[var(--shadow-luxury)] overflow-hidden">
        <div className="p-6 md:px-8 md:py-6 border-b border-[var(--color-islamabad-border)] flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-[family-name:var(--font-plus-jakarta)] text-[var(--color-islamabad-primary)]">Recent Applications</h2>
            <p className="text-sm text-[var(--color-islamabad-secondary)] mt-1">Review the latest candidates across all tracks.</p>
          </div>
          <Link href="/admin/applications" className="hidden sm:flex items-center gap-2 text-sm font-bold text-[var(--color-islamabad-accent)] hover:text-[var(--color-islamabad-primary)] transition-colors">
            View All <ArrowUpRight size={16} />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-islamabad-bg)] text-[var(--color-islamabad-secondary)] text-xs uppercase tracking-wider">
                <th className="px-8 py-4 font-semibold rounded-tl-3xl">Candidate</th>
                <th className="px-8 py-4 font-semibold">Track & Role</th>
                <th className="px-8 py-4 font-semibold">Status</th>
                <th className="px-8 py-4 font-semibold text-right rounded-tr-3xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-islamabad-border)]/50">
              {applications.length > 0 ? applications.map((app: ApplicationRecord) => {
                const application = app;
                const isApproved = (application.status ?? "").toLowerCase() === "selected";
                const isUnselected = (application.status ?? "").toLowerCase() === "unselected";
                return (
                  <tr key={application._id.toString()} className="hover:bg-[var(--color-islamabad-bg)]/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-islamabad-primary)]/5 flex items-center justify-center text-[var(--color-islamabad-primary)] font-bold text-sm">
                          {application.firstName.charAt(0)}{application.lastName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-[var(--color-islamabad-primary)]">{application.firstName} {application.lastName}</p>
                          <p className="text-xs text-[var(--color-islamabad-secondary)]">{application.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className="font-semibold text-[var(--color-islamabad-primary)] text-sm">{application.trackName}</p>
                      <p className="text-xs text-[var(--color-islamabad-secondary)]">{application.university}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        isApproved 
                          ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' 
                          : isUnselected
                            ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                            : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                      }`}>
                        {application.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <Link href={`/admin/applications/${application._id.toString()}`}>
                        <button className="p-2 text-[var(--color-islamabad-secondary)] hover:text-[var(--color-islamabad-primary)] hover:bg-[var(--color-islamabad-border)]/50 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100">
                          <ArrowUpRight size={18} />
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-[var(--color-islamabad-secondary)]">
                    No applications found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-[var(--color-islamabad-border)] sm:hidden flex justify-center bg-[var(--color-islamabad-bg)]">
          <Link href="/admin/applications" className="text-sm font-bold text-[var(--color-islamabad-accent)]">
            View All Applications
          </Link>
        </div>
      </div>
    </div>
  );
}