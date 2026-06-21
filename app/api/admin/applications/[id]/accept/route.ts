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
    await connectToDatabase();

    const application = await Application.findById(id).lean();

    if (!application) {
      return NextResponse.json({ message: "Application not found" }, { status: 404 });
    }

    const currentStatus = (application.status || "").toLowerCase();
    const isAlreadyApproved = currentStatus === "approved" || currentStatus === "accepted";

    if (isAlreadyApproved) {
      return NextResponse.json({ message: "Application already approved", status: application.status }, { status: 400 });
    }

    // HARD UPDATE using native MongoDB driver via Mongoose connection
    const db = mongoose.connection.db;
    
    if (!db) {
      return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
    }
    
    const collection = db.collection("applications");

    const writeResult = await collection.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        $set: {
          status: "Approved",
          paymentStatus: "Unpaid",
          acceptedAt: new Date(),
        },
      }
    );

    console.log("Mongo native updateOne result:", JSON.stringify(writeResult));

    // If nothing was modified, surface that clearly
    if (writeResult.matchedCount === 0) {
      console.error("No document matched for status update. ID:", id);
      return NextResponse.json({ message: "Failed to approve application: not found during update" }, { status: 500 });
    }

    // We know DB now has Approved/Unpaid; reflect that in the response payload
    const updatedStatus = "Approved";
    const updatedPaymentStatus = "Unpaid";

    // 🚀 NEW: Tell Next.js to immediately purge the cache for these pages!
    revalidatePath(`/admin/applications`);
    revalidatePath(`/admin/applications/${id}`);

    // Send the acceptance email (Includes logic inside based on Tier)
    try {
      await sendAcceptanceEmail({
        to: application.email,
        firstName: application.firstName,
        lastName: application.lastName,
        trackName: application.trackName,
        selectedTier: application.selectedTier,
        applicationId: id,
      });
    } catch (emailError) {
      console.error("Warning: Application approved but email failed:", emailError);
      return NextResponse.json(
        { success: true, status: updatedStatus, paymentStatus: updatedPaymentStatus, message: "Approved, but automated email failed to send." },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: true, status: updatedStatus, paymentStatus: updatedPaymentStatus, message: "Approved and email sent" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Acceptance Error:", error);
    return NextResponse.json({ message: "Server error during acceptance" }, { status: 500 });
  }
}