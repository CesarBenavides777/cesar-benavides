import NextAuth from "next-auth";
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
      user: { label: "User", type: "text" },
    },
  async authorize(c, req) {
    // console.log("Credentials", c);
    // console.log("Request", req);
    const userAndPassWordEmptyString = c.usernameEmail === "" && c.password === "";
    if (c.usernameEmail && c.password) {
      const userData = await loginWithUserNameAndPassword({
        username: c.usernameEmail as string,
        password: c.password as string,
      });

      if (!userData) {
        return null;
      }

      return userData
    }

    // If you do "signIn('credentials', { user }, { redirect: false })",
    // NextAuth merges { user } into the authorize() credentials. 
    // So we can check for c.user here:
    if (c?.user && userAndPassWordEmptyString) {
      // c.user is a JSON-serialized object from the signIn call
      const user = typeof c.user === "string" ? JSON.parse(c.user) : c.user
      return user
    }

    // If no valid login, return null
    return null
  }

  }),
  // GitHub({
  //   clientId: process.env.AUTH_GITHUB_ID as string,
  //   clientSecret: process.env.AUTH_GITHUB_SECRET as string,
  // }),
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
};


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
  jwt: async ({ token, user, trigger }: {
    token: {
      auth?: {
        authToken: string;
        authTokenExpiration: number;
        refreshToken: string;
        refreshTokenExpiration: number;
      };
    };
    user: User;
    trigger: string;
  }) => {
    const expired = isTokenExpired(token?.auth?.authToken as string);


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
        const tokens = await refreshAuthToken(token?.auth?.refreshToken as string);

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
  session: async ({ session, token }: {
    session: {
      isLoggedIn: boolean;
      user: User | null;
      authToken: string | null;
      refreshToken: string | null;
    };
    token: User;
  }) => {
    if (token?.auth?.authToken) {
      session.isLoggedIn = true;
      session.user = token;
      session.authToken = token.auth.authToken;
      session.refreshToken = token.auth.refreshToken as string;
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
  debug: true,
};



export const { signIn, signOut, handlers, auth, unstable_update } = NextAuth(config);
