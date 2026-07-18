import { loggedInTest as test, expect } from '../fixtures/fixtures';
import { PRODUCTS } from '../fixtures/test-data';

test.describe('Checkout', () => {
  test('completes a purchase end to end', async ({ inventory, cartPage, checkoutPage }) => {
    await inventory.addToCart(PRODUCTS.backpack.slug);
    await inventory.openCart();

    await expect(cartPage.itemNames).toHaveText([PRODUCTS.backpack.name]);
    await cartPage.checkout();

    await checkoutPage.fillInformation('Ada', 'Lovelace', '1000 AA');
    await checkoutPage.finish();

    await expect(checkoutPage.confirmation).toHaveText('Thank you for your order!');
  });
});
