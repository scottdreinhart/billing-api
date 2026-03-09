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

[Project Structure](#project-structure) · [Getting Started](#getting-started) · [Tech Stack](#tech-stack) · [API Reference](#api-reference) · [Architecture](#architecture) · [Environment Variables](#environment-variables) · [Authentication](#authentication) · [Error Handling](#error-handling) · [Rate Limiting](#rate-limiting) · [Data Models](#data-models) · [Deployment](#deployment) · [Supported Clients](#supported-clients) · [Versioning](#versioning) · [Remaining Work](#remaining-work) · [Future Improvements](#future-improvements) · [Contributing](#contributing) · [Portfolio Services](#portfolio-services) · [Portfolio Games](#portfolio-games)

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

### Client UI Pairings

Endpoints that pair directly with a visible UI element in game clients or the Game Billing admin app:

| UI Element | Icon / Control | Endpoint | Surface |
|---|---|---|---|
| Plan selection cards | Radio button group with tier badges | `GET /pricing-tiers` | Game client — upgrade prompt |
| "Subscribe" button | Credit card icon + CTA | `POST /subscriptions` | Game client — checkout |
| "Cancel Subscription" button | ✕ icon with confirmation modal | `DELETE /subscriptions/:id` | Game client — account settings |
| Pause / Resume toggle | ⏸ / ▶ toggle switch | `PATCH /subscriptions/:id` | Game client — subscription card |
| "Renew Now" button | 🔄 refresh icon | `POST /subscriptions/:id/renew` | Game client — expiring subscription banner |
| "Checkout" button | Shopping cart icon | `POST /payment-intents` | Game client — purchase flow |
| "Confirm Payment" button | ✅ checkmark CTA | `POST /payment-intents/:id/confirm` | Game client — payment confirmation step |
| "Cancel Payment" link | ✕ text link | `POST /payment-intents/:id/cancel` | Game client — payment confirmation step |
| Lock / Unlock overlay | 🔒 padlock icon on content cards | `GET /entitlements/check` | Game client — locked themes, features, games |
| Saved payment card row | 💳 card type icon (Visa, MC, etc.) | `GET /payment-methods` | Game client — payment settings |
| "Add Payment Method" button | ➕ plus icon | `POST /payment-methods` | Game client — payment settings |
| Delete card button | 🗑 trash icon on card row | `DELETE /payment-methods/:id` | Game client — payment settings |
| Default card selector | ⭐ star / radio button on card row | `POST /payment-methods/:id/default` | Game client — payment settings |
| Promo code input | Text field + "Apply" button with 🏷 tag icon | `POST /coupons/validate` | Game client — checkout |
| "Redeem" button | 🎟 ticket icon | `POST /coupons/:id/redeem` | Game client — checkout (after validation) |
| Download invoice button | ⬇ download arrow icon | `GET /invoices/:id/pdf` | Game client — purchase history row |
| Email invoice button | ✉ envelope icon | `POST /invoices/:id/send` | Admin app — invoice detail view |
| "Request Refund" button | ↩ return arrow icon | `POST /refunds` | Game client — purchase detail view |
| Approve refund button | ✅ green checkmark | `POST /refunds/:id/approve` | Admin app — refund queue row |
| Reject refund button | ❌ red X | `POST /refunds/:id/reject` | Admin app — refund queue row |
| Usage meter | Progress bar / circular gauge | `GET /usage/limits` | Game client — account dashboard |
| Usage history sparkline | 📊 mini chart | `GET /usage/history` | Game client — usage detail view |
| Receipt row | 🧾 receipt icon in list | `GET /purchases` | Game client — purchase history |
| MRR chart | 📈 line chart widget | `GET /reports/mrr` | Admin app — revenue dashboard |
| Churn rate card | 📉 metric card with trend arrow | `GET /reports/churn` | Admin app — analytics dashboard |
| Revenue summary card | 💰 dollar icon metric card | `GET /reports/revenue` | Admin app — analytics dashboard |
| Audit log timeline | 📋 event list with user avatars | `GET /audit-log` | Admin app — audit view |
| Export CSV button | ⬇ download icon + "Export" label | `GET /audit-log/export` | Admin app — audit toolbar |
| Currency selector | 🌐 dropdown with currency codes | `GET /currencies` | Game client — checkout (region) |
| Tax line item | Auto-calculated row in checkout summary | `GET /tax/estimate` | Game client — checkout summary |

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

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Description | Type | Default | Required |
| -------- | ----------- | ---- | ------- | -------- |
| `PORT` | HTTP server port | `number` | `3000` | No |
| `HOST` | Bind address | `string` | `0.0.0.0` | No |
| `NODE_ENV` | Runtime environment (`development`, `staging`, `production`) | `string` | `development` | No |
| `LOG_LEVEL` | Pino log level (`fatal`, `error`, `warn`, `info`, `debug`, `trace`) | `string` | `info` | No |
| `DATABASE_URL` | PostgreSQL connection string | `string` | — | **Yes** (production) |
| `API_KEY` | Service-to-service API key for internal callers | `string` | — | **Yes** (production) |
| `JWT_SECRET` | Secret used to sign and verify JWT access tokens | `string` | — | **Yes** (production) |
| `STRIPE_SECRET_KEY` | Stripe API secret key for payment processing | `string` | — | **Yes** (production) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret for event verification | `string` | — | **Yes** (production) |
| `APPLE_SHARED_SECRET` | Apple App Store shared secret for IAP receipt validation | `string` | — | No |
| `GOOGLE_SERVICE_ACCOUNT` | Path to Google Play service account JSON for IAP verification | `string` | — | No |
| `CORS_ORIGIN` | Allowed CORS origin(s), comma-separated | `string` | `*` | No |
| `RATE_LIMIT_MAX` | Max requests per rate-limit window | `number` | `100` | No |
| `RATE_LIMIT_WINDOW_MS` | Rate-limit window duration in milliseconds | `number` | `60000` | No |

## Authentication

All non-public endpoints require authentication. The API supports two authentication methods:

### JWT Bearer Tokens (Game Clients & Admin Apps)

Game clients and admin apps authenticate by sending a JWT in the `Authorization` header:

```
Authorization: Bearer <token>
```

- Tokens are issued by the auth service upon successful login
- Tokens contain the user's `sub` (user ID) and `roles` array
- Tokens expire after a configurable TTL (default: 1 hour)
- Refresh tokens are used to obtain new access tokens without re-authentication

### API Keys (Service-to-Service)

Internal services authenticate with a static API key in the `X-API-Key` header:

```
X-API-Key: <key>
```

- Used by admin apps and other portfolio APIs for server-to-server calls
- Keys are configured via the `API_KEY` environment variable
- API key requests bypass user-scoped authorization checks

### Public Endpoints

The following endpoints do not require authentication:

| Endpoint | Purpose |
| -------- | ------- |
| `GET /health` | Health check |
| `GET /ready` | Readiness probe |
| `GET /docs` | Swagger UI |
| `GET /docs/json` | OpenAPI spec |

## Error Handling

All error responses follow a consistent JSON structure:

```json
{
  "statusCode": 422,
  "error": "Unprocessable Entity",
  "message": "Subscription plan 'premium-annual' is not available in region 'EU'",
  "code": "PLAN_NOT_AVAILABLE_IN_REGION"
}
```

| Field | Type | Description |
| ----- | ---- | ----------- |
| `statusCode` | `number` | HTTP status code |
| `error` | `string` | HTTP status text |
| `message` | `string` | Human-readable error description |
| `code` | `string?` | Machine-readable domain error code (optional) |

### HTTP Status Codes

| Status | Meaning | Example |
| ------ | ------- | ------- |
| `400` | Bad Request | Malformed JSON body or missing required field |
| `401` | Unauthorized | Missing or expired JWT / invalid API key |
| `403` | Forbidden | Valid auth but insufficient role for the operation |
| `404` | Not Found | Subscription or payment method not found |
| `409` | Conflict | Duplicate subscription for the same plan |
| `422` | Unprocessable Entity | Business rule violation (e.g., plan not available in region) |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Internal Server Error | Unexpected failure |

### Domain Error Codes

| Code | Description |
| ---- | ----------- |
| `SUBSCRIPTION_NOT_FOUND` | No subscription exists with the given ID |
| `SUBSCRIPTION_ALREADY_ACTIVE` | User already has an active subscription for this plan |
| `SUBSCRIPTION_CANCELED` | Cannot modify a canceled subscription |
| `PAYMENT_DECLINED` | Payment provider declined the transaction |
| `PAYMENT_METHOD_INVALID` | Payment method is expired or invalid |
| `PLAN_NOT_AVAILABLE_IN_REGION` | Requested pricing plan is not offered in the user's region |
| `ENTITLEMENT_ALREADY_GRANTED` | User already owns this entitlement |
| `COUPON_EXPIRED` | Promo code has passed its expiry date |
| `COUPON_USAGE_EXCEEDED` | Promo code has reached its maximum redemption count |
| `INVOICE_ALREADY_PAID` | Invoice has already been settled |
| `INSUFFICIENT_BALANCE` | Account balance is insufficient for the charge |
| `RECEIPT_VALIDATION_FAILED` | Apple/Google IAP receipt could not be verified |
| `WEBHOOK_SIGNATURE_INVALID` | Stripe webhook signature verification failed |

## Rate Limiting

Rate limiting is enforced via `@fastify/rate-limit` to protect against abuse:

| Scope | Limit | Window | Notes |
| ----- | ----- | ------ | ----- |
| **Global default** | 100 requests | 60 seconds | Per IP address |
| **Authentication endpoints** | 10 requests | 60 seconds | Login / token refresh |
| **Payment processing** | 20 requests | 60 seconds | Create subscription, charge |
| **Webhook receivers** | 500 requests | 60 seconds | Stripe / IAP webhook callbacks |
| **Health / readiness** | Unlimited | — | Excluded from rate limiting |

Rate-limited responses include standard headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 47
X-RateLimit-Reset: 1719000060
Retry-After: 12
```

When the limit is exceeded, the API returns `429 Too Many Requests` with the error body above.

## Data Models

Planned domain entities for the billing system. These will be implemented as Zod schemas in `src/domain/types.ts`:

### Subscription

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string (uuid)` | Unique subscription identifier |
| `userId` | `string (uuid)` | Owner's user ID |
| `planId` | `string` | Reference to the pricing plan |
| `status` | `'active' \| 'canceled' \| 'past_due' \| 'trialing' \| 'paused'` | Current state |
| `currentPeriodStart` | `string (ISO 8601)` | Start of the current billing cycle |
| `currentPeriodEnd` | `string (ISO 8601)` | End of the current billing cycle |
| `cancelAtPeriodEnd` | `boolean` | Whether to cancel at period end |
| `stripeSubscriptionId` | `string?` | External Stripe subscription ID |
| `createdAt` | `string (ISO 8601)` | Creation timestamp |
| `updatedAt` | `string (ISO 8601)` | Last update timestamp |

### PricingTier

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | Plan identifier (e.g., `free`, `premium`, `premium-annual`) |
| `name` | `string` | Display name |
| `description` | `string` | Plan description |
| `priceMonthly` | `number` | Monthly price in cents |
| `priceAnnual` | `number?` | Annual price in cents (if offered) |
| `currency` | `string` | ISO 4217 currency code |
| `features` | `string[]` | List of included features |
| `maxGames` | `number?` | Game limit (`null` = unlimited) |
| `adFree` | `boolean` | Whether ads are removed |
| `active` | `boolean` | Whether the plan is currently offered |

### PaymentMethod

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string (uuid)` | Payment method identifier |
| `userId` | `string (uuid)` | Owner's user ID |
| `type` | `'card' \| 'paypal' \| 'apple_pay' \| 'google_pay'` | Payment type |
| `last4` | `string` | Last 4 digits (cards) or masked identifier |
| `expiryMonth` | `number?` | Card expiration month |
| `expiryYear` | `number?` | Card expiration year |
| `isDefault` | `boolean` | Whether this is the default payment method |
| `stripePaymentMethodId` | `string?` | External Stripe ID |

### Entitlement

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string (uuid)` | Entitlement identifier |
| `userId` | `string (uuid)` | Owner's user ID |
| `type` | `'subscription' \| 'one_time' \| 'iap'` | How it was granted |
| `productId` | `string` | Product or feature identifier |
| `grantedAt` | `string (ISO 8601)` | When access was granted |
| `expiresAt` | `string (ISO 8601)?` | When access expires (`null` = permanent) |
| `source` | `'stripe' \| 'apple' \| 'google' \| 'promo'` | Purchase source |

### Coupon

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string (uuid)` | Coupon identifier |
| `code` | `string` | Promo code string |
| `discountType` | `'percent' \| 'fixed'` | Discount type |
| `discountValue` | `number` | Percentage (0–100) or fixed amount in cents |
| `maxRedemptions` | `number?` | Maximum uses (`null` = unlimited) |
| `currentRedemptions` | `number` | Times redeemed so far |
| `expiresAt` | `string (ISO 8601)?` | Expiry date |
| `active` | `boolean` | Whether the coupon is currently valid |

### Invoice

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string (uuid)` | Invoice identifier |
| `userId` | `string (uuid)` | Owner's user ID |
| `subscriptionId` | `string (uuid)?` | Related subscription |
| `amountDue` | `number` | Amount due in cents |
| `amountPaid` | `number` | Amount paid in cents |
| `currency` | `string` | ISO 4217 currency code |
| `status` | `'draft' \| 'open' \| 'paid' \| 'void' \| 'uncollectible'` | Invoice state |
| `issuedAt` | `string (ISO 8601)` | Issue date |
| `paidAt` | `string (ISO 8601)?` | Payment date |
| `pdfUrl` | `string?` | URL to downloadable PDF |

## Deployment

### Docker (Recommended)

```bash
# Build the production image
docker build -t billing-api .

# Run with environment variables
docker run -d \
  --name billing-api \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=postgresql://user:pass@db:5432/billing \
  -e JWT_SECRET=your-jwt-secret \
  -e STRIPE_SECRET_KEY=sk_live_... \
  -e STRIPE_WEBHOOK_SECRET=whsec_... \
  billing-api
```

### Health Checks

Configure your orchestrator (Docker Compose, Kubernetes, ECS) to use the built-in probes:

| Probe | Endpoint | Interval | Timeout | Failure Threshold |
| ----- | -------- | -------- | ------- | ----------------- |
| Liveness | `GET /health` | 30s | 5s | 3 |
| Readiness | `GET /ready` | 10s | 5s | 3 |

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Provide all **required** environment variables (see [Environment Variables](#environment-variables))
- [ ] Configure database connection pooling (recommended: 10–20 connections)
- [ ] Enable TLS termination at the load balancer / reverse proxy
- [ ] Set up database migrations before first deploy
- [ ] Configure log aggregation (Pino outputs structured JSON)
- [ ] Set up monitoring alerts on `/health` and `/ready`
- [ ] Enable CORS for specific origins (do not use `*` in production)
- [ ] Configure Stripe webhook endpoint URL in the Stripe dashboard

## Supported Clients

This API is consumed by the following applications:

| Client | Type | Description |
| ------ | ---- | ----------- |
| **[💳 Game Billing](https://github.com/scottdreinhart/game-billing)** | Admin App | Payment dashboard, subscription management, revenue reports |
| **All portfolio games** | Game Clients | Subscription status checks, entitlement verification, IAP receipt validation |
| **[🎨 Themes API](https://github.com/scottdreinhart/themes-api)** | API (internal) | Verifying purchase entitlements before granting theme downloads |
| **[📺 Ads API](https://github.com/scottdreinhart/ads-api)** | API (internal) | Checking subscription tier to determine ad-free status |
| **[🏆 Rankings API](https://github.com/scottdreinhart/rankings-api)** | API (internal) | Checking entitlements for premium leaderboard features |

## Versioning

The API uses **URL-prefix versioning**:

```
https://api.example.com/v1/subscriptions
https://api.example.com/v1/pricing-tiers
```

- All current endpoints are under `/v1/`
- Breaking changes will be introduced under `/v2/` with a deprecation notice on `/v1/`
- Non-breaking additions (new fields, new endpoints) are added to the current version
- Deprecated versions will be supported for a minimum of **6 months** after the successor is released
- The OpenAPI spec at `/docs/json` includes the version in its `info.version` field

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
