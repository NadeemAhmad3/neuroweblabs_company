import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import Application from "@/models/Application";
import { sendAcceptanceEmail } from "@/lib/sendEmail";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // Since it's Next.js 15, we await route params
) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const statusToSet = body.status === "Unselected" ? "Unselected" : "Selected";

    await connectToDatabase();

    const application = await Application.findById(id).lean();

    if (!application) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 });
    }

    if (application.status === statusToSet) {
      return NextResponse.json({ message: `Application already ${statusToSet}`, status: application.status }, { status: 400 });
    }

    // HARD UPDATE using native MongoDB driver via Mongoose connection
    const db = mongoose.connection.db;
    
    if (!db) {
      return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
    }
    
    const collection = db.collection("applications");

    const updateFields: any = { status: statusToSet };
    if (statusToSet === "Selected") {
      updateFields.acceptedAt = new Date();
    } else {
      updateFields.acceptedAt = null;
    }

    const writeResult = await collection.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        $set: updateFields,
      }
    );

    console.log("Mongo native updateOne result:", JSON.stringify(writeResult));

    // If nothing was modified, surface that clearly
    if (writeResult.matchedCount === 0) {
      console.error("No document matched for status update. ID:", id);
      return NextResponse.json({ message: "Failed to update status: not found during update" }, { status: 500 });
    }

    // 🚀 NEW: Tell Next.js to immediately purge the cache for these pages!
    revalidatePath(`/admin/applications`);
    revalidatePath(`/admin/applications/${id}`);

    // Send the acceptance email (Only when selected)
    if (statusToSet === "Selected") {
      try {
        await sendAcceptanceEmail({
          to: application.email,
          firstName: application.firstName,
          lastName: application.lastName,
          trackName: application.trackName,
          applicationId: id,
        });
      } catch (emailError) {
        console.error("Warning: Application approved but email failed:", emailError);
        return NextResponse.json(
          { success: true, status: statusToSet, message: "Approved, but automated email failed to send." },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      { success: true, status: statusToSet, message: `Candidate successfully marked as ${statusToSet}` },
      { status: 200 }
    );

  } catch (error) {
    console.error("Acceptance Error:", error);
    return NextResponse.json({ message: "Server error during status update" }, { status: 500 });
  }
}