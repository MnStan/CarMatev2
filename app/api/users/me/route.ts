import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     description: Pobiera informacje o zalogowanym użytkowniku na podstawie nagłówka X-USER-ID.
 *     parameters:
 *       - in: header
 *         name: X-USER-ID
 *         required: true
 *         description: Identyfikator użytkownika.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pomyślnie pobrano informacje o zalogowanym użytkowniku.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         user_id:
 *                           type: string
 *                         email:
 *                           type: string
 *                         enabled:
 *                           type: boolean
 *                         privilege_id:
 *                           type: number
 *                         createdAt:
 *                           type: string
 *                         updatedAt:
 *                           type: string
 *                     userInfo:
 *                       type: object
 *                       properties:
 *                         user_info_id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         surname:
 *                           type: string
 *                         phone:
 *                           type: string
 *                         address:
 *                           type: string
 *       401:
 *         description: Nie jesteś zalogowany. Należy podać token, aby uzyskać dostęp.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


export async function GET(req: NextRequest) {
  const userId = req.headers.get("X-USER-ID");

  if (!userId) {
    return getErrorResponse(
      401,
      "You are not logged in, please provide token to gain access"
    );
  }

  const user = await prisma.user.findUnique({ where: { user_id: userId } });
  const userInfo = await prisma.user_info.findUnique({ where: { user_info_id: userId }})

  return NextResponse.json({
    status: "success",
    data: {
      user: { ...user, password: undefined },
      userInfo: { ...userInfo },
    },
  });
}
