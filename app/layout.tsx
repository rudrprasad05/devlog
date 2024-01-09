import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import AuthContext from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "DevLog",
  description:
    "Networking, ethical hacking, web development, app development and computer blog website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"h-full w-full"}>
        <AuthContext>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthContext>
      </body>
    </html>
  );
}
