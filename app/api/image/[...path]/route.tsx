import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

/**
 * @swagger
 * /api/image/{path}:
 *   get:
 *     description: Pobiera obraz o określonej ścieżce.
 *     parameters:
 *       - in: path
 *         name: path
 *         required: true
 *         description: Ścieżka do obrazu.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pomyślnie pobrano obraz.
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Obraz o podanej ścieżce nie został znaleziony. Zwracany jest domyślny obraz.
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 */


export async function GET(request: NextRequest, {params}: {params: {path: string[]}}) {
  let [folder_path, image_name] = params.path;
  image_name = image_name + ".jpg"

  let filePath = path.join(process.cwd(), 'public', folder_path, image_name);

  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, { headers: { 'Content-Type': 'image/jpeg' } });
  } else {
    filePath = path.join(process.cwd(), 'public', 'default', 'ghost.jpg');
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, { headers: { 'Content-Type': 'image/jpeg' } });
  }
}
