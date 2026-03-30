import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ShippingDetails, Users } from '../utils/testData';

test.describe('Sauce Demo - Checkout Flow', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.usernameInput.fill(Users.standard.username);
    await loginPage.passwordInput.fill(Users.standard.password);
    await loginPage.loginButton.click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('complete E2E checkout with single item', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Add item to cart
    await productsPage.addItemtoCartByName('Sauce Labs Backpack');
    await expect(productsPage.cartBadge).toHaveText('1');

    // Go to cart and verify item is there
    await checkoutPage.proceedToCart();
    await expect(checkoutPage.cartItems).toHaveCount(1);

    // Proceed through checkout
    await checkoutPage.proceedToCheckout();
    await checkoutPage.fillShippingDetails(ShippingDetails.standard.firstName, ShippingDetails.standard.lastName, ShippingDetails.standard.postcode);

    // Verify we land on the order summary page
    await expect(page).toHaveURL(/checkout-step-two/);

    // Verify total is displayed
    await expect(checkoutPage.summaryTotal).toBeVisible();

    // Complete the order
    await checkoutPage.completeOrder();

    // Verify confirmation
    await expect(checkoutPage.confirmationHeader).toHaveText('Checkout: Complete!');
    await expect(page).toHaveURL(/checkout-complete/);
  });

  test('complete E2E checkout with multiple items', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    await productsPage.addItemtoCartByName('Sauce Labs Backpack');
    await productsPage.addItemtoCartByName('Sauce Labs Fleece Jacket');
    await expect(productsPage.cartBadge).toHaveText('2');

    await checkoutPage.proceedToCart();
    await expect(checkoutPage.cartItems).toHaveCount(2);

    await checkoutPage.proceedToCheckout();
    await checkoutPage.fillShippingDetails(ShippingDetails.standard.firstName, ShippingDetails.standard.lastName, ShippingDetails.standard.postcode);
    await checkoutPage.completeOrder();

    await expect(checkoutPage.confirmationHeader).toHaveText('Checkout: Complete!');
  });

  test('checkout requires shipping details — empty form shows error', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    await productsPage.addItemtoCartByName('Sauce Labs Backpack');
    await checkoutPage.proceedToCart();
    await checkoutPage.proceedToCheckout();

    // Try to continue without filling details
    await checkoutPage.continueButton.click();

    await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
  });

  test('use test.step to document the checkout journey', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step('Add product to cart', async () => {
      await productsPage.addItemtoCartByName('Sauce Labs Bike Light');
      await expect(productsPage.cartBadge).toHaveText('1');
    });

    await test.step('Navigate to cart and verify contents', async () => {
      await checkoutPage.proceedToCart();
      await expect(checkoutPage.cartItems).toHaveCount(1);
    });

    await test.step('Fill shipping details', async () => {
      await checkoutPage.proceedToCheckout();
      await checkoutPage.fillShippingDetails(ShippingDetails.standard.firstName, ShippingDetails.standard.lastName, ShippingDetails.standard.postcode);
      await expect(page).toHaveURL(/checkout-step-two/);
    });

    await test.step('Complete order and confirm', async () => {
      await checkoutPage.completeOrder();
      await expect(checkoutPage.confirmationHeader).toHaveText('Checkout: Complete!');
    });
  });

});