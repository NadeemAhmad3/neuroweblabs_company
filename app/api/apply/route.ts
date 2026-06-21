import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Application from "@/models/Application";
import { sendApplicationEmail } from "@/lib/sendEmail";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    const formData = await req.formData();
    
    // Parse normal fields
    const trackName = formData.get("trackName") as string;
    const selectedTier = formData.get("selectedTier") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const github = formData.get("github") as string;
    const linkedin = formData.get("linkedin") as string;
    const university = formData.get("university") as string;
    const degree = formData.get("degree") as string;
    const experience = formData.get("experience") as string;
    const motivation = formData.get("motivation") as string;

    // Parse files
    const resumeFile = formData.get("resume") as File | null;
    const photoFile = formData.get("photo") as File | null;

    let resumeData = null;
    let photoData = null;

    if (resumeFile && resumeFile.size > 0) {
      const buffer = await resumeFile.arrayBuffer();
      const base64String = Buffer.from(buffer).toString('base64');
      resumeData = {
        data: base64String,
        contentType: resumeFile.type,
        filename: resumeFile.name,
      };
    }

    if (photoFile && photoFile.size > 0) {
      const buffer = await photoFile.arrayBuffer();
      const base64String = Buffer.from(buffer).toString('base64');
      photoData = {
        data: base64String,
        contentType: photoFile.type,
        filename: photoFile.name,
      };
    }

    const application = new Application({
      trackName,
      selectedTier,
      price: selectedTier === "premium" ? 500 : 0, // Assuming 500 is the premium default
      firstName,
      lastName,
      email,
      phone,
      github,
      linkedin,
      university,
      degree,
      resume: resumeData,
      photo: photoData,
      experience,
      motivation,
    });

    await application.save();

    // Send confirmation email asynchronously (don't block the response)
    sendApplicationEmail({
      to: email,
      firstName,
      lastName,
      trackName,
      selectedTier,
    }).catch((emailError) => {
      console.error("Failed to send application confirmation email:", emailError);
    });

    return NextResponse.json({ message: "Application submitted successfully" }, { status: 201 });
  } catch (error: unknown) {
    console.error("Application submission error:", error);
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}