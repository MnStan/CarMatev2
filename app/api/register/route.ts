import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'
import { number } from 'zod'

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

        const lastUserId = await prisma.user.findFirst({
            select: {
              user_id: true,
            },
            orderBy: {
              user_id: 'desc',
            },
          });
      
          const nextUserId = lastUserId ? lastUserId.user_id + 1 : 1;
      
          const createdUserInfo = await prisma.user_info.create({
            data: {
              user_info_id: nextUserId,
              name,
              surname,
              phone,
              address,
            },
          });
      
          const createdUser = await prisma.user.create({
            data: {
              email,
              password: hashed,
              enabled: true,
              privilege: {
                connect: { privilege_id: 2 },
              },
              user_info: {
                connect: { user_info_id: createdUserInfo.user_info_id },
              },
            },
          })

          const createdUserCityInfo = await prisma.user_city_info.create({
            data: {
              user_info: {
                connect: { user_info_id: createdUserInfo.user_info_id },
              },
              cityid: {
                connect: { city_id: parseInt(city, 10) },
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
