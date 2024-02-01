import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const { photo_id, car_info_id, photo_url } = await req.json()
        const info = await await prisma.photo.create({
            data: {
                photo_id,
                car_info_id,
                photo_url
            }
        })

        return new NextResponse(
            JSON.stringify({
                message: 'Zdjęcie zostało dodane'
            }), { status: 200 }
        )
    } catch (err: any) {
        return new NextResponse(
            JSON.stringify({
                error: `Wystąpił błąd podczas dodawania zdjęć: ${err.message}`
            }), { status: 500 }
        )
    }
}