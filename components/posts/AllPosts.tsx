import { PostType } from "@/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { MdCalendarToday } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Badge } from "../ui/badge";
import SearchBar from "./SearchBar";

const AllPosts = ({ posts }: { posts: PostType[] }) => {
  return (
    <div className="w-4/5 mx-auto py-20">
      <div className="flex">
        <h1 className="text-3xl pb-8 grow">Browse Our Collection</h1>
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {posts.map((post) => (
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
                  <FaExternalLinkAlt
                    className={"fill-primary stroke-primary"}
                  />
                  Read More
                </Link>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
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
