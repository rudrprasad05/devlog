import { GetAllCategory } from "@/actions/category";
import { GetAllPost } from "@/actions/post";
import AllPosts from "@/components/posts/AllPosts";
import { Pagination } from "@/components/posts/Pagination";
import { PostType } from "@/types";
import React from "react";

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const PAGE_SIZE = 10;

async function page(props: PageProps) {
  const pageNumber = Number(props?.searchParams?.page || 1);
  const search = String(props?.searchParams?.search || "");

  const take = PAGE_SIZE;
  const skip = (pageNumber - 1) * take;

  const { data, metadata } = await GetAllPost({ take, skip, search });
  const category = await GetAllCategory();

  if (!data) return null;
  return (
    <div>
      <AllPosts posts={data} category={category} />
      <Pagination {...props.searchParams} {...metadata} />
    </div>
  );
}

export default page;
