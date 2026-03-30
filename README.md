# Playwright Practice Framework

A TypeScript Playwright automation framework built for upskilling,
covering UI, API, and hybrid testing patterns.

## Stack
- Playwright (TypeScript)
- Node.js
- Restful-Booker (API target)
- Sauce Demo (UI target)

## Structure
```
playwright-practice/
├── pages/          # Page Object Model classes
├── tests/
│   ├── api/        # API tests (Restful-Booker)
│   ├── hybrid/     # UI + API combined tests
│   └── *.spec.ts   # UI tests (Sauce Demo)
├── utils/          # Test data and helpers
├── fixtures/       # Coming in Week 3
└── playwright.config.ts
```

## Setup
```bash
npm install
npx playwright test
```

## Test Count
- UI tests: 15
- API tests: 8
- Hybrid tests: 1
- **Total: 24**