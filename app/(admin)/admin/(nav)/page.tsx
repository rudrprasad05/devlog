import { GetAllCategory } from "@/actions/category";
import { GetSomeDraftPost } from "@/actions/post";
import DraftPosts from "@/components/admin/DraftPosts";
import NewCategoryButton from "@/components/admin/NewCategoryButton";
import NewPostButton from "@/components/admin/NewPostButton";
import PublishedPosts from "@/components/admin/PublishedPosts";
import { buttonVariants } from "@/components/ui/button";
import { PostType } from "@/types";
import Link from "next/link";
import React from "react";

async function page() {
  const categories = await GetAllCategory();
  const drafts = await GetSomeDraftPost({ take: 3, published: false });
  const published = await GetSomeDraftPost({ take: 3, published: true });

  if (!categories || !drafts) return null;

  return (
    <main className={"w-4/5 mx-auto"}>
      <div className="py-10">
        <h1 className="pb-5 text-3xl">Quick Access</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <NewCategoryButton />
          <NewPostButton category={categories} />
        </div>
      </div>

      <div className="py-10">
        <div className="flex justify-between items-center">
          <h1 className="pb-5 text-3xl">Drafts</h1>
          <Link
            className={buttonVariants({ variant: "link" })}
            href={"/admin/products"}
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <DraftPosts posts={drafts} />
        </div>
      </div>

      <div className="py-10">
        <div className="flex justify-between items-center">
          <h1 className="pb-5 text-3xl">Published</h1>
          <Link
            className={buttonVariants({ variant: "link" })}
            href={"/admin/products"}
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <PublishedPosts posts={published} />
        </div>
      </div>
    </main>
  );
}

export default page;
