// tests/customerLikeVenue.spec.js
//2 tests for liking/unliking a venue

import { test, expect } from "./authFixtures";
;

test("Customer can like a venue", async ({ customerUser }) => {
  const page = customerUser;

  // Navigate to the venues page
  await page.goto("/venues");

  // Wait for the main heading to ensure page is ready
  await page.getByRole("heading", {
    name: "Explore Our Premium Venues",
  }).waitFor();

  // Find the first venue card by image alt text (assumes venue name is unique)
  const venueImage = await page.getByRole("img", { name: /Test Venue55/i });
  const cardContainer = venueImage.locator(".."); // div wrapping image + button

  // Locate the heart button inside the image container
  const heartButton = cardContainer.locator("button").first();
  const heartIcon = heartButton.locator("svg");

  // Ensure it's not already liked
  await expect(heartIcon).toHaveClass(/text-gray-400/);

  // Click to like
  await heartButton.click();
  await page.waitForTimeout(300);

  // Expect filled red heart
  await expect(heartIcon).toHaveClass(/fill-rose-500/);
});



test("Customer can unlike a venue", async ({ customerUser }) => {
  const page = customerUser;

  await page.goto("/venues");

  await page.getByRole("heading", {
    name: "Explore Our Premium Venues",
  }).waitFor();

  const venueImage = await page.getByRole("img", { name: /Test Venue55/i });
  const cardContainer = venueImage.locator("..");
  const heartButton = cardContainer.locator("button").first();
  const heartIcon = heartButton.locator("svg");

  // Ensure it's liked first
  const iconClass = await heartIcon.getAttribute("class");
  if (!iconClass.includes("fill-rose-500")) {
    await heartButton.click(); // Like it first
    await page.waitForTimeout(300);
  }

  // Click to unlike
  await heartButton.click();
  await page.waitForTimeout(300);

  await expect(heartIcon).toHaveClass(/text-gray-400/);
});
