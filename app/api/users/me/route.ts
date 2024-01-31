import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
