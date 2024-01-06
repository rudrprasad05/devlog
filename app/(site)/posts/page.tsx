import { GetAllPost } from "@/actions/post";
import AllPosts from "@/components/posts/AllPosts";
import { PostType } from "@/types";
import React from "react";

async function page() {
  const allPosts = await GetAllPost();
  if (!allPosts) return null;
  return (
    <div>
      <AllPosts posts={allPosts} />
    </div>
  );
}

export default page;
