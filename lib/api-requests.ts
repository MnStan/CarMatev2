import { NextRequest } from "next/server";
import { FilteredUser, FilteredUserInformations, UserLoginResponse, UserResponse } from "./types";
import { verifyJWT } from "./token";
import { CarData } from "../lib/types"

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:3000";

async function handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("Content-Type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await response.json() : await response.text();
  
    if (!response.ok) {
      if (isJson && data.errors !== null) {
        throw new Error(JSON.stringify(data.errors));
      }
  
      throw new Error(data.message || response.statusText);
    }
  
    return data as T;
  }

export async function apiRegisterUser(
  credentials: string
): Promise<FilteredUser> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });

  return handleResponse<UserResponse>(response).then((data) => data.data.user);
}

export async function apiLoginUser(credentials: string): Promise<string> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });

  return handleResponse<UserLoginResponse>(response).then((data) => data.token);
}

export async function apiLogoutUser(): Promise<void> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/logout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse<void>(response);
}

export async function apiGetAuthUser(token?: string): Promise<FilteredUserInformations> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${SERVER_ENDPOINT}/api/users/me`, {
    method: "GET",
    credentials: "include",
    headers,
  });

  return handleResponse<UserResponse>(response).then((data) => data.data);
}

export async function apiRefreshAccessToken(refreshToken: string): Promise<{token: string, expiresIn: number}> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (refreshToken) {
    headers["RefreshAuthorization"] = `Bearer ${refreshToken}`;
  }

  try {
    const response = await fetch(`${SERVER_ENDPOINT}/api/auth/refreshToken`, {
      method: "POST",
      credentials: "include",
      headers
    });

    if (!response.ok) {
      throw new Error('Refresh token is invalid or expired');
    }

    return handleResponse<UserLoginResponse>(response).then((data) => {
      return {
        token: data.token,
        expiresIn: data.expiresIn
      };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function apiAddCar(credentials: string): Promise<string> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/addCar`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });

  return handleResponse<UserLoginResponse>(response).then((data) => data.token);
}

export async function apiAddPhotosInfo(credentials: string) {
  const response = await fetch(`${SERVER_ENDPOINT}/api/addPhotosInfo`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });


  if (!response.ok) throw new Error(await response.text());
}

export async function apiUploadPhoto(data: FormData) {
  const response = await fetch(`${SERVER_ENDPOINT}/api/upload`, {
    method: "POST",
    body: data,
  });

  if (!response.ok) throw new Error(await response.text());
}

export async function apiGetCarData(carId: string): Promise<CarData> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/getCar/${carId}`);
  return handleResponse<CarData>(response);
}

export async function apiGetImage(params: {path: string, photo_id: string}) {
  const image_name = params.path;
  const photo_id = params.photo_id;

  const response = await fetch(`${SERVER_ENDPOINT}/api/image/${image_name}/${photo_id}`);

  if (!response.ok) throw new Error(await response.text());

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  return url;
}