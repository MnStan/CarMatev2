import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
  const id = params.id
  let userInfo

  const user = await prisma.user.findUnique({
    where: {
      user_id: parseInt(id, 10)
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