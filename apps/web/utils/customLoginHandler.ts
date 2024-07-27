// utils/customLoginHandler.ts
import { onLogin } from "@faustwp/experimental-app-router";

export async function customLogin(formData: FormData): Promise<{
  error?: string;
  message?: string;
}> {
  try {
    // Assuming onLogin uses the environment variable directly, or you need to adjust this part to pass the URL correctly
    const result = await onLogin(formData);
    return result;
  } catch (error) {
    console.error("Error in onLogin:", error);
    return {
      error: "Login failed due to an internal error.",
    };
  }
}
