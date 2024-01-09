import DropDownNav from "@/components/navbar/DropDownNav";
import Footer from "@/components/navbar/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Manage your blog",
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
      <Footer />
    </main>
  );
}
