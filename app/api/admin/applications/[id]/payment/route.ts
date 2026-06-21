import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Application from "@/models/Application";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { action } = body; 

    await connectToDatabase();
    const application = await Application.findById(id);

    if (!application) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    if (action === "verify_payment") {
      await Application.updateOne({ _id: id }, { $set: { paymentStatus: "Paid" } });
      return NextResponse.json({ message: "Payment verified successfully" }, { status: 200 });
    }

    if (action === "downgrade_to_free") {
      await Application.updateOne({ _id: id }, { $set: { selectedTier: "standard", paymentStatus: "Downgraded", price: 0 } });
      return NextResponse.json({ message: "Candidate shifted to standard tier" }, { status: 200 });
    }

    if (action === "remove_candidate") {
      await Application.findByIdAndDelete(id);
      return NextResponse.json({ message: "Candidate removed entirely" }, { status: 200 });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("Payment action error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}