import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Fungsi untuk membaca semua produk yang ada
export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// Fungsi untuk membuat produk baru

export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const email = searchParams.get("email") || "";
    const fullName = searchParams.get("fullName") || "";
    const password = searchParams.get("password") || "";
    const username = searchParams.get("username") || "";

    console.log("email:", email);
    console.log(fullName);
    console.log(password);
    console.log(username);
    const newProduct = await prisma.user.create({
      data: {
        username,
        password,
        email,
        fullName,
      },
    });

    // Return the created product
    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

