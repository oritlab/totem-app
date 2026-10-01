# PR Description Template

Use this structure for pull requests to make review efficient and discoverable.

---

## Template

Group **Included changes** by concern. Which concerns apply depends on the
stack — pick from the list below, in this rough top-to-bottom order, and
drop whatever the PR doesn't touch:

- **Backend** (NestJS/Prisma — see the backend `architecture`/`implementation`
  skills): `db migrations`, `exceptions`, `request DTOs`, `response DTOs`,
  `repository`, `service`, `controller`, `module wiring`.
- **Frontend** (React/Next.js — see the frontend `architecture` skill):
  `types`, `API`, `hooks`, `components`, `Main.jsx` wiring, `styles`.
- **Either side**: `dependencies`, `other`.

```markdown
This PR adds [feature/fix description] building on top of [prior PR/work].

## Included changes

**<concern>**

- `identifier` — brief description

**other** (if applicable)

- `file/path/change` — brief description

## Test plan

- [ ] `npx tsc --noEmit` — no TypeScript errors
- [ ] `npm run test:e2e -- <module>` (backend) or the project's frontend test
      command — automated tests pass
- [ ] Manual verification: [step-by-step reproduction of the feature/fix]
```

---

## Example (Process 4 Pricing — PR 11) — backend

```markdown
This PR adds the export_products_pricing table and decimal.js, laying
the foundation for pricing calculations in Process 4.

## Included changes

**db migrations**

- `create_export_products_pricing` — new table with DECIMAL columns
  for cost_price_brl, purchase_fx_rate, selling_price_usd, markup_pct,
  margin_pct; includes is_priced status flag

**dependencies**

- `decimal.js` — added to package.json for safe money arithmetic

**model**

- `ExportProductPricingModel` — compute methods for cost_price_usd(),
  markup_pct(), margin_pct(); all use decimal.js, unit tested

## Test plan

- [ ] `npx tsc --noEmit` — no errors
- [ ] `npm run test -- exportation/pricing` — model unit tests pass
```

---

## Example (Process 4 Pricing — PR 13) — backend

```markdown
This PR adds write endpoints for lot and product pricing, building on
PR 12's GET endpoints. Includes validation, state transitions, and e2e
tests.

## Included changes

**DTOs**

- `SetLotPricingDto` — bulk pricing input; validations for currency,
  exchange rates
- `UpdateProductPricingDto` — per-product update; validates selling
  price presence

**exceptions**

- `PricingInvalidException` — thrown when pricing violates constraints
  (negative markup, missing fx_rate)

**repository**

- `applyLotPricing(lotId, data)` — fetch lot products, apply pricing
  via model compute, batch write
- `updateProductPricing(productId, data)` — fetch product, validate
  prior weight review, compute new pricing, persist

**service**

- `priceLot(lotId, dto)` — orchestrates validation, calls repo,
  returns updated product list
- `priceProduct(productId, dto)` — same pattern for single product

**controller**

- `@Patch('exportation/lots/:lotId/pricing')` — bulk lot pricing
- `@Patch('exportation/lots/:lotId/pricing/:productId')` — single product

**module wiring**

- `PricingModule` — imports ExportationLotsModule, registers in
  ExportationModule

## Test plan

- [ ] `npx tsc --noEmit` — no errors
- [ ] `npm run test:e2e -- exportation` — pricing show + update tests pass
- [ ] Manual verification:
  - Fetch a lot's current pricing (GET /exportation/lots/1/pricing)
  - Update one product's price (PATCH /exportation/lots/1/pricing/5)
  - Verify response includes updated price + computed margins
  - Fetch the lot again, confirm persisted
```

---

## Tips

- **Be specific**: `methodName(params)` is better than just `methodName`.
- **Group by concern**: Readers expect to scan one section for all DTO changes, another for all repository changes.
- **Test plan is a checklist**: Copy and use `- [ ]` so reviewers can tick off as they verify.
- **Manual verification step**: Write it as repeatable steps (API calls, UI clicks) so reviewers can reproduce the feature.
- **Keep it scannable**: Aim for 80–100 lines; if longer, that's a sign the PR is too large.
