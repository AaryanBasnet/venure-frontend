// tests/authFixtures.js
import { test as base } from "@playwright/test";
import { expect } from "@playwright/test";
export { expect };

import { getVenueOwnerAuth } from "../src/utils/getToken.js";

const ADMIN_EMAIL = "testadmin@gmail.com";
const ADMIN_PASSWORD = "Test1234";
const CUSTOMER_EMAIL = "testCustomer1@gmail.com";
const CUSTOMER_PASSWORD = "Test1234";
const LOGIN_URL = "/login";

export const test = base.extend({
  adminUser: async ({ page, baseURL }, use) => {
    await page.goto(baseURL + LOGIN_URL);
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForSelector('h1:has-text("Dashboard Overview")');
    await use(page);
  },

  ownerUser: async ({ page, baseURL, request }, use) => {
    const { token, user } = await getVenueOwnerAuth(request);

    await page.addInitScript(([token, user]) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }, [token, user]);

    await page.goto(baseURL + "/owner/venues");
    await page.waitForSelector('h3:has-text("Venue Management")');
    await use(page);
  },

  customerUser: async ({ page, baseURL }, use) => {
    await page.goto(baseURL + LOGIN_URL);
    await page.fill('input[name="email"]', CUSTOMER_EMAIL);
    await page.fill('input[name="password"]', CUSTOMER_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForSelector('h1:has-text("Venure")'); // or any unique home/user selector
    await use(page);
  },
});
