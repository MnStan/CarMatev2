import { writeFile, mkdirSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

/**
 * @swagger
 * /api/upload:
 *   post:
 *     description: Przesyła plik obrazu do serwera.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               imageId:
 *                 type: string
 *               directory:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pomyślnie przesłano plik obrazu.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Nie udało się przesłać pliku obrazu.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 */


export async function POST(request: NextRequest) {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    const fileName: string | null = data.get('imageId') as unknown as string
    const directory: string | null = data.get('directory') as unknown as string

    if (!file) {
        return NextResponse.json({ success: false })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const dir = join(process.cwd(), 'public', directory)
    mkdirSync(dir, { recursive: true })

    const path = join(dir, fileName + ".jpg")
    writeFile(path, buffer, 'utf8' , (err) => {
        if (err) throw err;
      });
    
    return NextResponse.json({ success: true })
}
