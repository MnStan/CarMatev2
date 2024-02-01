import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     description: Pobiera informacje o użytkowniku na podstawie identyfikatora.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identyfikator użytkownika.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pomyślnie pobrano informacje o użytkowniku.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_info_id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     surname:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *       500:
 *         description: Nie udało się znaleźć użytkownika o podanym identyfikatorze.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */


export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
  const id = params.id
  let userInfo

  const user = await prisma.user.findUnique({
    where: {
      user_id: id
    }
  })

  if (user) {
    userInfo = await prisma.user_info.findUnique({
      where: {
        user_info_id: user.user_id
      }
    })
  } else {
    return NextResponse.json({message: 'Could not find user'}, {status: 500})
  }
  
  return NextResponse.json({data: userInfo}, {status: 200})
}