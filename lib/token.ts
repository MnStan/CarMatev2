import { JWSHeaderParameters, SignJWT, jwtVerify } from "jose"
import { getEnvVariable } from "./helpers";
import { JWTExpired, JWTInvalid } from "jose/errors";
import { decodeProtectedHeader } from "jose";
import { cookies } from "next/headers";

export const signJWT = async (
  payload: { sub: string },
  options: { exp: string, type: 'access' | 'refresh' }
) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const alg = "HS256";
    const jwt = new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(options.exp)
      .setIssuedAt()
      .setSubject(payload.sub);
      
    if (options.type === 'refresh') {
      jwt.setIssuer('refresh-token-issuer');
    }
    
    return jwt.sign(secret);
  } catch (error) {
    throw error;
  }
};
  
  export const verifyJWT = async <T>(token: string): Promise<T> => {
    try {
      return (
        await jwtVerify(
          token,
          new TextEncoder().encode(process.env.JWT_SECRET_KEY)
        )
      ).payload as T;
    } catch (error) {
      if (error instanceof JWTExpired) {
        throw new Error("Your token has expired.");
      } else if (error instanceof JWTInvalid) {
        throw new Error("Your token is invalid.");
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  };

