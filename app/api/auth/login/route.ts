import { getEnvVariable, getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { signJWT } from "@/lib/token";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: Authenticates a user and returns JWT tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 token:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: Invalid email or password
 *       400:
 *         description: Failed validations
 *       500:
 *         description: Server error
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user || !(await compare(body.password, user.password))) {
      return getErrorResponse(401, "Invalid email or password");
    }

    const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");

    const token = await signJWT(
      { sub: user.user_id },
      { exp: `${JWT_EXPIRES_IN}m`, type: 'access' }
    );

    const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 10;
    const cookieOptions = {
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: tokenMaxAge,
    };

    const REFRESH_EXPIRES_IN = getEnvVariable("REFRESH_EXPIRES_IN")

    const refreshToken = await signJWT(
      { sub: user.user_id },
      { exp: `${REFRESH_EXPIRES_IN}m`, type: 'refresh' }
    );

    const refreshTokenMaxAge = parseInt(REFRESH_EXPIRES_IN) * 100;
    const refreshTokenCookieOptions = {
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: refreshTokenMaxAge,
    };

    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        token,
        refreshToken
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

    await Promise.all([
      response.cookies.set(cookieOptions),
      response.cookies.set(refreshTokenCookieOptions),
      response.cookies.set({
        name: "logged-in",
        value: "true",
        maxAge: tokenMaxAge,
      }),
    ]);

    return response;
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }

    return getErrorResponse(500, error.message);
  }
}
