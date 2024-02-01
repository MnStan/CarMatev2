import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     description: Wylogowuje aktualnie zalogowanego użytkownika, usuwając tokeny JWT z ciasteczek.
 *     responses:
 *       200:
 *         description: Pomyślnie wylogowano użytkownika.
 *       500:
 *         description: Wystąpił błąd serwera podczas wylogowywania.
 */


export async function GET(req: NextRequest) {
  const response = new NextResponse(JSON.stringify({ status: "success" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

  await Promise.all([
    response.cookies.set({
      name: "token",
      value: "",
      maxAge: -1,
    }),
    response.cookies.set({
      name: "logged-in",
      value: "",
      maxAge: -1,
    }),
    response.cookies.set({
      name: "refreshToken",
      value: "",
      maxAge: -1,
    }),
  ]);

  return response;
}
