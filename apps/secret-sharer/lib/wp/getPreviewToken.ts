"use server";

import { cookies } from "next/headers";
const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const URI = process.env.NEXT_PUBLIC_URL;

const getPreviewToken = async () => {
  const cookieName = `${WP_URL}-rt`;
  const cookieStore = await cookies();
  const cookie = cookieStore.get(cookieName);
  if (!cookie) {
    return null;
  }

  let url = `${URI}/api/faust/token`;
  console.log("URL", url);
  if (cookie) {
    url += `?code=${encodeURIComponent(cookie.value)}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      if (response.status !== 401) {
        throw new Error("Invalid response from token endpoint");
      }
      return null;
    }
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching preview token:", error);
    return null;
  }
};


export default getPreviewToken;