import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest, {params}: {params: {path: string[]}}) {
  let [folder_path, image_name] = params.path;
  image_name = image_name + ".jpg"

  let filePath = path.join(process.cwd(), 'public', folder_path, image_name);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), 'public', 'default', 'ghost.jpg');
  }

  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, { headers: { 'Content-Type': 'image/jpeg' } });
  } else {
    return NextResponse.json({ message: 'Image not found' }, { status: 404 });
  }
}
