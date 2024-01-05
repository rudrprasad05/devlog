import DropDownNav from "@/components/navbar/DropDownNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Already have an Account? Login. New here? Regsiter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <DropDownNav />
      <div>{children}</div>
    </main>
  );
}
