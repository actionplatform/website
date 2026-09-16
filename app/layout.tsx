import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Action Platform",
  description: "Standardize how every project is created, versioned, released, and deployed — from the web, CLI, or an AI agent over MCP.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
