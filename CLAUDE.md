# Bupper's Coffee Shop — Claude Rules

## Project Overview

A React SPA for a fictional coffee shop. Customers browse the menu and place orders on the `/order` route; staff manage incoming orders on the `/admin` route.

## Commands

```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm typecheck    # react-router typegen + tsc
pnpm format       # prettier (auto-fixes)
pnpm knip         # dead-code analysis
```

No test runner is configured.

## Stack

| Concern | Tool |
|---|---|
| Framework | React Router v7 (SPA mode, `ssr: false`) + Vite |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui + `cn()` utility |
| Server data | TanStack React Query + FeathersJS REST client |
| Local state | localStorage order store (`app/lib/order-store.ts`) |
| Package manager | pnpm |

## Directory Layout

```
app/
  routes/       # page-level route components (home, order, admin)
  components/
    ui/         # shadcn primitives — do not modify by hand, use the CLI
    order/      # order flow components
    admin/      # barista board components
    home/       # marketing page sections
  hooks/        # React Query hooks (use-drinks.ts, use-orders.ts, etc.)
  lib/
    feathers-client.ts  # FeathersJS REST client singleton
    order-store.ts      # localStorage order store + useOrders hook
    menu-data.ts        # static drink/size definitions
    utils.ts            # cn() and other utilities
  routes.ts     # config-based route manifest
```

## Path Alias

Always use `~/` for imports within `app/`. Never use relative `../` paths.

```ts
import { cn } from "~/lib/utils"        // correct
import { cn } from "../../lib/utils"    // wrong
```

## Routing

Routes are declared in `app/routes.ts` (config-based, not file-based). Add new routes there before creating the route file.

## Data Fetching

**API data** (drinks, milks, add-ons, beans) → TanStack React Query hooks in `app/hooks/`. Each hook exposes `data`, `isLoading`, `error`, a `mutator` (create/patch), and a `remover`. Follow the same pattern when adding new hooks.

**Order state** → `app/lib/order-store.ts`. Orders live in `localStorage` under `buppers.orders.v2` and are broadcast via a custom `buppers-orders` window event. Use the `useOrders()` hook to subscribe; use `addOrder()`, `advance()`, and `saveOrders()` for mutations. Do not introduce a separate state manager (Zustand, Redux, etc.) for orders.

**FeathersJS service paths** follow the pattern `buppers/<resource>` (e.g., `client.service("buppers/drinks")`).

## Styling

- Use Tailwind utility classes directly on JSX. No CSS modules.
- Always compose class names with `cn()` from `~/lib/utils` when conditionals are needed.
- shadcn components live in `app/components/ui/`. Add new ones via `pnpm dlx shadcn add <component>` — never edit them by hand.
- Tailwind v4 is configured via `@tailwindcss/vite` — there is no `tailwind.config.js`.
- Pixel values in className strings (`px-[15px]`, `text-[14.5px]`) are intentional design tokens; preserve them when editing components.
- Custom design tokens (colors like `teal`, `ink`, `buppers-muted`, `line`) are defined in `app/app.css`. Do not hardcode hex values in JSX.

## Component Patterns

- Small helper components (e.g., `Chip`, `FieldLabel`) that are only used by one parent live in the same file as the parent, above the export.
- Feature components go in the matching subdirectory (`order/`, `admin/`, `home/`).
- Use `interface` (not `type`) for component prop shapes.
- Prefer named exports over default exports for components.

## TypeScript

- `strict: true` is enabled — no `any`, no `@ts-ignore` without justification.
- Use `verbatimModuleSyntax` — write `import type` when importing types only.
- React Router auto-generates types in `.react-router/types/`; run `pnpm typecheck` to regenerate after adding routes.

## API Environment

- Dev: `http://localhost:3030` (local feathers-api)
- Prod: `https://api.justinszaro.com`

The switch is handled automatically in `app/lib/feathers-client.ts` via `process.env.NODE_ENV`.
