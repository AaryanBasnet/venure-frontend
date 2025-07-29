import { test, expect } from "./authFixtures.js";

// tests/admin.spec.js
// 2 tests for admin functionality 

test.describe("Admin Venue Approval Flow", () => {
  test.beforeEach(async ({ adminUser }) => {
    await adminUser.goto("/admin/venue");
    await expect(
      adminUser.getByRole("heading", { name: "Venue Applications" })
    ).toBeVisible();
  });

  test("Admin can approve a pending venue", async ({ adminUser }) => {
    const page = adminUser;

    const pendingCard = page
      .locator('[data-testid="venue-card"]')
      .filter({
        hasText: "Pending",
      })
      .first();

    await expect(pendingCard).toBeVisible();

    await pendingCard.getByRole("button", { name: /view details/i }).click();

    const modal = page.locator('[data-testid="venue-modal"]');
    await expect(modal).toBeVisible();

    await modal.getByRole("button", { name: /approve/i }).click();

    await expect(page.locator(".Toastify__toast--success")).toHaveText(
      /approved successfully/i,
      {
        timeout: 5000,
      }
    );

    await expect(modal).toHaveCount(0);
  });

  test("Admin can reject a pending venue", async ({ adminUser }) => {
    const page = adminUser;

    const pendingCards = page
      .locator('[data-testid="venue-card"]')
      .filter({ hasText: "Pending" });
    const count = await pendingCards.count();
    const pendingCard = pendingCards.nth(count > 1 ? 1 : 0);
    // fallback if nth(1) doesn't exist, fallback to first() in real test

    await expect(pendingCard).toBeVisible();

    await pendingCard.getByRole("button", { name: /view details/i }).click();

    const modal = page.locator('[data-testid="venue-modal"]');
    await expect(modal).toBeVisible();

    await modal.getByRole("button", { name: /reject/i }).click();

    await expect(page.locator(".Toastify__toast--success")).toHaveText(
      /rejected successfully/i,
      {
        timeout: 5000,
      }
    );

    await expect(modal).toHaveCount(0);
  });
});
