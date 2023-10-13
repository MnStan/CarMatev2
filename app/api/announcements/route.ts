import { getAnnouncments } from "@/lib/data";
import { NextResponse } from "next/server";

export const GET = async (request: Request, response: Response) => {
    try {
        const announcements = getAnnouncments();
        return NextResponse.json({message: "OK", announcements}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}.error, {
            status: 500,
        });
    }
};