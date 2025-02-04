"use server";

import { signOut } from "@/auth";

export async function logoutAction() {
  await signOut({
    redirect: true,
    redirectTo: "/login",
  });
}
