import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        const {name, surname, email, password, phone, city, address } = await req.json()
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return new NextResponse(
                JSON.stringify({
                    error: 'Użytkownik o tym adresie e-mail już istnieje'
                }), { status: 400 }
            )
        }

        const hashed = await hash(password, 12)

        const newUserId = uuidv4();
      
        const createdUserInfo = await prisma.user_info.create({
            data: {
              user_info_id: newUserId,
              name,
              surname,
              phone,
              address,
            },
        });
      
        const createdUser = await prisma.user.create({
            data: {
              user_id: newUserId,
              email,
              password: hashed,
              enabled: true,
              privilege: {
                connect: { privilege_id: 2 },
              },
              user_info: {
                connect: { user_info_id: newUserId },
              },
            },
        })

        const createdUserCityInfo = await prisma.user_city_info.create({
            data: {
              user_info: {
                connect: { user_info_id: newUserId },
              },
              cityid: {
                connect: { city_id: city },
              },
            },
        });
          
        return new NextResponse(
            JSON.stringify({
                message: 'Użytkownik został pomyślnie utworzony'
            }), { status: 200 }
        )
          
    } catch (err: any) {
        return new NextResponse(
            JSON.stringify({
                error: `Wystąpił błąd podczas tworzenia użytkownika: ${err.message}`
            }), { status: 500 }
        )
    }
}
