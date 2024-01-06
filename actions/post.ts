"use server";

import prisma from "@/lib/prismadb";
import { getCurrentUser } from "./user";
import { NewPostForm, NewPostType } from "@/schemas/post";

class UserNotFoundErr extends Error {}

export async function GetAllPost() {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: "asc",
    },
    include: {
      comments: true,
      author: true,
      category: true,
    },
  });
}

export async function GetSomeDraftPost({
  take,
  published,
}: {
  take: number;
  published: boolean;
}) {
  return await prisma.post.findMany({
    take: take,
    where: {
      published: published,
    },
    include: {
      author: true,
      comments: true,
      likes: true,
    },
  });
}

export async function GetPostStats() {
  const user = await getCurrentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const stats = await prisma.post.aggregate({
    where: {
      authorId: user.id,
    },
    _sum: {
      visits: true,
    },
  });
  const visits = stats._sum.visits || 0;

  return {
    visits,
  };
}

export async function CreateSite(data: NewPostType) {
  const validation = NewPostForm.safeParse(data);
  if (!validation.success) {
    throw new Error("Site not valid");
  }

  const user = await getCurrentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const { name, category, imageUrl, authorId } = data;

  const Site = await prisma.post.create({
    data: {
      authorId: authorId as string,
      name,
      categoryId: category,
      imageUrl,
    },
  });

  if (!Site) {
    throw new Error("something went wrong");
  }

  return Site.id;
}

export async function GetPostById(id: string) {
  // const user = await getCurrentUser();
  // if (!user) {
  //   throw new UserNotFoundErr();
  // }

  await prisma.post.update({
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      id: id,
    },
  });

  return await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      comments: true,
      likes: true,
    },
  });
}

export async function UpdateSiteContent(id: string, jsonContent: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.post.update({
    where: {
      authorId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}

export async function PublishSite(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.post.update({
    data: {
      published: true,
    },
    where: {
      authorId: user.id,
      id,
    },
  });
}

export async function UnPublishSite(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.post.update({
    data: {
      published: false,
    },
    where: {
      authorId: user.id,
      id,
    },
  });
}

export async function DeleteSite(id: string) {
  return await prisma.post.delete({
    where: {
      id: id,
    },
  });
}

export async function GetSimilarPost(cat: string) {
  return await prisma.post.findMany({
    where: {
      categoryId: cat,
    },
  });
}
