import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
  
export class ProductsPage extends BasePage {
    readonly pageTitle: Locator;
    readonly productItems: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly addToCartButtons: Locator;
    readonly cartBadge: Locator;
    readonly sortDropdown: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('[data-test="title"]');
        this.productItems = page.locator('[data-test="inventory-item-name"]');
        this.productNames = page.locator('[data-test="inventory-item-name"]');
        this.productPrices = page.locator('[data-test="inventory-item-price"]');
        this.addToCartButtons = page.locator('[data-test="add-to-cart"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-link"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    }

    async addItemtoCartByName(name: string) {
        await this.page
        .locator('.inventory_item')
        .filter({ hasText: name })
        .getByRole('button', { name: 'Add to cart' })
        .click();
    }

    async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.sortDropdown.selectOption(option);
      }
    
      async getProductNames(): Promise<string[]> {
        return await this.productNames.allTextContents();
      }
    
      async getProductPrices(): Promise<number[]> {
        const rawPrices = await this.productPrices.allTextContents();
        return rawPrices.map(p => parseFloat(p.replace('$', '')));
      }
    }