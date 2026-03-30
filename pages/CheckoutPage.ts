import { Page, Locator } from '@playwright/test'; 
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly cartIcon: Locator;
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmationHeader: Locator;
  readonly cartItems: Locator;
  readonly summaryTotal: Locator;

  constructor(page: Page) {
    super(page);
    this.cartIcon = page.locator('.shopping_cart_link');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.confirmationHeader = page.locator('[data-test="title"]');
    this.cartItems = page.locator('.cart_item');
    this.summaryTotal = page.locator('.summary_total_label');
  }

  async proceedToCart() {
    await this.cartIcon.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async fillShippingDetails(firstName: string, lastName: string, postcode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postcode);
    await this.continueButton.click();
  }

  async completeOrder() {
    await this.finishButton.click();
  }
}