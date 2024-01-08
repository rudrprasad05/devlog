import { CategoryType, PostType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdCalendarToday } from "react-icons/md";

import { Badge } from "../ui/badge";
import { buttonVariants } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import SearchBar from "./SearchBar";
import TagBar from "./TagBar";

const AllPosts = ({
  posts,
  category,
}: {
  posts: PostType[];
  category: CategoryType[];
}) => {
  return (
    <div className="w-4/5 mx-auto pt-20 pb-5">
      <div className="flex">
        <h1 className="text-3xl pb-5 grow">Browse Our Collection</h1>
        <SearchBar />
      </div>
      <div className="pb-12">
        <TagBar category={category} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <HandleNoPost posts={posts} />
      </div>
    </div>
  );
};

const HandleNoPost = ({ posts }: { posts: PostType[] }) => {
  if (posts.length == 0) return <>No Post</>;
  else return posts.map((post) => <PostCard key={post.id} post={post} />);
};

export const PostCard = ({ post }: { post: PostType }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <Image
          alt={`${post.name} blog image`}
          src={post.imageUrl as string}
          width={300}
          height={300}
        />
        <CardTitle className="truncate">{post.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <Link href={`/posts?search=${post.category.name}`}>
          <Badge>{post.category.name}</Badge>
        </Link>
        <CardDescription className="flex justify-between pt-2 items-center">
          <div className="flex gap-3 items-center">
            <MdCalendarToday />
            <GetDate data={post.createdAt} />
          </div>
          <Link
            href={`/posts/${post.id}`}
            className={`flex gap-3 items-center ${buttonVariants({
              variant: "link",
            })}`}
          >
            <FaExternalLinkAlt className={"fill-primary stroke-primary"} />
            Read More
          </Link>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export const GetDate = ({ data }: { data: any }) => {
  const MONTHS = [
    "Jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const date = new Date(data);
  const dayOfMonth = date.getDate();
  const month =
    MONTHS[date.getMonth()].charAt(0).toUpperCase() +
    MONTHS[date.getMonth()].slice(1);
  const year = date.getFullYear();

  return (
    <>
      {dayOfMonth} {month} {year}
    </>
  );
};

export default AllPosts;
