import DropDownNav from "@/components/navbar/DropDownNav";
import Footer from "@/components/navbar/Footer";
import type { Metadata } from "next";

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
    <main>
      <DropDownNav />
      <div>{children}</div>
      <Footer />
    </main>
  );
}
