import DropDownNav from "@/components/navbar/DropDownNav";
import ExploreMoreLayout from "@/components/sidebar/ExploreMoreLayout";
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
    <main className="w-full h-full">
      <div className="">{children}</div>
    </main>
  );
}
