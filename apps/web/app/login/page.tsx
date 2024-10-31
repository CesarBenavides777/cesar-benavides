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
    <div className={`container max-w-6xl mx-auto py-12 px-4 flex flex-col gap-4`}>
      <h2>Login</h2>

      <form 
        className={`grid gap-2`}
        action={formAction}
      >
        <fieldset className={"flex flex-col gap-2"}>
          <label htmlFor="usernameEmail">Username or Email</label>
          <input type="name" name="usernameEmail" />
        </fieldset>

        <fieldset className={"flex flex-col gap-2"}>
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
    </div>
  );
}
