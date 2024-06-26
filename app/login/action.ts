// login/actions.ts
"use server";

import { customLogin } from "@/utils/customLoginHandler";
// login/actions.ts

import { redirect } from "next/navigation";
export async function loginAction(prevData: any, formData: FormData) {
  const res = await customLogin(formData);

  if (res.error) {
    console.error("Login Error:", res.error);
    return res;
  }

  redirect("/my-account");
}