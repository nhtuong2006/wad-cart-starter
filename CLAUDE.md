# Rules for AI assistants — cart-starter

## Project
`cartTotal(items, options)` in `src/cart.js`: returns the payable total of a cart in whole đồng.
Spec: see `README.md` (VAT = vatRate × subtotal; free shipping when subtotal >= freeShipFrom).

## Stack
- Node 22, ES modules (`"type": "module"`), plain JavaScript.
- Tests use the built-in `node:test` and `node:assert/strict`. No framework.
- `src/` has **zero dependencies**.

## Commands (run both before saying you are done)
- `npm test` — runs every test in `test/`
- `npm run lint` — syntax check of `src/` and `test/`

## Layout
- `src/cart.js` — the only implementation file
- `test/cart.test.js` — tests written from the spec, not from the code

## Never
- Never add a dependency (nothing in `dependencies`; no imports outside `node:`).
- Never edit or delete a test to make it pass; fix `src/` instead. If a test looks wrong, stop and ask.
- Never use `toFixed` or return a string from `cartTotal`; return a `number` via `Math.round`.
- Never round before the final step, and never add VAT or shipping to an empty cart.
- Never touch files outside the task's scope (see the brief).
- Never push with `npm test` or `npm run lint` failing.
