import type { OAuthConfig, OAuthUserConfig } from "@auth/core/providers";

/**
 * Custom "oauth" provider that:
 * 1) Tells Auth.js a "token" endpoint (fake in this case),
 * 2) Intercepts the ?code=... in `request()` and returns it in `tokens`,
 * 3) Avoids automatic code->access_token exchange,
 * 4) Satisfies Auth.js so it doesn't throw "InvalidEndpoints."
 */
export function GitHubCustom(options: OAuthUserConfig<any>): OAuthConfig<any> {
  return {
    // The provider ID must match the string you pass to signIn("github")
    id: "github",
    name: "GitHub",
    type: "oauth",

    // The real GitHub "authorize" URL for initial redirect
    authorization: {
      url: "https://github.com/login/oauth/authorize",
      // optional custom scopes
      params: { scope: "user:email" },
    },

    /**
     * We define a "token" property with:
     *  - url: some string (can be a real or fake URL)
     *  - request: an async function returning { tokens: {...} }
     */
    token: {
      // Must provide at least some string for `url`, or Auth.js complains
      url: "https://example.com/fake-token-endpoint",

      async request({ params }) {
        // "params" has the query from GitHub, e.g. ?code=...
        const code = params.code;
        if (!code) {
          throw new Error("No GitHub code found in callback.");
        }
        // Return an object shaped like { tokens: {...} }
        // We'll store the raw code in tokens.code
        return {
          tokens: {
            access_token: "", // placeholder
            token_type: "custom-github",
            code,
          },
        };
      },
    },

    /**
     * Minimal profile function so NextAuth doesn't try to fetch real GitHub user info.
     * Or you can implement a real "profile" fetch.
     */
    async profile(_, tokens) {
      // The "tokens" object has the code we set above, if you want it here.
      return {
        id: "github_user",
        name: "GitHub User",
        email: "",
      };
    },

    clientId: options.clientId,
    clientSecret: options.clientSecret,
    checks: ["pkce"], // or "state" / "none", etc.
  };
}
