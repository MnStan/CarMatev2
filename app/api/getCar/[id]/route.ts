import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /api/getCar/{id}:
 *   get:
 *     description: Pobiera informacje o samochodzie o określonym identyfikatorze.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identyfikator samochodu.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pomyślnie pobrano informacje o samochodzie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 car_id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 photos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       photo_id:
 *                         type: string
 *                       photo_url:
 *                         type: string
 *                 user_info:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     surname:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *       404:
 *         description: Samochód o podanym identyfikatorze nie został znaleziony.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Wystąpił błąd serwera podczas pobierania danych samochodu.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */


export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const id  = params.id;
  
  try {
    const car = await prisma.car.findFirst({
      where: {
        car_id: id,
      },
      include: {
        car_infoID: {
          select: {
            name: true,
            description: true,
            photos: {
              select: {
                photo_id: true,
                photo_url: true
              }
            }
          }
        },
        userId: {
          select: {
            user_info: {
              select: {
                name: true,
                surname: true,
                phone: true,
                address: true
              }
            }
          }
        }
      }
    });

    if (!car) {
      return NextResponse.json({ message: 'Car not found' }, { status: 404 });
    }

    const result = {
      car_id: car.car_id,
      name: car.car_infoID.name,
      description: car.car_infoID.description,
      photos: car.car_infoID.photos.map((photo: { photo_id: any; photo_url: any; }) => ({
        photo_id: photo.photo_id,
        photo_url: photo.photo_url
      })),
      user_info: {
        name: car.userId.user_info.name,
        surname: car.userId.user_info.surname,
        phone: car.userId.user_info.phone,
        address: car.userId.user_info.address
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: 'Error retrieving car data' }, { status: 500 });
  }
}