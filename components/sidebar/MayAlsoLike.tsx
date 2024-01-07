import { CategoryType, OnlyPostType, PostType } from "@/types";
import React from "react";

const MayAlsoLike = ({ posts }: { posts: OnlyPostType[] }) => {
  if (posts.length <= 0) return null;
  return (
    <div>
      <h1 className="text-xl font-bold text-primary">You may Like</h1>
      <ul className="ml-3 mt-2">
        {posts.map((post) => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MayAlsoLike;
