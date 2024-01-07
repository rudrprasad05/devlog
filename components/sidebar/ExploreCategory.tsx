import { CategoryType } from "@/types";
import React from "react";

const ExploreCategory = ({ categories }: { categories: CategoryType[] }) => {
  if (categories.length <= 0) return null;
  return (
    <div className="pb-8">
      <h1 className="text-xl font-bold text-primary">Browse by Category</h1>
      <ul className="ml-3 mt-2">
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExploreCategory;
