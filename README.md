# Headless WordPress Turborepo starter

Monorepo for my personal website & projects

## Prerequisites:
1. Working WordPress Instance with these plugins installed:
- [Add WPGraphQL SEO](https://github.com/ashhitch/wp-graphql-yoast-seo)
- [Advanced Custom Fields](https://www.advancedcustomfields.com/)
    - `Our ACF plugin has been taken over forcibly by wordpressdotorg without our consent.` (NOT Secure Custom Fields) [READ MORE](https://www.advancedcustomfields.com/blog/acf-plugin-no-longer-available-on-wordpress-org/)
    - Add The ACF Json within `wp-assets/acf-fields/acf-export.json`
    - To this page: `/wp-admin/edit.php?post_type=acf-field-group&page=acf-tools`
- [Faust.js™](https://faustjs.org/)
- [Generate WpGraphql Image DataUrl](https://github.com/dipankarmaikap/wp-graphql-image-dataurl)
- [Gravity Forms](https://www.gravityforms.com/)
- [WPGraphQL](https://www.wpgraphql.com/)
- [WPGraphQL CORS](https://www.wpgraphql.com/extenstion-plugins/wpgraphql-cors)
- [WPGraphQL for ACF](https://github.com/wp-graphql/wpgraphql-acf)
- [WPGraphQL for Gravity Forms](https://github.com/AxeWP/wp-graphql-gravity-forms)
2. [Vercel](https://vercel.com/) Account for delpoyment
3. Github Account to push code to


## Features:
- Preview Draft Posts
- Custom ACF Flexible Content Components for Page Building
- Tailwind CSS for styling
- Gravity Forms Component (IN DEVELOPMENT)
- Auth / My Account Page
- More Coming Soon!

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app (IN DEVELOPMENT)
- `web`: a Headless WordPress website using Faust JS
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `@repo/cb-headless-gravity-forms`: A headless gravity forms component (IN DEVELOPMENT)

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities Used

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
