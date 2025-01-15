"use server";

import { signIn } from "@/auth";

export async function loginAction(prevData: any, formData: FormData) {
  const usernameEmail = formData.get("usernameEmail");
  const password = formData.get("password");

 await signIn("credentials", {
   usernameEmail,
   password,
   redirect: true,
   redirectTo: `${process.env.NEXT_PUBLIC_URL}/my-account`,
 });
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
