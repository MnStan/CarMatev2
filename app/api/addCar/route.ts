import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
    try {
        const { vehicleName, city, description, directory_url, avatar, user_id, car_info_id } = await req.json()

        const carId = uuidv4();
        const carCityid = uuidv4();
      
        const createdCarInfo = await prisma.car_info.create({
            data: {
              car_info_id: car_info_id,
              name: vehicleName,
              description,
              directory_url: avatar,
              avatar_url: directory_url,
            },
        });
      
        const createdCar = await prisma.car.create({
            data: {
              car_id: carId,
              user_id: user_id,
              car_info_id: createdCarInfo.car_info_id,
              active: true,
            },
        })

        const createdCarCity = await prisma.car_city.create({
            data: {
            car_city_id: carCityid,
            car_id: createdCar.car_id,
            city_id: city,
            },
        });
          
        return new NextResponse(
            JSON.stringify({
                message: 'Pojazd został pomyślnie dodany'
            }), { status: 200 }
        )
          
    } catch (err: any) {
        return new NextResponse(
            JSON.stringify({
                error: `Wystąpił błąd podczas dodawania pojazdu: ${err.message}`
            }), { status: 500 }
        )
    }
}
