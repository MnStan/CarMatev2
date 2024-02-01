import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/getAllCars:
 *   get:
 *     description: Pobiera informacje o wszystkich samochodach wraz z ich zdjęciami.
 *     responses:
 *       200:
 *         description: Pomyślnie pobrano informacje o samochodach.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       car_id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       photos:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             photo_id:
 *                               type: string
 *                             photo_url:
 *                               type: string
 *       500:
 *         description: Wystąpił błąd serwera podczas pobierania danych.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


export async function GET(req: NextRequest) {
  try {
    const cars = await prisma.car.findMany({
      include: {
        car_infoID: {
          select: {
            name: true,
            photos: {
              select: {
                photo_id: true,
                photo_url: true
              }
            }
          }
        }
      }
    })

    const result = cars.map((car: { car_id: string, car_infoID: {name: any; photos: any[]; }; }) => ({
      car_id: car.car_id,
      name: car.car_infoID.name,
      photos: car.car_infoID.photos.map(photo => ({
        photo_id: photo.photo_id,
        photo_url: photo.photo_url
      }))
    }))

    return NextResponse.json({
      status: "success",
      data: result
    });
  } catch (error) {
    return getErrorResponse(
      500,
      "Wystąpił błąd podczas pobierania danych"
    );
  }
}
