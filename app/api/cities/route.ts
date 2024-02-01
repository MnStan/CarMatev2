import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let cities

  try {
    cities = await prisma.city.findMany();
  } catch (error) {
    return NextResponse.json({message: 'Błąd podczas pobierania miast'}, {status: 500})
  }
  
  return NextResponse.json({data: cities}, {status: 200})
}
