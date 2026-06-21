import { notFound } from "next/navigation";
import Link from "next/link";
import connectToDatabase from "@/lib/mongodb";
import Application from "@/models/Application";
import AcceptButton from "@/components/admin/AcceptButton";
import { ArrowLeft, ArrowUpRight, UserCircle, Briefcase, GraduationCap, MapPin, Mail, Phone, Github, Linkedin, FileText, Download, Activity, CalendarDays, Calendar } from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  
  // Next.js 15 requires params to be awaited in Server Components
  const { id } = await params;
  
  let application;
  try {
    application = await Application.findById(id).lean();
  } catch (error) {
    return notFound();
  }

  if (!application) {
    return notFound();
  }

  const normalizedStatus = (application.status ?? "").trim().toLowerCase();
  const isApproved = normalizedStatus === "selected";

  // Handle Photo URI format
  let photoDataUri = null;
  if (application.photo && application.photo.data) {
    photoDataUri = `data:${application.photo.contentType};base64,${application.photo.data}`;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* Back Button & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/applications">
            <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-[var(--color-islamabad-border)] shadow-sm hover:shadow-md hover:bg-[var(--color-islamabad-bg)] text-[var(--color-islamabad-primary)] transition-all">
              <ArrowLeft size={20} />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-plus-jakarta)] text-[var(--color-islamabad-primary)] tracking-tight">
              Applicant Profile
            </h1>
            <p className="text-sm font-medium text-[var(--color-islamabad-secondary)] mt-1">
              Internal review data matrix
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <AcceptButton applicationId={id} currentStatus={application.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Core Identity */}
        <div className="lg:col-span-1 space-y-6">
          {/* Identity Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[var(--color-islamabad-border)] shadow-[var(--shadow-luxury)] relative overflow-hidden text-center flex flex-col items-center">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-32 bg-[var(--color-islamabad-bg)] border-b border-[var(--color-islamabad-border)]" />

            <div className="relative z-10">
              <div className="w-28 h-28 mx-auto bg-white rounded-2xl shadow-xl shadow-[var(--color-islamabad-primary)]/10 border-4 border-white overflow-hidden flex items-center justify-center mb-4">
                {photoDataUri ? (
                  <img src={photoDataUri} alt="Applicant Photo" className="w-full h-full object-cover" />
                ) : (
                  <UserCircle size={48} className="text-[var(--color-islamabad-secondary)]/30" />
                )}
              </div>
              <h2 className="text-2xl font-extrabold font-[family-name:var(--font-plus-jakarta)] text-[var(--color-islamabad-primary)]">
                {application.firstName} {application.lastName}
              </h2>
              <p className="text-sm font-bold text-[var(--color-islamabad-accent)] mt-1 tracking-wide">
                Target: {application.trackName}
              </p>
            </div>

            <div className="w-full h-px bg-[var(--color-islamabad-border)] my-6"></div>

            <div className="w-full space-y-4 text-left">
              <div className="flex items-center gap-3 text-[var(--color-islamabad-primary)]">
                <Mail size={18} className="text-[var(--color-islamabad-secondary)]" />
                <a href={`mailto:${application.email}`} className="text-sm font-medium hover:text-[var(--color-islamabad-accent)] truncate">
                  {application.email}
                </a>
              </div>
              {application.phone && (
                <div className="flex items-center gap-3 text-[var(--color-islamabad-primary)]">
                  <Phone size={18} className="text-[var(--color-islamabad-secondary)]" />
                  <a href={`tel:${application.phone}`} className="text-sm font-medium hover:text-[var(--color-islamabad-accent)]">
                    {application.phone}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-3 text-[var(--color-islamabad-primary)]">
                <Calendar size={18} className="text-[var(--color-islamabad-secondary)]" />
                <span className="text-sm font-medium">Applied {new Date(application.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* External Links Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[var(--color-islamabad-border)] shadow-[var(--shadow-luxury)]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-islamabad-secondary)] mb-4">External Profiles</h3>
            <div className="space-y-3">
              <a href={application.github.startsWith('http') ? application.github : `https://${application.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-islamabad-border)] hover:border-black hover:bg-black/5 transition-all group">
                <div className="flex items-center gap-3">
                  <Github size={20} className="text-black" />
                  <span className="text-sm font-bold text-black">GitHub Profile</span>
                </div>
                <ArrowUpRight size={16} className="text-black/50 group-hover:text-black transition-colors" />
              </a>
              
              {application.linkedin && (
                <a href={application.linkedin.startsWith('http') ? application.linkedin : `https://${application.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-islamabad-border)] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all group">
                  <div className="flex items-center gap-3">
                    <Linkedin size={20} className="text-[#0A66C2]" />
                    <span className="text-sm font-bold text-[#0A66C2]">LinkedIn Profile</span>
                  </div>
                  <ArrowUpRight size={16} className="text-[#0A66C2]/50 group-hover:text-[#0A66C2] transition-colors" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Data Matrix */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Academic Background */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[var(--color-islamabad-border)] shadow-[var(--shadow-luxury)] relative pb-10">
            <div className="absolute top-4 right-4 p-3 bg-[var(--color-islamabad-bg)] rounded-xl border border-[var(--color-islamabad-border)]">
              <GraduationCap size={24} className="text-[var(--color-islamabad-accent)]" />
            </div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-islamabad-secondary)] mb-6">Academic Background</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-[var(--color-islamabad-secondary)] mb-1">University / Institution</p>
                <p className="font-bold text-[var(--color-islamabad-primary)] text-lg">{application.university}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--color-islamabad-secondary)] mb-1">Degree Program</p>
                <p className="font-bold text-[var(--color-islamabad-primary)] text-lg">{application.degree}</p>
              </div>
            </div>
          </div>

          {/* Experience & Motivation */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-[var(--color-islamabad-border)] shadow-[var(--shadow-luxury)] relative pb-10">
             <div className="absolute top-4 right-4 p-3 bg-[var(--color-islamabad-bg)] rounded-xl border border-[var(--color-islamabad-border)]">
              <Briefcase size={24} className="text-[var(--color-islamabad-accent)]" />
            </div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-islamabad-secondary)] mb-6">Professional Narrative</h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-bold text-[var(--color-islamabad-primary)] mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-islamabad-accent)]" />
                  Experience / Projects
                </h4>
                <div className="p-4 bg-[var(--color-islamabad-bg)] rounded-2xl border border-[var(--color-islamabad-border)]">
                  <p className="text-[15px] leading-relaxed text-[var(--color-islamabad-secondary)] whitespace-pre-wrap">
                    {application.experience}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[var(--color-islamabad-primary)] mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-islamabad-secondary)]" />
                  Motivation / Cover Letter
                </h4>
                <div className="p-4 bg-[var(--color-islamabad-bg)] rounded-2xl border border-[var(--color-islamabad-border)]">
                  <p className="text-[15px] leading-relaxed text-[var(--color-islamabad-secondary)] whitespace-pre-wrap">
                    {application.motivation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Attached Artifacts */}
          <div className="bg-[var(--color-islamabad-primary)] rounded-3xl p-6 md:p-8 shadow-[var(--shadow-luxury)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/50 mb-6 flex items-center gap-2">
              <FileText size={14} /> Attached Artifacts
            </h3>
            
            <div className="bg-white/10 border border-white/20 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="font-bold text-white text-base truncate max-w-[200px] xs:max-w-xs">{application.resume?.filename || "Resume.pdf"}</p>
                  <p className="text-xs text-white/50">{application.resume?.contentType}</p>
                </div>
              </div>
              
              {application.resume?.data && (
                <a 
                  href={`data:${application.resume.contentType};base64,${application.resume.data}`} 
                  download={application.resume.filename}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-[var(--color-islamabad-primary)] font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-white/20 transition-all hover:-translate-y-0.5"
                >
                  <Download size={18} />
                  Download Resume
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}