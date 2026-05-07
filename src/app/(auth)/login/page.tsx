import React from "react";
import { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Haven account",
};

export default function LoginPage() {
  return <LoginForm />;
}
