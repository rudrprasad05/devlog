import { GetAllCategory } from "@/actions/category";
import { GetSimilarPost } from "@/actions/post";
import { PostType } from "@/types";
import React from "react";

import ExploreCategory from "./ExploreCategory";
import MayAlsoLike from "./MayAlsoLike";

const ExploreMoreLayout = async ({ post }: { post: PostType }) => {
  const categories = await GetAllCategory();
  const alsoLike = await GetSimilarPost(post.categoryId);
  return (
    <div className="bg-card sticky top-10 py-10 px-10 mr-20">
      <ExploreCategory categories={categories} />
      <MayAlsoLike posts={alsoLike} />
    </div>
  );
};

export default ExploreMoreLayout;
