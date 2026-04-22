import type { Metadata } from "next";
import { AdminLogin } from "./AdminLogin";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin panel for Knowledge Tree CTA submissions.",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return <AdminLogin />;
}
