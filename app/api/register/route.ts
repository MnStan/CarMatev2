import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid';

/**
 * @swagger
 * /api/register:
 *   post:
 *     description: Rejestruje nowego użytkownika.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               city:
 *                 type: number
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pomyślnie utworzono użytkownika.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Użytkownik o podanym adresie email już istnieje.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Błąd serwera podczas tworzenia użytkownika.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


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
