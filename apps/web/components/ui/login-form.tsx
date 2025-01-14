"use client";

// import { useActionState } from "react";
import { loginAction, loginWithOAuthAction } from "@/app/login/action";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@workspace/ui/components/card";
import { GithubIcon } from "lucide-react";
import { useActionState } from "react";
import { LoginClient } from "@/types/wp";
import { Button } from "./button";

type LoginFormProps = {
  redirect?: string;
  loginClients?: LoginClient[];
};

const providerMap = {
  GITHUB: GithubIcon,
};

export default function LoginForm({ redirect, loginClients }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(loginAction, {
    error: undefined,
  });

  console.log("State", state);

  const [oAuthState, loginWithOAuthFormAction, isOAuthPending] = useActionState(
    loginWithOAuthAction,
    {
      error: undefined,
    },
  );

  const filteredLoginClients = loginClients?.filter(
    (client) => client.provider !== "PASSWORD",
  );

  console.log("filteredLoginClients", filteredLoginClients);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" action={formAction}>
          <div className="grid gap-2">
            <Label htmlFor="usernameEmail">Username or Email</Label>
            <Input
              id="usernameEmail"
              name="usernameEmail"
              type="text"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <input
            type="hidden"
            name="redirect"
            value={redirect || `${process.env.NEXT_PUBLIC_URL}/my-account`}
          />
          <Button
            className="w-full cursor-pointer"
            disabled={isPending}
            type={isPending ? "button" : "submit"}
          >
            {isPending ? "Loading..." : "Login"}
          </Button>
        </form>
        {/* {state.error && (
          <p
            className="mt-4 text-sm text-red-500"
            dangerouslySetInnerHTML={{ __html: state.error }}
          />
        )} */}
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <div className="relative w-full mb-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500 rounded-full">
              Or continue with
            </span>
          </div>
        </div>
        {filteredLoginClients?.map((client) => {
          const ProviderIcon = ({ ...props }) => {
            const Icon = providerMap[client.provider];
            return Icon ? <Icon {...props} /> : null;
          };

          if (!client.provider) {
            return null;
          }
          return (
            <form action={loginWithOAuthFormAction} key={client.provider}>
              <input 
                type="hidden" 
                name="provider" 
                value={client.provider.toLowerCase() ?? ""} 
                id="provider"
              />
              {/* Call back url */}
              <input
                type="hidden"
                name="callbackUrl"
                id="callbackUrl"
                value={client.authorizationUrl ?? ""}
              />
              <Button
                variant="secondary"
                className="w-full cursor-pointer flex flex-row gap-2"
                type="submit"
                disabled={isOAuthPending}
              >
                <ProviderIcon className="w-4 h-4" />
                {isOAuthPending ? "Loading..." : `Continue with ${client.name}`}
              </Button>
            </form>
          );
        })}
      </CardFooter>
    </Card>
  );
}
