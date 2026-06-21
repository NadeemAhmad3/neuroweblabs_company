import connectToDatabase from "@/lib/mongodb";
import Application from "@/models/Application";
import ApplicationsList from "./ApplicationsList";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type RawApplication = {
  _id: { toString: () => string };
  firstName: string;
  lastName: string;
  email: string;
  trackName: string;
  university: string;
  selectedTier: string;
  status: string;
  createdAt: Date;
  [key: string]: unknown;
};

export default async function ApplicationsPage() {
  await connectToDatabase();
  const applications = await Application.find().sort({ createdAt: -1 }).lean();
  
  // Serialize because Next.js has issues with returning MongoDB ObjectIds directly in server components
  const serializedApps = (applications as unknown as RawApplication[]).map((app) => ({
    ...app,
    _id: app._id.toString(),
    createdAt: app.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold font-[family-name:var(--font-plus-jakarta)] tracking-tight text-[var(--color-islamabad-primary)]">
          All Applications
        </h1>
        <p className="text-[var(--color-islamabad-secondary)] mt-1 font-medium">
          Filter and manage candidates across all capability tracks.
        </p>
      </div>

      <ApplicationsList initialApplications={serializedApps} />
    </div>
  );
}