"use server";

import prisma from "@/lib/prismadb";

export async function DeleteComment({ id }: { id: string }) {
  return await prisma.comment.delete({
    where: {
      id,
    },
  });
}

export async function ModerateComment({ id }: { id: string }) {
  return await prisma.comment.update({
    where: {
      id,
    },
    data: {
      isModerated: true,
    },
  });
}
