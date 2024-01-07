import prisma from "@/lib/prismadb";
import { CommentType } from "@/types";
import { NextResponse } from "next/server";

// TODO nested comments

export async function POST(request: Request) {
  try {
    const body: CommentType = await request.json();
    const { message, userId, postId } = body;

    const comment = await prisma.comment.create({
      data: {
        message,
        userId,
        postId,
        isModerated: false,
      },
    });

    return NextResponse.json(comment);
  } catch (error: any) {
    console.log(error, "COMMENT CREATION ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}
