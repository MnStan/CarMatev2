import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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