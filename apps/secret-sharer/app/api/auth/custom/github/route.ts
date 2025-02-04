import { NextRequest, NextResponse } from "next/server";
import { loginWithOAuth } from "@/lib/wp/auth/login";
import { signIn } from "@/auth"; // NextAuth's programmatic signIn

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(new URL("/login?error=NoCode", req.url));
  }

  // Pass the code to your WordPress backend
  const sessionData = await loginWithOAuth("GITHUB", code);
  if (!sessionData.user || !sessionData.authToken || !sessionData.refreshToken) {
    return NextResponse.redirect(new URL("/login?error=AccessDenied", req.url));
  }
  // console.log("Session Data", sessionData);

  // Build a user object for NextAuth to store in its JWT/session
  // For example, you can store WP tokens in user.auth
  const user = {
    id: String(sessionData.user?.databaseId ?? "wpUserId"),
    name: sessionData.user?.name,
    auth: {
      authToken: sessionData.authToken,
      refreshToken: sessionData.refreshToken,
    },
  };

  // Programmatically sign in with NextAuth's "credentials" provider
  // so that NextAuth will store this user.auth data in the session
  // NOTE: We must pass { redirect: false } to get back a signIn result object
  await signIn("credentials", {
    usernameEmail: "",
    password: "",
    user: JSON.stringify(user),
    redirect: false,
  });

  // If signIn succeeded, NextAuth has stored tokens in the session cookie
  if (sessionData?.user) {
    return NextResponse.redirect(new URL("/my-account", req.url));
  }

  return NextResponse.redirect(new URL("/login?error=AccessDenied", req.url));
}
