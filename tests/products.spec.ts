import { test, expect } from '../fixtures/auth.fixture';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { Users } from '../utils/testData';

test.describe('Sauce Demo - Products Page', () => {

  test('products page loads with correct title', async ({ productsPage }) => {
    await expect(productsPage.pageTitle).toHaveText('Products');
  });

  test('page displays 6 products', async ({ productsPage }) => {
    await expect(productsPage.productItems).toHaveCount(6);
  });

  test('all products have a name and price', async ({ productsPage }) => {
    const names = await productsPage.getProductNames();
    const prices = await productsPage.getProductPrices();
    expect(names.length).toBe(6);
    names.forEach(name => expect(name.trim().length).toBeGreaterThan(0));
    prices.forEach(price => expect(price).toBeGreaterThan(0));
  });

  test('adding one item updates cart badge to 1', async ({ productsPage }) => {
    await productsPage.addItemtoCartByName('Sauce Labs Backpack');
    await expect(productsPage.cartBadge).toHaveText('1');
  });

  test('adding multiple items updates cart badge correctly', async ({ productsPage }) => {
    await productsPage.addItemtoCartByName('Sauce Labs Backpack');
    await productsPage.addItemtoCartByName('Sauce Labs Bike Light');
    await expect(productsPage.cartBadge).toHaveText('2');
  });

  test('sort by price low to high is correct', async ({ productsPage }) => {
    await productsPage.sortBy('lohi');
    const prices = await productsPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('sort by name Z to A is correct', async ({ productsPage }) => {
    await productsPage.sortBy('za');
    const names = await productsPage.getProductNames();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  });

});