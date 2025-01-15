"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function loginAction(prevData: any, formData: FormData) {
  const usernameEmail = formData.get("usernameEmail");
  const password = formData.get("password");
  try {
    const res = await signIn("credentials", {
      usernameEmail,
      password,
      redirect: false,
    });

    if (!res) {
      throw new Error("Login failed");
    }

    if (res) {
        console.log("Login successful");
    }
  } catch (error: any) {
    return { error: error?.cause?.message || error.message || "Login failed" };
  } finally {
    redirect(`${process.env.NEXT_PUBLIC_URL}/my-account`);
  }
}

export async function loginWithOAuthAction(prevData: any, formData: FormData) {
  const provider = formData.get("provider");
  const callbackUrl = formData.get("callbackUrl");

  await signIn(provider as string, {
    redirect: true,
    redirectTo: `${process.env.NEXT_PUBLIC_URL}/my-account`,
    callbackUrl: callbackUrl as string,
  })
}
