"use server";

import { cookies } from "next/headers";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function verifyPassword(password: string) {
  try {
    const passwordRef = collection(db, "password");
    const snapshot = await getDocs(passwordRef);
    
    let isValid = false;
    snapshot.forEach((doc) => {
      const dbPass = doc.data().pass;
      if (typeof dbPass === 'string' && dbPass.trim() === password.trim()) {
        isValid = true;
      }
    });

    if (isValid) {
      const cookieStore = await cookies();
      cookieStore.set("guest-auth", "true", { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      return { success: true };
    }

    return { success: false, error: "Incorrect password. Please try again." };
  } catch (error) {
    console.error("Error verifying password:", error);
    return { success: false, error: "Failed to verify password. Ensure Firebase is configured correctly." };
  }
}
