import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
