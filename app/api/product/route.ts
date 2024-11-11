import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const product = await prisma.product.findMany();
  return NextResponse.json(product)
}

export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get("name") || "";
    const description = searchParams.get("description") || "";
    const price = searchParams.get("price") || "";
    const username = searchParams.get("username") || "";

    const priceFloat = parseFloat(price)

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price : priceFloat,
        username,
      }
    })
    console.log(newProduct)
    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id") || "";
    const name = searchParams.get("name") || "";
    const description = searchParams.get("description") || "";
    const price = searchParams.get("price") || "";
    const username = searchParams.get("username") || "";

    const priceFloat = parseFloat(price)

    console.log(id)
    console.log(name)
    console.log(description)
    console.log(price)
    console.log(username)

    const newProduct = await prisma.product.update({
      data:{
        name,
        description,
        price : priceFloat,
        username,
      },
      where :{
        id
      }
    })
    console.log(newProduct)
    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id") || "";

    console.log(id)

    const newProduct = await prisma.product.delete({
      where :{
        id
      }
    })
    console.log(newProduct)
    return NextResponse.json(newProduct


    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}