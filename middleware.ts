import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/token";
import { getErrorResponse } from "./lib/helpers";
import { apiGetAuthUser, apiRefreshAccessToken } from "./lib/api-requests";
import { error } from "console";

interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
  };
}

let redirectToLogin = false;

async function refreshAccessToken(req: NextRequest, response: NextResponse) {
  const refreshToken = req.cookies.get("refreshToken");
  let token;

  if (refreshToken) {
    try {
      const newToken = await apiRefreshAccessToken(refreshToken?.value);
      if (newToken) {
        // response.headers.set("Authorization", `Bearer ${newToken}`);
        token = newToken.token;

        // Utwórz nową datę reprezentującą czas wygaśnięcia
        const expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds() + newToken.expiresIn);

        response.cookies.set("token", newToken.token, { 
          httpOnly: true,
          expires: expiresAt 
        });

        response.cookies.set({
          name: "logged-in",
          value: "true",
          maxAge: newToken.expiresIn,
        });
      } else {
        throw new Error("Token refresh failed");
      }
    } catch (error) {
      redirectToLogin = true;
      return getErrorResponse(401, "Token refresh failed");
    }
  }

  return token;
}

async function handleAuthorization(req: NextRequest, response: NextResponse, token: string): Promise<NextResponse | undefined> {
  try {
    if (token) {
      const { sub } = await verifyJWT<{ sub: string }>(token);
      response.headers.set("X-USER-ID", sub);
      (req as AuthenticatedRequest).user = { id: sub };
    }
  } catch (error: any) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      if (error.message === "Your token has expired.") {
        return getErrorResponse(401, "Your token has expired.");
      } else if (error.message === "Your token is invalid.") {
        redirectToLogin = true;
        return getErrorResponse(401, "Token is invalid");
      } else {
        redirectToLogin = true;
        return getErrorResponse(401, "An unknown error occurred");
      }
    }

    return NextResponse.redirect(
      new URL(`/login?${new URLSearchParams({ error: error })}`, req.url)
    );
  }

  const authUser = (req as AuthenticatedRequest).user;

  if (!authUser) {
    return NextResponse.redirect(
      new URL(
        `/login?${new URLSearchParams({
          error: "badauth",
          forceLogin: "true",
        })}`,
        req.url
      )
    );
  }

  if (req.url.includes("/login") && authUser) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return response;
}

export async function middleware(req: NextRequest) {
  let token: string | undefined;
  const response = NextResponse.next();

  if (req.cookies.has("token")) {
    token = req.cookies.get("token")?.value;
  } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("Authorization")?.substring(7);
  }

  if (req.nextUrl.pathname.startsWith("/login") && (!token || redirectToLogin))
    return;

  if (!token) {
    const result = await refreshAccessToken(req, response);
    if (typeof result === 'string') {
      token = result;
    } else {
      return result; // Returning error response directly
    }
  }

  // Wait for refreshAccessToken to complete before proceeding
  const authResponse = await handleAuthorization(req, response, token);
  return authResponse;
}




export const config = {
  matcher: ["/profile", "/login", "/api/users/:path*", "/api/auth/logout", "/"],
};
