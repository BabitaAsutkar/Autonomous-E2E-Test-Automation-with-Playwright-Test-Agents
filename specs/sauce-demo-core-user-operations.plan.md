# Sauce Demo Core User Operations Test Plan

## Application Overview

Sauce Demo (Swag Labs) is an e-commerce storefront at https://www.saucedemo.com. Exploration confirmed a login form, a six-product catalog with sorting and product details, a shopping cart with add/remove behavior, a multi-step checkout flow with required-field validation and order confirmation, and a navigation menu with logout. Each scenario starts from a fresh browser context. Use standard_user with password secret_sauce.

## Test Scenarios

### 1. Core customer operations

**Seed:** `tests/seed.spec.js`

#### 1.1. Successful customer login

**File:** `tests/core-user-operations/login.spec.js`

**Steps:**
  1. Start from a fresh browser context and navigate to https://www.saucedemo.com.
    - expect: The Swag Labs login form is visible with Username, Password, and Login controls.
  2. Enter standard_user in Username and secret_sauce in Password, then click Login.
    - expect: The user is redirected to /inventory.html.
    - expect: The Products catalog is visible.
    - expect: The cart is empty.

#### 1.2. Browse and sort the product catalog

**File:** `tests/core-user-operations/catalog.spec.js`

**Steps:**
  1. Start fresh, navigate to https://www.saucedemo.com, and log in with standard_user and secret_sauce.
    - expect: The Products page displays six products.
  2. Select Price (low to high) from the Sort products dropdown.
    - expect: Sauce Labs Onesie priced at $7.99 is first.
    - expect: Sauce Labs Fleece Jacket priced at $49.99 is last.
  3. Open Sauce Labs Backpack product details.
    - expect: The detail view shows the product name, description, $29.99 price, and Add to cart control.
  4. Return to the Products catalog.
    - expect: The Products page is displayed again.

#### 1.3. Review and modify the shopping cart

**File:** `tests/core-user-operations/cart.spec.js`

**Steps:**
  1. Start fresh, log in with standard_user and secret_sauce, and confirm the catalog is displayed.
    - expect: The cart is empty.
  2. Add Sauce Labs Onesie and Sauce Labs Bike Light.
    - expect: Both products show Remove controls.
    - expect: The cart indicator shows 2 items.
  3. Open the shopping cart.
    - expect: The cart lists exactly Sauce Labs Onesie and Sauce Labs Bike Light, each with quantity 1 and prices $7.99 and $9.99.
  4. Remove Sauce Labs Onesie.
    - expect: The Onesie is removed.
    - expect: The Bike Light remains with quantity 1.
    - expect: The cart indicator shows 1 item.
  5. Click Continue Shopping.
    - expect: The Products page is displayed and the remaining cart state is preserved.

#### 1.4. Complete checkout and place an order

**File:** `tests/core-user-operations/checkout.spec.js`

**Steps:**
  1. Start fresh, log in, add Sauce Labs Bike Light, open the cart, and click Checkout.
    - expect: The Checkout: Your Information form displays First Name, Last Name, and Zip/Postal Code fields.
  2. Click Continue without entering any information.
    - expect: The page remains on checkout information.
    - expect: An error alert says First Name is required.
  3. Enter Test, Customer, and 12345 in the checkout fields, then click Continue.
    - expect: The Checkout: Overview page is displayed.
    - expect: The selected product and payment and shipping information are visible.
    - expect: The item total is $9.99, tax is $0.80, and total is $10.79.
  4. Click Finish.
    - expect: The Checkout: Complete page displays Thank you for your order!
    - expect: The cart is empty.

#### 1.5. Log out of the customer session

**File:** `tests/core-user-operations/logout.spec.js`

**Steps:**
  1. Start fresh, navigate to the site, and log in with standard_user and secret_sauce.
    - expect: The Products catalog is displayed.
  2. Open the navigation menu.
    - expect: The menu contains a Logout control.
  3. Click Logout.
    - expect: The user returns to https://www.saucedemo.com/.
    - expect: The login form is visible.
    - expect: Authenticated catalog controls are no longer visible.
