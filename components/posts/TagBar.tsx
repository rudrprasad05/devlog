"use client";

import { GetAllCategory } from "@/actions/category";
import React from "react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { CategoryType } from "@/types";

const TagBar = ({ category }: { category: CategoryType[] }) => {
  const router = useRouter();
  const params = useSearchParams();
  const search = params.get("search");

  const handleClick = (name: string) => {
    if (search != name) router.push(`/posts?search=${name}`);
    else router.push(`/posts`);
  };
  return (
    <div className="flex gap-3 items-center">
      {category.map((cat) => (
        <Badge
          variant={search == cat.name ? "default" : "outline"}
          key={cat.id}
          onClick={() => handleClick(cat.name as string)}
        >
          {cat.name}
        </Badge>
      ))}
    </div>
  );
};

export default TagBar;
