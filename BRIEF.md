# Brief given to the assistant

## Task
Implement `cartTotal(items, options)` in `src/cart.js` as a named ES-module export
(`export function cartTotal`). The project uses `"type": "module"`.

## Files you may touch
- `src/cart.js` ONLY.
- Do NOT edit or delete anything in `test/`, and do not touch `package.json`,
  `README.md`, `CLAUDE.md` or `.github/`. If a test looks wrong, stop and tell me.

## Contract
- `items`: array of `{ name, price, qty }`
- `options`: `{ vatRate, freeShipFrom, shipFee }`, where `vatRate` is a fraction
  (0.08 means 8%)
- `subtotal` = sum of `price × qty`
- `VAT` = `subtotal × vatRate`
- `shipping` = `0` when `subtotal >= freeShipFrom` (exactly at the threshold is free),
  otherwise `shipFee`
- Return `subtotal + VAT + shipping` as a **number** (never a string), rounded
  **once, at the end** to a whole đồng with `Math.round`. Do not use `toFixed`.
- Worked example: items `[{price: 180000, qty: 2}, {price: 45000, qty: 1}]` with
  `{ vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }` returns `467400`
  (subtotal 405000, VAT 32400, shipping 30000).

## Error cases
- Empty cart returns `0` (no VAT, no shipping).
- Any `price` that is negative or not a finite number throws `RangeError`.
- Any `qty` that is not a positive integer (0, negative, 1.5, NaN) throws `RangeError`.
- Validate every line BEFORE computing anything.

## Constraints
- Plain JavaScript, **no dependencies** (no `import` except from `node:` if ever needed).
- No `console.log`, no extra files.
- Follow the rules in `CLAUDE.md`.
- You are done only when `npm test` and `npm run lint` both pass.