import { GetAllPost } from "@/actions/post";
import { GetDate, PostCard } from "@/components/posts/AllPosts";
import Hero from "@/components/site/hero";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PostType } from "@/types";
import { Badge, Link } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdCalendarToday } from "react-icons/md";

export default async function Home() {
  const { data } = await GetAllPost({ take: 3, skip: 0, search: "" });
  if (!data) return null;
  return (
    <>
      <Hero />
      <div className="w-4/5 mx-auto py-20">
        <h1 className="py-10 text-3xl">Recent Posts</h1>
        <RecentUploads data={data} />
      </div>
    </>
  );
}

export const RecentUploads = ({ data }: { data: any[] }) => {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {data.map((i) => (
        <PostCard key={i.id} post={i} />
      ))}
    </div>
  );
};
