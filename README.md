# 💳 Billing API

[![Fastify](https://img.shields.io/badge/Fastify-5-000000?logo=fastify&logoColor=white)](https://github.com/fastify/fastify)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://github.com/microsoft/TypeScript)
[![Node.js](https://img.shields.io/badge/Node.js-24-5FA04E?logo=nodedotjs&logoColor=white)](https://github.com/nodejs/node)
[![Zod](https://img.shields.io/badge/Zod-3-3068B7?logo=zod&logoColor=white)](https://github.com/colinhacks/zod)
[![Pino](https://img.shields.io/badge/Pino-9-687634?logo=pino&logoColor=white)](https://github.com/pinojs/pino)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white)](https://github.com/pnpm/pnpm)
[![ESLint](https://img.shields.io/badge/ESLint-10-4B32C3?logo=eslint&logoColor=white)](https://github.com/eslint/eslint)
[![Prettier](https://img.shields.io/badge/Prettier-3-F7B93E?logo=prettier&logoColor=black)](https://github.com/prettier/prettier)
[![Vitest](https://img.shields.io/badge/Vitest-3-6E9F18?logo=vitest&logoColor=white)](https://github.com/vitest-dev/vitest)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![All Rights Reserved](https://img.shields.io/badge/License-All%20Rights%20Reserved-red.svg)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-scottdreinhart%2Fbilling-api-181717?logo=github&logoColor=white)](https://github.com/scottdreinhart/billing-api)

Fastify API backend for payment processing, subscription management, and entitlement verification across the game portfolio

**⚠️ PROPRIETARY SOFTWARE — All Rights Reserved**

© 2026 Scott Reinhart. This software is proprietary and confidential.
Unauthorized reproduction, distribution, or use is strictly prohibited.
See [LICENSE](LICENSE) file for complete terms and conditions.

> [!CAUTION]
> **LICENSE TRANSITION PLANNED** — This project is currently proprietary. The license will change to open source once the project has reached a suitable state to allow for it.

[Project Structure](#project-structure) · [Getting Started](#getting-started) · [Tech Stack](#tech-stack) · [API Reference](#api-reference) · [Architecture](#architecture) · [Contributing](#contributing) · [Portfolio Services](#portfolio-services) · [Portfolio Games](#portfolio-games)

## Project Structure

```
src/
├── domain/                           # Pure, framework-agnostic logic
│   ├── types.ts                      # Central type definitions (subscriptions, entitlements, payment intents, pricing tiers, purchase receipts, and webhook events)
│   ├── errors.ts                     # Domain error classes (NotFoundError, ValidationError, etc.)
│   ├── constants.ts                  # Domain constants (page sizes, timeouts)
│   ├── schemas.ts                    # Zod validation schemas (pagination, ID params)
│   └── index.ts                      # Barrel export — re-exports all domain modules
├── app/
│   ├── app.ts                        # Fastify instance builder (plugins, routes, middleware)
│   └── index.ts                      # Barrel export — re-exports app builder
├── infra/
│   ├── config.ts                     # Environment configuration (validates env vars)
│   ├── logger.ts                     # Pino structured logger (standalone, non-request)
│   └── index.ts                      # Barrel export — re-exports infra modules
├── routes/
│   ├── health.ts                     # GET /health + GET /ready system endpoints
│   └── index.ts                      # Barrel export — re-exports all route modules
├── __tests__/
│   └── health.test.ts                # Health endpoint integration tests
└── server.ts                         # Entrypoint — starts the Fastify server

Dockerfile                            # Multi-stage production Docker image
.dockerignore                         # Docker build exclusions
.env.example                          # Environment variable template
package.json                          # Dependencies & scripts
pnpm-lock.yaml                        # pnpm lockfile
pnpm-workspace.yaml                   # pnpm workspace config
LICENSE                               # Proprietary license terms

tsconfig.json                         # TypeScript config (strict mode + @/ path aliases)
tsconfig.build.json                   # TypeScript build config (emits to dist/)
eslint.config.js                      # ESLint flat config (TypeScript + Prettier + boundary enforcement)
vitest.config.ts                      # Vitest test runner config (path aliases + coverage)
.prettierrc                           # Prettier formatting rules
.gitignore                            # Git ignore rules
.nvmrc                                # Node.js version pin (v24)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v24+ (pin via [nvm](https://github.com/nvm-sh/nvm) — see `.nvmrc`)
- [pnpm](https://pnpm.io/) v10+

### Install & Run

```bash
# Install dependencies
pnpm install

# Start development server (auto-restart on file changes)
pnpm dev

# Start production server (no file watching)
pnpm start

# Build for production (compiles TypeScript to dist/)
pnpm build

# Run compiled production build
pnpm preview
```

### Code Quality

```bash
# Individual tools
pnpm lint           # ESLint — check for issues
pnpm lint:fix       # ESLint — auto-fix issues
pnpm format         # Prettier — format all source files
pnpm format:check   # Prettier — check formatting without writing
pnpm typecheck      # TypeScript type check (tsc --noEmit)

# Chains
pnpm check          # lint + format:check + typecheck in one pass (quality gate)
pnpm fix            # lint:fix + format in one pass (auto-fix everything)
pnpm validate       # check + build — full pre-push validation
```

### Testing

```bash
pnpm test           # Run all tests once
pnpm test:watch     # Watch mode — re-run on file changes
pnpm test:coverage  # Run with V8 coverage report
```

### Docker

```bash
# Build the image
docker build -t billing-api .

# Run the container
docker run -p 3000:3000 billing-api
```

### Cleanup & Maintenance

```bash
pnpm clean          # wipe dist/ build output
pnpm clean:node     # delete node_modules only
pnpm clean:all      # nuclear — dist/ + node_modules/
pnpm reinstall      # clean:all + pnpm install
```

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Fastify](https://github.com/fastify/fastify) | 5 | High-performance web framework |
| [TypeScript](https://github.com/microsoft/TypeScript) | 5.9 | Static type checking (strict mode) |
| [Node.js](https://github.com/nodejs/node) | 24 | Runtime (pinned via `.nvmrc`) |
| [Zod](https://github.com/colinhacks/zod) | 3 | Runtime schema validation |
| [Pino](https://github.com/pinojs/pino) | 9 | Structured JSON logging |
| [@fastify/swagger](https://github.com/fastify/fastify-swagger) | 9 | OpenAPI spec generation |
| [@fastify/swagger-ui](https://github.com/fastify/fastify-swagger-ui) | 5 | Interactive API documentation (`/docs`) |
| [@fastify/cors](https://github.com/fastify/fastify-cors) | 11 | Cross-origin resource sharing |
| [@fastify/helmet](https://github.com/fastify/fastify-helmet) | 13 | Security headers |
| [@fastify/rate-limit](https://github.com/fastify/fastify-rate-limit) | 10 | Request rate limiting |
| [Vitest](https://github.com/vitest-dev/vitest) | 3 | Test runner (V8 coverage) |
| [ESLint](https://github.com/eslint/eslint) | 10 | Linting (flat config + boundary enforcement) |
| [Prettier](https://github.com/prettier/prettier) | 3 | Code formatting |
| [pnpm](https://github.com/pnpm/pnpm) | 10 | Fast, disk-efficient package manager |
| [Docker](https://www.docker.com/) | — | Containerized production deployment |

## API Reference

Once the server is running, interactive OpenAPI documentation is available at:

```
http://localhost:3000/docs
```

### Built-in Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Health check — returns status, uptime, timestamp |
| `GET` | `/ready` | Readiness check — returns `{ ready: true }` when all dependencies are available |
| `GET` | `/docs` | Swagger UI — interactive API documentation |

### Proposed Endpoints

#### Subscriptions

| Method | Path | Description |
|---|---|---|
| `POST` | `/subscriptions` | Create a new subscription for a user |
| `GET` | `/subscriptions` | List subscriptions (paginated, filterable by status/plan) |
| `GET` | `/subscriptions/:id` | Get subscription details by ID |
| `PATCH` | `/subscriptions/:id` | Update subscription (change plan, cancel, pause) |
| `DELETE` | `/subscriptions/:id` | Cancel and remove a subscription |
| `POST` | `/subscriptions/:id/renew` | Manually trigger subscription renewal |

#### Pricing Tiers

| Method | Path | Description |
|---|---|---|
| `POST` | `/pricing-tiers` | Create a pricing tier (free, premium, etc.) |
| `GET` | `/pricing-tiers` | List all pricing tiers |
| `GET` | `/pricing-tiers/:id` | Get pricing tier details |
| `PATCH` | `/pricing-tiers/:id` | Update pricing tier (price, features, limits) |
| `DELETE` | `/pricing-tiers/:id` | Archive a pricing tier |

#### Payment Intents

| Method | Path | Description |
|---|---|---|
| `POST` | `/payment-intents` | Create a payment intent (initiates checkout flow) |
| `GET` | `/payment-intents/:id` | Get payment intent status |
| `POST` | `/payment-intents/:id/confirm` | Confirm a pending payment intent |
| `POST` | `/payment-intents/:id/cancel` | Cancel an unconfirmed payment intent |

#### Entitlements

| Method | Path | Description |
|---|---|---|
| `GET` | `/entitlements` | List entitlements for a user (games, themes, features) |
| `GET` | `/entitlements/check` | Check if user is entitled to a specific product (`?userId=&productId=`) |
| `POST` | `/entitlements` | Grant an entitlement to a user |
| `DELETE` | `/entitlements/:id` | Revoke an entitlement |

#### Purchase History

| Method | Path | Description |
|---|---|---|
| `GET` | `/purchases` | List purchase receipts (paginated, filterable by date/product) |
| `GET` | `/purchases/:id` | Get purchase receipt details |
| `GET` | `/purchases/:id/invoice` | Generate downloadable invoice for a purchase |

#### Refunds

| Method | Path | Description |
|---|---|---|
| `POST` | `/refunds` | Initiate a refund for a purchase |
| `GET` | `/refunds` | List refund requests (paginated, filterable by status) |
| `GET` | `/refunds/:id` | Get refund status and details |
| `POST` | `/refunds/:id/approve` | Approve a pending refund (admin) |
| `POST` | `/refunds/:id/reject` | Reject a pending refund with reason (admin) |

#### Payment Methods

| Method | Path | Description |
|---|---|---|
| `POST` | `/payment-methods` | Store a new payment method (card, bank, wallet) for a user |
| `GET` | `/payment-methods` | List user's saved payment methods |
| `GET` | `/payment-methods/:id` | Get payment method details (masked card number, expiry, type) |
| `PATCH` | `/payment-methods/:id` | Update payment method metadata (billing address, default flag) |
| `DELETE` | `/payment-methods/:id` | Remove a saved payment method |
| `POST` | `/payment-methods/:id/default` | Set a payment method as the user's default |

#### Coupons & Promo Codes

| Method | Path | Description |
|---|---|---|
| `POST` | `/coupons` | Create a coupon (percentage or fixed discount, usage limit, expiry) |
| `GET` | `/coupons` | List coupons (paginated, filterable by status/type) |
| `GET` | `/coupons/:id` | Get coupon details and redemption stats |
| `PATCH` | `/coupons/:id` | Update coupon limits, expiry, or active status |
| `DELETE` | `/coupons/:id` | Deactivate a coupon |
| `POST` | `/coupons/validate` | Validate a promo code and return discount details (`?code=&productId=`) |
| `POST` | `/coupons/:id/redeem` | Redeem a coupon against a purchase |

#### Invoices

| Method | Path | Description |
|---|---|---|
| `GET` | `/invoices` | List invoices for a user (paginated, filterable by date/status) |
| `GET` | `/invoices/:id` | Get invoice details (line items, taxes, totals) |
| `GET` | `/invoices/:id/pdf` | Download invoice as PDF |
| `POST` | `/invoices/:id/send` | Email an invoice to the user |
| `GET` | `/invoices/upcoming` | Preview next recurring invoice for a subscription |

#### Tax & Currency

| Method | Path | Description |
|---|---|---|
| `GET` | `/tax/estimate` | Estimate tax for a purchase (`?amount=&country=&region=`) |
| `GET` | `/currencies` | List supported currencies with exchange rates |
| `GET` | `/currencies/:code` | Get current exchange rate for a specific currency |

#### Usage & Metering

| Method | Path | Description |
|---|---|---|
| `POST` | `/usage` | Record a usage event (user, feature, quantity, timestamp) |
| `GET` | `/usage` | Get usage summary for a user in the current billing period |
| `GET` | `/usage/history` | Get historical usage data (paginated, filterable by feature/date range) |
| `GET` | `/usage/limits` | Get remaining usage allowance against the user's current plan |

#### Webhooks

| Method | Path | Description |
|---|---|---|
| `POST` | `/webhooks/stripe` | Handle Stripe webhook events (payment success/failure, subscription changes) |
| `POST` | `/webhooks/app-store` | Handle Apple App Store server notifications |
| `POST` | `/webhooks/play-store` | Handle Google Play billing notifications |

#### Audit Log

| Method | Path | Description |
|---|---|---|
| `GET` | `/audit-log` | List billing events (paginated, filterable by user/event type/date range) |
| `GET` | `/audit-log/:id` | Get full details of a billing event (who, what, when, before/after state) |
| `GET` | `/audit-log/export` | Export audit log as CSV for a date range |

#### Revenue Reports

| Method | Path | Description |
|---|---|---|
| `GET` | `/reports/revenue` | Revenue summary (filterable by date range, product, tier) |
| `GET` | `/reports/mrr` | Monthly recurring revenue breakdown |
| `GET` | `/reports/churn` | Churn rate and cancellation reasons |
| `GET` | `/reports/ltv` | Customer lifetime value segmented by acquisition channel |
| `GET` | `/reports/arpu` | Average revenue per user over time |

## Architecture

This project enforces seven complementary design principles:

1. **CLEAN Architecture** (Layer Separation)
   - `domain/` layer: Pure types, errors, constants, schemas (zero framework dependencies)
   - `app/` layer: Fastify instance builder, use-case services
   - `infra/` layer: External adapters (database, cache, third-party APIs)
   - `routes/` layer: HTTP route handlers (thin — delegates to app/domain)
   - **Benefit**: Domain logic is testable, reusable, and framework-independent

2. **SOLID Principles** (Code-Level Design)
   - Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
   - **Benefit**: Code is maintainable, testable, and resistant to side effects

3. **DRY Principle** (No Duplication)
   - Shared schemas, constants, and error types eliminate duplication
   - **Benefit**: Changes propagate consistently; less code to maintain

4. **Import Boundary Enforcement** (`eslint-plugin-boundaries`)
   - `domain/` → may only import from `domain/` (zero framework deps)
   - `app/` → may import `domain/` + `app/` (never `infra/` or `routes/`)
   - `infra/` → may import `domain/`, `app/`, and `infra/`
   - `routes/` → may import `domain/`, `app/`, and `routes/`
   - **Benefit**: CLEAN layer violations are caught at lint time, not at code review

5. **Path Aliases** (`@/domain`, `@/app`, `@/infra`, `@/routes`)
   - Configured in `tsconfig.json` (`paths`) and `vitest.config.ts` (`resolve.alias`)
   - Eliminates fragile `../../` relative imports across layers
   - **Benefit**: Imports are self-documenting and resilient to file moves

6. **Barrel Exports** (`index.ts` per directory)
   - Each layer exposes a single public API via its barrel file
   - Internal module structure can change without breaking consumers
   - **Benefit**: Explicit public APIs; refactoring internals doesn't cascade import changes

7. **Schema-First Validation** (Zod + OpenAPI)
   - All inputs validated with Zod schemas in the domain layer
   - Fastify route schemas auto-generate OpenAPI docs via `@fastify/swagger`
   - **Benefit**: Single source of truth for validation, serialization, and documentation

## Remaining Work

### Core Functionality

- [ ] **Domain model implementation** — define entities, value objects, and business rules for subscriptions, entitlements, payment intents, pricing tiers, purchase receipts, and webhook events
- [ ] **Database integration** — connect to PostgreSQL/SQLite via Drizzle ORM or Prisma
- [ ] **CRUD route scaffolding** — RESTful endpoints for all domain entities
- [ ] **Authentication** — JWT or API key verification middleware
- [ ] **Authorization** — role-based access control for admin vs. client operations

### Code Quality & Testing

- [ ] **Unit tests** — domain functions and use-case services
- [ ] **Integration tests** — route handlers with database fixtures
- [ ] **E2E tests** — full request lifecycle with Supertest or Fastify inject

### DevOps & Deployment

- [ ] **CI/CD pipeline** — GitHub Actions workflow for lint → test → build → deploy
- [ ] **Database migrations** — version-controlled schema changes
- [ ] **Environment configs** — staging, production, and preview environments
- [ ] **Monitoring** — health-check alerts, error tracking, APM integration

## Future Improvements

- [ ] **Stripe integration** — connect payment intents and subscriptions to Stripe's API for real payment processing
- [ ] **Apple / Google IAP verification** — server-side receipt validation for in-app purchases from mobile game clients
- [ ] **Proration engine** — calculate mid-cycle plan changes (upgrades, downgrades) with accurate billing adjustments
- [ ] **Usage-based billing** — track metered features (API calls, storage, AI hints) and bill per-unit overages
- [ ] **Dunning management** — automated retry logic for failed payments with configurable escalation (email → grace period → suspension)
- [ ] **Invoice PDF generation** — render purchase receipts as downloadable PDF invoices with branding
- [ ] **Revenue analytics dashboard** — aggregate MRR, churn rate, ARPU, and LTV metrics via a reporting endpoint
- [ ] **Webhook replay & audit log** — store all inbound webhook events and allow manual replay for debugging
- [ ] **Multi-currency support** — accept and display prices in multiple currencies with exchange-rate conversion
- [ ] **Coupon & promo codes** — create discount codes redeemable during checkout with usage limits and expiry

## Portfolio Services

Infrastructure services supporting the game portfolio:

| Service | Description |
| ------- | ----------- |
| **[💳 Game Billing](https://github.com/scottdreinhart/game-billing)** | Payment processing & subscription management (Admin App) |
| **[🎨 Theme Store](https://github.com/scottdreinhart/theme-store)** | DLC theme downloader & manager (Admin App) |
| **[📺 Ad Network](https://github.com/scottdreinhart/ad-network)** | Ad serving & revenue management (Admin App) |
| **[🎨 Themes API](https://github.com/scottdreinhart/themes-api)** | Fastify API backend for themes |
| **[📺 Ads API](https://github.com/scottdreinhart/ads-api)** | Fastify API backend for ads |
| **[🏆 Rankings API](https://github.com/scottdreinhart/rankings-api)** | Fastify API backend for rankings & leaderboards |

## Portfolio Games

All games in this portfolio share the same React + Vite + TypeScript + CLEAN architecture stack:

| Game | Description | Complexity |
| ---- | ----------- | ---------- |
| **[Tic-Tac-Toe](https://github.com/scottdreinhart/tictactoe)** | Classic 3×3 grid game with 4 AI difficulty levels and series mode | Baseline — the reference architecture |
| **[Shut the Box](https://github.com/scottdreinhart/shut-the-box)** | Roll dice, flip numbered tiles to match the total; lowest remaining sum wins | Similar — grid UI + dice logic |
| **[Mancala (Kalah)](https://github.com/scottdreinhart/mancala)** | Two-row pit-and-stones capture game; simple rules, satisfying chain moves | Slightly higher — seed-sowing animation |
| **[Connect Four](https://github.com/scottdreinhart/connect-four)** | Drop discs into a 7×6 grid; first to four in a row wins | Similar — larger grid, same win-check pattern |
| **[Simon Says](https://github.com/scottdreinhart/simon-says)** | Repeat a growing sequence of colors/sounds; memory challenge | Similar — leverages existing Web Audio API |
| **[Lights Out](https://github.com/scottdreinhart/lights-out)** | Toggle a 5×5 grid of lights; goal is to turn them all off | Similar — grid + toggle logic |
| **[Nim](https://github.com/scottdreinhart/nim)** | Players take turns removing objects from piles; last to take loses | Simpler — minimal UI, pure strategy |
| **[Hangman](https://github.com/scottdreinhart/hangman)** | Guess letters to reveal a hidden word before the stick figure completes | Similar — alphabet grid + SVG drawing |
| **[Memory / Concentration](https://github.com/scottdreinhart/memory-game)** | Flip cards to find matching pairs on a grid | Similar — grid + flip animation |
| **[2048](https://github.com/scottdreinhart/2048)** | Slide numbered tiles on a 4×4 grid; merge matching tiles to reach 2048 | Slightly higher — swipe input + merge logic |
| **[Reversi (Othello)](https://github.com/scottdreinhart/reversi)** | Place discs to flip opponent's pieces; most discs wins | Moderately higher — flip-chain logic + AI |
| **[Checkers](https://github.com/scottdreinhart/checkers)** | Classic diagonal-move capture board game | Higher — move validation + multi-jump |
| **[Battleship](https://github.com/scottdreinhart/battleship)** | Place ships on a grid, take turns guessing opponent locations | Moderately higher — two-board UI + ship placement |
| **[Snake](https://github.com/scottdreinhart/snake)** | Steer a growing snake to eat food without hitting walls or itself | Different — real-time game loop instead of turn-based |
| **[Monchola](https://github.com/scottdreinhart/monchola)** | Traditional dice/board race game with capture mechanics | Similar — dice roll + board path + capture rules |
| **[Rock Paper Scissors](https://github.com/scottdreinhart/rock-paper-scissors)** | Best-of-N rounds against the CPU with hand animations | Simpler — minimal state, animation-focused |
| **[Minesweeper](https://github.com/scottdreinhart/minesweeper)** | Reveal cells on a minefield grid without detonating hidden mines | Moderately higher — flood-fill reveal + flag logic |

## Contributing

This is proprietary software. Contributions are accepted by invitation only.

If you have been granted contributor access:

1. Create a feature branch from `main`
2. Make focused, single-purpose commits with clear messages
3. Run `pnpm validate` before pushing (lint + format + build gate)
4. Submit a pull request with a description of the change

See the [LICENSE](LICENSE) file for usage restrictions.

## License

Copyright © 2026 Scott Reinhart. All Rights Reserved.

This project is proprietary software. No permission is granted to use, copy, modify, or distribute this software without the prior written consent of the owner. See the [LICENSE](LICENSE) file for full terms.

---
[⬆ Back to top](#-billing-api)
