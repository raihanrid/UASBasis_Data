import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma=new PrismaClient();

// Fungsi untuk membaca semua produk yang ada
export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// Fungsi untuk membuat produk baru
export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get("name") || "";
    const description = searchParams.get("description");
    const price = searchParams.get("price") || "";
    const userId = searchParams.get("userId") || "";
    const priceFloat = parseFloat(price)
    
    console.log(name)
    console.log(description)
    console.log(priceFloat)
    console.log(userId)

    const newProduct = await prisma.product.create({
      data: {
        name: "Cek",
        description: "Cek123",
        price: 10,
        userId: "20",
      },
    });

    console.log(newProduct)
    // return NextResponse.json({"input": name});
    return NextResponse.json("aaa");
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }

}