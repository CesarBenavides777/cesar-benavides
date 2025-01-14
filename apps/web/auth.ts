import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import { loginWithUserNameAndPassword } from "./lib/wp/auth/login";
import { refreshAuthToken } from "./lib/wp/auth/actions";
import { User } from "./types/wp";
import { isTokenExpired } from "./lib/wp/auth/isTokenExpired";


const providers: Provider[] = [
  Credentials({
    credentials: { 
      password: { label: "Password", type: "password" },
      usernameEmail: { label: "Username or Email", type: "text" },
    },
    async authorize(c) {
      const { password, usernameEmail } = c;
      const user = await loginWithUserNameAndPassword({
        username: usernameEmail as string,
        password: password as string,
      });
      
      if (!user) {
        return null;
      }

      return user;
    },
  }),
  GitHub({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB__SECRET
  },

),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

type SignInCallbackParams = {
  user: any;
  account: any;
  profile: any;
  usernameEmail: string;
  password: string;
  redirect: boolean;
  redirectTo: string;
}

type SessionCallbackParams = {
  session: {
    isLoggedIn: boolean;
    userData: any;
    authToken?: string;
    refreshToken?: string;
  };
  token: User & {
    auth: {
      authToken: string;
      refreshToken: string;
    };
    name: string;
    email: string;
    sub: string;
  };
}

const callbacks = {
  signIn: async ({
    user,
    account,
    profile,
  }: SignInCallbackParams): Promise<boolean> => {
    try {
      // Handle additional login logic for credential-based logins if needed.
      if (account.provider === "credentials") {
        const { auth } = user;
        const { authToken, refreshToken } = auth;

        if (!authToken && !refreshToken) {
          return false;
        }
        return true;
      }

      if (account.provider === "github") {
        const { auth } = user;
        const { authToken, refreshToken } = auth;

        if (!authToken && !refreshToken) {
          return false;
        }
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error in signIn callback:", error);
      return false; // Login failed.
    }
  },
  signOut: async ({ account, token }) => {
    try {
      return true;
    } catch (error) {
      console.error("Error during signOut callback:", error);
      return false;
    }
  },
  jwt: async ({ token, user, trigger }) => {
    const expired = isTokenExpired(token?.auth?.authToken);

    if (trigger === "signOut") {
      // Clear tokens when the user logs out
      delete token.auth;
      return {};
    }

    if (user) {
      return {
        ...token,
        ...user,
      };
    }

    if (token?.auth?.authToken && !expired) {
      // Token is still valid, no need to refresh
      return token;
    }

    if (expired) {
      try {
        const tokens = await refreshAuthToken(token.auth.refreshToken);

        if (tokens) {
          return {
            ...token,
            auth: {
              ...token.auth,
              authToken: tokens.authToken,
              authTokenExpiration: tokens.authTokenExpiration,
              refreshToken: tokens.refreshToken,
              refreshTokenExpiration: tokens.refreshTokenExpiration,
            },
          };
        } else {
          // Refresh token failed, clear auth data
          delete token.auth;
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        delete token.auth;
      }
    }

    return token;
  },

  session: async ({ session, token }) => {
    if (token?.auth?.authToken) {
      session.isLoggedIn = true;
      session.user = token;
      session.authToken = token.auth.authToken;
      session.refreshToken = token.auth.refreshToken;
    } else {
      session.isLoggedIn = false;
      session.user = null;
      session.authToken = null;
      session.refreshToken = null;
    }

    return session;
  },
};


export const config = {
    providers,
    pages: {
        signIn: "/login",
        myProfile: "/my-account",
        error: "/login",
    },
    callbacks,
}

export const { 
  signIn, 
  signOut, 
  handlers, 
  auth
} = NextAuth(config);
