import { getAnnouncementById, getAnnouncments } from "@/lib/data";
import { NextResponse } from "next/server";

export const GET = async function (request: Request) {
    try {
        const id = request.url.split("announcements/")[1];
        const announcement = getAnnouncementById(id);
    
        if (!announcement) {
            return NextResponse.json({ message: "ERROR"}, { status: 404})
        } 
    
        return NextResponse.json({ message: "OK", announcement}, { status: 200})
    } catch (error) {
        return NextResponse.json({ message: "ERROR"}, { status: 500})
    }
};

export const PUT = async function (request: Request) {
    console.log("PUT");
};