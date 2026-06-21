import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dbConnect from "../lib/mongodb";
import User from "../models/User";

async function createAdmin() {
  try {
    await dbConnect();

    const name = "nadeem";
    const plainTextPassword = "company@2003";

    // Hash the password (10 salt rounds is standard)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);

    // Check if user already exists
    const existingUser = await User.findOne({ name });

    if (existingUser) {
      // Update existing user's password
      existingUser.password = hashedPassword;
      await existingUser.save();
      console.log(`Updated existing user '${name}' with new hashed password.`);
    } else {
      // Create new user
      const newUser = new User({
        name,
        password: hashedPassword,
      });
      await newUser.save();
      console.log(`Created new admin user '${name}'.`);
    }

    console.log("Admin setup complete. You can now login.");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

createAdmin();