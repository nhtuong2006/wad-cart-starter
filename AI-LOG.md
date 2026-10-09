# AI-LOG.md

## 2026-10-09 — Set up the project and plan the work

Tool: Claude (claude.ai chat).

Asked for: A step-by-step plan for IA#1 based on the rubric and the starter repository, and an explanation of what each rubric criterion needs.

Kept: The plan: write the brief, build the harness, write tests first, then implement, then self-assess.

Changed: Nothing significant.

Rejected: The plan said to create a new empty repository and clone the starter into it; I forked the starter instead.

By hand: I forked the lecturer's repository, cloned it, ran `npm test` and saw the starter test fail because `cartTotal` did not exist yet.

## 2026-10-09 — Write the implementation brief

Tool: Claude.

Asked for: A brief naming the files the assistant may touch, the contract, the error cases and "no dependencies".

Kept: The brief structure (task, files allowed, contract, error cases, constraints), saved as `BRIEF.md` and committed in `1a8315c`.

Changed: Nothing significant

Rejected: Nothing

By hand: I read the brief against `README.md`, saved it, committed and pushed it.

## 2026-10-09 — Rules file, lint script and CI

Tool: Claude.

Asked for: A rules file with stack, commands and "never" rules, a `lint` script that needs no extra dependency, and a GitHub Actions workflow that runs on push.

Kept: `CLAUDE.md` (stack, commands, layout, "Never" list), the script `"lint": "node --check src/cart.js && node --check test/cart.test.js"`, and `.github/workflows/ci.yml`. Committed in `10bf328`.

Changed: `ci.yml` was committed without its content, so the first three GitHub Actions runs failed with "No event triggers defined in `on`". I read the annotation, filled in the file, and pushed the fix in `81cbd2f`; the next run was green.

Rejected: Nothing

By hand: I created the folders and files in VS Code, enabled Actions on my fork, and debugged the failing run. I accidentally deleted one failed run, so I have no screenshot of it, but the commits are in the history.

## 2026-10-09 — Add edge-case tests

Tool: Claude.

Asked for: Tests for the number type, empty cart, the free-shipping threshold (499999 and 500000), rounding, negative price, non-integer qty and zero qty, added below the lecturer's example test.

Kept: 8 tests appended to `test/cart.test.js` (commit `a81464e`). I left the lecturer's test unchanged.

Changed: I pasted the new tests together with their own `import` lines, which gave `SyntaxError: Identifier 'test' has already been declared`. I removed the duplicate imports before commit `6e26e7a`.

Rejected: Putting the tests in a separate file; I wanted them in the starter file.

By hand: I recomputed the expected values on paper (499999 → 569999, 500000 → 540000, 33333 → 66000) and ran `npm test` to confirm the suite was red before implementing.

## 2026-10-09 — Implement cartTotal

Tool: Claude.

Asked for: `src/cart.js` that follows `BRIEF.md` and `CLAUDE.md`.

Kept: The implementation as generated: validate every line first (price negative or not finite, qty not a positive integer → `RangeError`), return 0 for an empty cart, VAT on the subtotal, `subtotal >= freeShipFrom` for free shipping, one `Math.round` at the end. Committed in `6e26e7a`.

Changed: Nothing, I used the generated code as given

Rejected: Nothing

By hand: I read `src/cart.js` line by line and checked the error conditions, the `>=` threshold and the rounding. I ran `npm test` and `npm run lint` locally. Note: I did not run a separate session giving the brief to a fresh assistant; the brief and the code came from the same chat.

## 2026-10-09 — Mutation check and my own test

Tool: none for these steps (done myself).

Asked for: Instructions on how to check that the tests catch real bugs.

Kept: The idea of breaking the code on purpose and restoring it with `git restore`.

Changed: I ran only one experiment instead of the three suggested.

Rejected: The experiments with `>=` → `>` and removing the qty check; I did not run them.

By hand: I replaced `Math.round(...)` with `.toFixed(0)` in `src/cart.js`; `npm test` turned red because the function returned a string. I restored the file without committing the change. I then wrote my own test, `NaN qty throws RangeError`, and committed it in `4d447f5`. CI on the final commits is green: <https://github.com/nhtuong2006/wad-cart-starter/actions/runs/37959646836>.