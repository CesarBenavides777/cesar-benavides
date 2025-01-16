"use client";

import { loginAction } from "@/app/login/action";
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
import { useActionState, useEffect, useState } from "react";
import { LoginClient } from "@/types/wp";
import { Button } from "./button";
import { toast } from "sonner";
import { PasswordInput } from "@workspace/ui/components/inputs/PasswordInput";

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

  // const [oAuthState, loginWithOAuthFormAction, isOAuthPending] = useActionState(
  //   loginWithOAuthAction,
  //   {
  //     error: undefined,
  //   },
  // );

  const filteredLoginClients = loginClients?.filter(
    (client) => client.provider !== "PASSWORD",
  );

  console.log("Redirect", redirect);

  // console.log("Filtered Login Clients", filteredLoginClients);

  useEffect(() => {

    // console.log("State", state);
    if (state?.error) {
      toast.error(state?.error);
    }

    // if (oAuthState?.error) {
    //   toast.error(oAuthState?.error);
    // }

  }, [state]);

  	const [currentPassword, setCurrentPassword] = useState("");

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
            {/* <Input id="password" name="password" type="password" required /> */}
            <PasswordInput
              id="password"
              name="password"
              required
              value={currentPassword}
              autoComplete="current-password"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <input
            type="hidden"
            name="redirect"
            value={redirect || `${process.env.NEXT_PUBLIC_URL}/my-account`}
          />
          <Button
            className="w-full cursor-pointer"
            disabled={isPending}
            variant={"default"}
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

          const { clientId } = client || {};
          const authUrl = new URL(client.authorizationUrl as string);
          const state = authUrl.searchParams.get("state") || "";

          const onClick = () => {
            if (client.provider === "GITHUB") {
              const baseURL = "https://github.com/login/oauth/authorize";
              const redirectUri = `${process.env.NEXT_PUBLIC_URL}/api/auth/custom/github`;
              const endpoint = new URL(baseURL);
              endpoint.searchParams.append("client_id", clientId);
              endpoint.searchParams.append("redirect_uri", redirectUri);
              endpoint.searchParams.append("state", state);

              window.location.href = endpoint.toString();
            } else {
              // @TODO: Implement other OAuth providers
            }
          };

          console.log("Client", client);

          return (
            <Button
              variant="secondary"
              className="rounded-full cursor-pointer flex items-center w-12 h-12"
              type="submit"
              // disabled={isOAuthPending}
              onClick={onClick}
              key={`login-client-${client.provider}`}
            >
              <ProviderIcon />
              <span className="sr-only text-foreground">{client?.name}</span>
            </Button>
          );
        })}
      </CardFooter>
    </Card>
  );
}
