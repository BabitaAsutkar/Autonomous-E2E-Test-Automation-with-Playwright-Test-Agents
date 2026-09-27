# 🤖 Autonomous E2E Test Automation with Playwright Test Agents

[![Playwright](https://img.shields.io/badge/Playwright-v1.40+-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Cross Browser](https://img.shields.io/badge/Browsers-Chromium%20|%20Firefox%20|%20WebKit-blueviolet?style=for-the-badge)](https://playwright.dev/docs/browsers)

An experimental, cutting-edge End-to-End (E2E) test automation project demonstrating the **Playwright Test Agents** workflow (Planner, Generator, and Healer) to autonomously plan, generate, self-heal, and validate regression suites for the **[SauceDemo (Swag Labs)](https://www.saucedemo.com/)** e-commerce application.

---

## 📌 Concept & Architecture

Modern test automation is evolving from purely manual script writing to **Agentic Test Automation**. This project utilizes the **Playwright Test Agent architecture** to bridge the gap between natural-language test planning and executable Playwright code.

```text
 ┌─────────────────────────────────────────────────────────────┐
 │                   1. Playwright Planner                     │
 │  • Explores target web application (SauceDemo)              │
 │  • Identifies user journeys, DOM elements, and interactions │
 │  • Outputs structured markdown test plan (.plan.md)         │
 └──────────────────────────────┬──────────────────────────────┘
                                │
                                ▼
 ┌─────────────────────────────────────────────────────────────┐
 │                  2. Playwright Generator                    │
 │  • Consumes `sauce-demo-core-user-operations.plan.md`       │
 │  • Generates executable JavaScript Playwright test specs    │
 │  • Establishes baseline locators and web-first assertions   │
 └──────────────────────────────┬──────────────────────────────┘
                                │
                                ▼
 ┌─────────────────────────────────────────────────────────────┐
 │                   3. Playwright Healer                      │
 │  • Executes tests and intercepts runtime/locator failures   │
 │  • Auto-detects strict mode violations & DOM changes        │
 │  • Iteratively heals & updates test specs until green       │
 └──────────────────────────────┬──────────────────────────────┘
                                │
                                ▼
 ┌─────────────────────────────────────────────────────────────┐
 │                  4. Execution & Reporting                   │
 │  • Executes cross-browser tests (Chromium, Firefox, WebKit) │
 │  • Produces interactive HTML reports and execution traces   │
 └─────────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```text
playwrightAgent/
├── .github/
│   └── workflows/                # CI/CD workflow configuration
├── specs/
│   ├── README.md                 # Test plan directory overview
│   └── sauce-demo-core-user-operations.plan.md  # Agent-generated structured test plan
├── tests/
│   ├── seed.spec.js              # Agent exploration seed file
│   └── core-user-operations/     # Agent-generated test suites
│       ├── login.spec.js         # User authentication & landing validation
│       ├── catalog.spec.js       # Inventory browsing, sorting & item details
│       ├── cart.spec.js          # Cart modifications, badge count & removal
│       ├── checkout.spec.js      # Multi-step checkout & required field validation
│       └── logout.spec.js        # Sidebar drawer navigation & session termination
├── Playwright_agents_guide.md    # Reference guide for Playwright Test Agents
├── package.json                  # Project dependencies & execution scripts
├── playwright.config.js          # Playwright test configuration & browser matrix
└── README.md                     # Project documentation
```

---

## 🧪 Automated Test Coverage

The test suite covers the primary user journeys defined in [`specs/sauce-demo-core-user-operations.plan.md`](specs/sauce-demo-core-user-operations.plan.md):

| Test Suite | File | Key Validations & Assertions |
| :--- | :--- | :--- |
| **Authentication** | [`login.spec.js`](tests/core-user-operations/login.spec.js) | Login form visibility, URL redirect to `/inventory.html`, product catalog header visibility, and cart link state. |
| **Product Catalog** | [`catalog.spec.js`](tests/core-user-operations/catalog.spec.js) | 6-item catalog verification, low-to-high price sorting, item details navigation, and return to catalog. |
| **Shopping Cart** | [`cart.spec.js`](tests/core-user-operations/cart.spec.js) | Adding multiple products, cart badge count updates (`2 items`), item removal, and "Continue Shopping" persistence. |
| **Checkout Workflow** | [`checkout.spec.js`](tests/core-user-operations/checkout.spec.js) | Form validation (`First Name is required`), order overview pricing/tax calculation, and order confirmation. |
| **Session Sign-out** | [`logout.spec.js`](tests/core-user-operations/logout.spec.js) | Sidebar menu interaction, logout execution, redirect to login page, and cleanup of authenticated controls. |

---

## ⚙️ Prerequisites & Setup

### 1. Prerequisites
- **[Node.js](https://nodejs.org/)** (v18.x or higher)
- **npm** (included with Node.js)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd playwrightAgent
npm install
```

### 3. Install Playwright Browsers
Download the required browser binaries (Chromium, Firefox, WebKit):
```bash
npx playwright install --with-deps
```

---

## 🏃 Running the Tests

Use the standard npm scripts configured in `package.json`:

```bash
# Run all tests headlessly across all configured browsers
npm test

# Run tests with browser UI visible
npm run test:headed

# Open the interactive Playwright UI Mode (recommended for debugging)
npm run test:ui

# Run tests on Chromium only
npm run test:chromium

# Run a specific test file
npx playwright test tests/core-user-operations/checkout.spec.js

# Debug tests step-by-step
npm run test:debug
```

---

## 📊 Test Reports

After running the tests, view the detailed HTML report containing execution timings, step-by-step action logs, and screenshot traces:

```bash
npm run report
```

---

## 🔬 QA Engineering Analysis: Agentic Workflow vs. Traditional Automation

As part of evaluating the **Playwright Test Agents** paradigm, here is a Senior QA assessment of the benefits and areas for human refinement:

### ✅ Key Advantages Observed
1. **Rapid Test Scaffolding:** The Planner agent autonomously explores DOM trees and drafts accurate step-by-step test plans in minutes.
2. **Accessible Locators by Default:** The Generator prefers user-facing roles (`getByRole`) and data-test attributes over brittle CSS/XPath selectors.
3. **Zero Hardcoded Sleeps:** Generated tests rely entirely on Playwright's built-in actionability checks and web-first assertions (`toBeVisible()`, `toHaveURL()`).

### 🛠️ The 3-Agent Lifecycle Breakdown

| Agent | Responsibility | Artifact / Role in this Project |
| :--- | :--- | :--- |
| **Planner** (`playwright-test-planner`) | Explores application & maps journeys | Generated [`specs/sauce-demo-core-user-operations.plan.md`](specs/sauce-demo-core-user-operations.plan.md) |
| **Generator** (`playwright-test-generator`) | Converts plan into initial test code | Scaffolded test specs in [`tests/core-user-operations/`](tests/core-user-operations/) |
| **Healer** (`playwright-test-healer`) | Executes, diagnoses failures & self-heals | Repaired strict-mode locator ambiguities & cart badge sync issues to reach 100% pass rate |

### 🩹 Self-Healing in Action: Why the Healer Matters
In automated test generation, the Generator agent occasionally produces fragile locators or triggers strict mode violations (e.g., when multiple elements share an aria-label). 

The **Healer Agent** completes the loop by:
1. Running the test suite headlessly to intercept failure logs.
2. Diagnosing runtime errors (e.g. Playwright strict mode collisions).
3. Automatically updating selectors to stable, unique test IDs (`data-test`).
4. Re-running the suite until all tests pass cleanly.

---

## 👤 Author
- **Babita Asutkar** - Automation Test Engineer
