import prisma from "@/lib/prismadb";
import { NewPostType } from "@/schemas/post";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: any) {
  try {
    const { id } = params;

    const product = await prisma.post.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(product);
  } catch (error: any) {
    return [];
  }
}

export async function PATCH(request: Request, { params }: any) {
  try {
    const { id } = params;
    const body: NewPostType = await request.json();

    const { name, authorId } = body;

    const product = await prisma.post.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(product);
  } catch (error: any) {
    return [];
  }
}
