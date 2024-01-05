import prisma from "@/lib/prismadb";
import { NewPostType } from "@/schemas/post";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: NewPostType = await request.json();
    const { name, imageUrl, category, authorId } = body;

    console.log(body);

    const product = await prisma.post.create({
      data: {
        name,
        categoryId: category,
        imageUrl,
        authorId: authorId as string,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.log(error, "NEW BRANCH ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const product = await prisma.post.findMany({
      include: { category: true },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.log(error, "NEW BRANCH ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}
