# playwright-e2e-demo

[![CI](https://github.com/RAJUSHANIGARAPU/playwright-e2e-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/RAJUSHANIGARAPU/playwright-e2e-demo/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Playwright](https://img.shields.io/badge/tested%20with-Playwright-2EAD33?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript)

A small, production-style end-to-end test suite in **TypeScript + Playwright** — the way I'd structure a real project, not a single throwaway script. It exercises the login, cart, and checkout flows of the [Sauce Labs demo app](https://www.saucedemo.com), a stable target built for automation.

## What it demonstrates

- **Page Object Model** — UI structure lives in [`pages/`](pages); specs read as user intent, not selectors.
- **Custom fixtures** — [`fixtures/`](fixtures) inject ready-to-use page objects, plus a `loggedInTest` fixture that handles the login precondition so cart/checkout specs stay focused.
- **Data-driven tests** — the login negatives (locked-out user, wrong password, missing fields) are one parametrised loop, not four copy-pasted tests.
- **Stable locators** — everything targets the app's `data-test` attributes via `getByTestId()` (configured through `testIdAttribute`). No brittle CSS-hash selectors, no `waitForTimeout` sleeps — only Playwright's web-first, auto-waiting assertions.
- **Cross-browser** — runs on Chromium, Firefox, and WebKit.
- **Diagnostics on failure only** — trace on first retry, screenshot and video retained on failure; nothing captured on green runs.
- **CI** — GitHub Actions installs browsers, runs the suite, and uploads the HTML report as an artifact.

## Structure

```
pages/        Page objects: LoginPage, InventoryPage, CartPage, CheckoutPage
fixtures/     test-data.ts (users/products) + fixtures.ts (page-object & logged-in fixtures)
tests/        login.spec.ts, cart.spec.ts, checkout.spec.ts
playwright.config.ts   baseURL, data-test locators, retries, projects, reporters
```

## Run it

```bash
npm ci
npx playwright install       # download the browser binaries
npm test                     # run the full suite (all three browsers)

npm run test:chromium        # just Chromium (fastest)
npm run test:ui              # interactive UI mode
npm run report               # open the HTML report from the last run
npm run typecheck            # tsc --noEmit
```

The tests run against the public `https://www.saucedemo.com` — no setup, no credentials to configure (the app ships its own demo logins).

## Notes

Live third-party sites can have transient hiccups, so CI retries failed tests twice; locally it does not retry, so a red run is a real red run. The suite is intentionally small and readable — the point is the structure and the patterns, which scale to a much larger suite unchanged.

## License

MIT — see [LICENSE](LICENSE).
