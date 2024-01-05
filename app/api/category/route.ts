import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { NewCategoryType } from "@/schemas/category";

export async function POST(request: Request) {
  try {
    const body: NewCategoryType = await request.json();
    const { name, imageUrl } = body;

    const category = await prisma.category.create({
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    console.log(error, "NEW BRANCH ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const category = await prisma.category.findMany({
      //   include: {
      //     products: true,
      //   },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    console.log(error, "NEW BRANCH ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}
