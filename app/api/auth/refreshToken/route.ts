import { NextRequest, NextResponse } from "next/server";
import { verifyJWT, signJWT } from "@/lib/token";
import { getEnvVariable, getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const refreshTokenHeader = req.headers.get("RefreshAuthorization");

    if (!refreshTokenHeader || !refreshTokenHeader.startsWith('Bearer ')) {
      return getErrorResponse(401, "No refresh token provided");
    }
    
    const refreshToken = refreshTokenHeader.substring(7);

    const payload = await verifyJWT(refreshToken) as { sub: string };
    const user = await prisma.user.findUnique({
      where: { user_id: Number(payload.sub) },
    });

    if (!user) {
      return getErrorResponse(401, "Invalid refresh token");
    }

    const REFRESH_EXPIRES_IN = getEnvVariable("REFRESH_EXPIRES_IN");
    const token = await signJWT(
      { sub: String(user.user_id) },
      { exp: `${REFRESH_EXPIRES_IN}m`, type: 'access' }
    );

    const tokenMaxAge = parseInt(REFRESH_EXPIRES_IN) * 10;
    const cookieOptions = {
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: tokenMaxAge,
    };

    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        token,
        expiresIn: tokenMaxAge
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

    await response.cookies.set(cookieOptions);

    const newCookie = response.cookies.get("token")

    return response;
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }

    return getErrorResponse(500, error.message);
  }
}
