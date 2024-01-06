import { GetAllCategory } from "@/actions/category";
import React from "react";
import ExploreCategory from "./ExploreCategory";
import { PostType } from "@/types";
import MayAlsoLike from "./MayAlsoLike";
import { GetSimilarPost } from "@/actions/post";

const ExploreMoreLayout = async ({ post }: { post: PostType }) => {
  const categories = await GetAllCategory();
  const alsoLike = await GetSimilarPost(post.categoryId);
  return (
    <div className="bg-card sticky top-0 py-10 px-10">
      <ExploreCategory categories={categories} />
      <MayAlsoLike posts={alsoLike} />
    </div>
  );
};

export default ExploreMoreLayout;
