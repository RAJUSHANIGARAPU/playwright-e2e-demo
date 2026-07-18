import { type Page, type Locator, expect } from '@playwright/test';

/** The product inventory shown after a successful login. */
export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.sortDropdown = page.getByTestId('product-sort-container');
  }

  /** Assert the inventory finished loading (the "Products" header is shown). */
  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Products');
  }

  async addToCart(slug: string): Promise<void> {
    await this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  async removeFromCart(slug: string): Promise<void> {
    await this.page.getByTestId(`remove-${slug}`).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(value);
  }
}
