import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/cities:
 *   get:
 *     description: Pobiera listę wszystkich miast.
 *     responses:
 *       200:
 *         description: Pomyślnie pobrano listę miast.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       city_id:
 *                         type: number
 *                       city_name:
 *                         type: string
 *       500:
 *         description: Wystąpił błąd serwera podczas pobierania miast.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */


export async function GET(request: NextRequest) {
  let cities

  try {
    cities = await prisma.city.findMany();
  } catch (error) {
    return NextResponse.json({message: 'Błąd podczas pobierania miast'}, {status: 500})
  }
  
  return NextResponse.json({data: cities}, {status: 200})
}
