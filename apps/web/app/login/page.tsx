"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { loginAction } from "./action";

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

export default function Page() {
  const [state, formAction] = useActionState(loginAction, {});

  return (
    <>
      <h2>Login</h2>

      <form action={formAction}>
        <fieldset>
          <label htmlFor="usernameEmail">Username or Email</label>
          <input type="name" name="usernameEmail" />
        </fieldset>

        <fieldset>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </fieldset>

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
    </>
  );
}
