import { loggedInTest as test, expect } from '../fixtures/fixtures';
import { PRODUCTS } from '../fixtures/test-data';

test.describe('Cart', () => {
  test('reflects items added and removed in the badge count', async ({ inventory }) => {
    await inventory.addToCart(PRODUCTS.backpack.slug);
    await expect(inventory.cartBadge).toHaveText('1');

    await inventory.addToCart(PRODUCTS.bikeLight.slug);
    await expect(inventory.cartBadge).toHaveText('2');

    await inventory.removeFromCart(PRODUCTS.backpack.slug);
    await expect(inventory.cartBadge).toHaveText('1');
  });

  test('starts empty with no cart badge', async ({ inventory }) => {
    await expect(inventory.cartBadge).toBeHidden();
  });
});
