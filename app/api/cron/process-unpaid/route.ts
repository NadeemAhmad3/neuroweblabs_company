import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Application from "@/models/Application";

export async function GET(req: Request) {
  try {
    // Basic security check could go here if exposed to public, e.g. checking a secret header token
    // const authHeader = req.headers.get("authorization");
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    await connectToDatabase();

    // Calculate the date 3 days ago from now
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    // Find applications that are approved, premium, unpaid, and approved more than 3 days ago.
    const unpaidApplications = await Application.find({
      status: { $in: ["Approved", "Accepted"] },
      selectedTier: "premium",
      paymentStatus: "Unpaid",
      acceptedAt: { $lte: threeDaysAgo }
    });

    let processedCount = 0;

    for (const app of unpaidApplications) {
      // Downgrade them to standard
      app.selectedTier = "standard";
      app.paymentStatus = "Downgraded";
      app.price = 0;
      await app.save();
      processedCount++;
      
      // Optionally could send an email alerting them of the downgrade here
    }

    return NextResponse.json({ 
      message: "Cron executed successfully",
      processedCount
    }, { status: 200 });

  } catch (error) {
    console.error("Cron execution error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}