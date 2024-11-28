"use server";

import { onLogout } from "@faustwp/experimental-app-router";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await onLogout();
  redirect("/login");
}
