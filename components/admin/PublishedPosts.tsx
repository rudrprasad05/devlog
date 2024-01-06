import { PostType } from "@/types";
import React from "react";
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import { MdEditNote } from "react-icons/md";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

interface props {
  posts: PostType[];
}

const PublishedPosts: React.FC<props> = ({ posts }) => {
  if (posts.length == 0) {
    return (
      <div className="italic text-muted-foreground">No Published Posts</div>
    );
  }
  return (
    <>
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="relative w-full h-full">
              <Image
                width={50}
                height={50}
                src={post.imageUrl as string}
                alt={post.name}
              />
            </div>
          </CardHeader>
          <CardFooter>
            <CardDescription className="items-center w-full flex justify-between">
              <div className="capitalize">{post.name}</div>
              <Link
                href={`/admin/posts/build/${post.id}`}
                className={buttonVariants({ variant: "secondary" })}
              >
                <MdEditNote className={"h-8 w-8"} />
              </Link>
            </CardDescription>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default PublishedPosts;
