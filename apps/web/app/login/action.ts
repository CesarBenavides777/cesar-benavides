"use server";

import { onLogin } from "@faustwp/experimental-app-router";
import { redirect } from "next/navigation";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function loginAction(prevData: any, formData: FormData) {
  const res = await onLogin(formData);

  const redirectUrl = formData.get("redirect");

  if (res.error) {
    return res;
  }

  if (redirectUrl) {
    redirect(redirectUrl as string);
  } else {
    redirect("/my-account");
  }
}
