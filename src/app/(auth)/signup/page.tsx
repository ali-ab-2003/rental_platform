import React from "react";
import { Metadata } from "next";
import { SignupForm } from "@/features/auth/components/SignupForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Join Haven",
};

export default function SignupPage() {
  return <SignupForm />;
}
