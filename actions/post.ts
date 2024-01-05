"use server";

import prisma from "@/lib/prismadb";

export async function GetAllPost() {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function GetSomeDraftPost({ take }: { take: number }) {
  return await prisma.post.findMany({
    take: take,
    where: {
      published: false,
    },
    include: {
      author: true,
      comments: true,
      likes: true,
    },
  });
}
