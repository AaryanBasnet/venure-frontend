// tests/registerLogin.spec.js
// 2 tests for user registration and login
import { test, expect } from "@playwright/test";

let testEmail;
const password = "Test1234";

test("User can register successfully", async ({ page }) => {
  testEmail = `testuser${Date.now()}@example.com`;

  await page.goto("/register");

  await page.fill('input[name="name"]', "Test User 101");
  await page.fill('input[name="email"]', testEmail);
  await page.fill('input[name="phone"]', "9812345678");
  await page.fill('input[name="password"]', password);

  await page.click('button:has-text("Register")');

  // Optionally wait for redirect or confirmation message
  await page.waitForURL("**/login");
  await expect(page).toHaveURL(/\/login$/);
});

test("User can log in with registered credentials", async ({ page }) => {
  // If testEmail wasn't set, throw an error

  await page.goto("/login");

  await page.fill('input[name="email"]', testEmail);
  await page.fill('input[name="password"]', password);

  await page.click('button:has-text("Sign in")');

  // Wait for redirect or dashboard page
  await page.waitForURL("**/*");
  await page.waitForTimeout(500); // adjust if needed

  const token = await page.evaluate(() => localStorage.getItem("token"));
  expect(token).not.toBeNull();
});
