"use server";

import prisma from "@/lib/prismadb";

export async function GetAllCategory() {
  return await prisma.category.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
}
