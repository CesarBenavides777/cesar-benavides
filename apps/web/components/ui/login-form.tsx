"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { loginAction } from "@/app/login/action";

function SubmitButton() {
  const status = useFormStatus();

  return (
    <button
      disabled={status.pending}
      type={status.pending ? "button" : "submit"}
    >
      {status.pending ? "Loading..." : "Login"}
    </button>
  );
}

export default function LoginForm({ redirect }: { redirect?: string }) {
  const [state, formAction] = useActionState(loginAction, {});

  return (
    <form className="grid gap-2" action={formAction}>
      <fieldset className="flex flex-col gap-2">
        <label htmlFor="usernameEmail">Username or Email</label>
        <input type="name" name="usernameEmail" />
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
      </fieldset>
      {redirect && <input type="hidden" name="redirect" value={redirect} />}

      <SubmitButton />

      {state.error && (
        <p
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: state.error,
          }}
        />
      )}
    </form>
  );
}
