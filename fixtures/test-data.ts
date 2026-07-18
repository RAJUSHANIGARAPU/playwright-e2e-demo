/**
 * Test data for the Sauce Labs demo app (https://www.saucedemo.com).
 * These are the app's own published demo credentials — not real secrets.
 */
export const PASSWORD = 'secret_sauce';

export const USERS = {
  standard: 'standard_user',
  lockedOut: 'locked_out_user',
  problem: 'problem_user',
} as const;

/** Product slugs as they appear in saucedemo's `data-test` add/remove attributes. */
export const PRODUCTS = {
  backpack: { slug: 'sauce-labs-backpack', name: 'Sauce Labs Backpack' },
  bikeLight: { slug: 'sauce-labs-bike-light', name: 'Sauce Labs Bike Light' },
} as const;
