"use server";

import { signIn } from "@/auth";

export async function loginAction(prevData: any, formData: FormData) {
  const usernameEmail = formData.get("usernameEmail");
  const password = formData.get("password");

  try {
    await signIn("credentials", {
      usernameEmail,
      password,
      redirectTo: "/my-account",
    });
  } catch (error) {
    return {
      error: error,
    };
  }
}

export async function loginWithOAuthAction(prevData: any, formData: FormData) {
  const provider = formData.get("provider");
  const code = formData.get("code");
  const state = formData.get("state");

  try {
    await signIn(provider as string, {
      code,
      state,
      redirectTo: "/my-account",
    });
  } catch (error) {
    return {
      error: error,
    };
  }
}
