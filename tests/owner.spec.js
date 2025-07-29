import { test, expect } from "./authFixtures.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Venue Owner Tests
//All  the 3 test runs successfully

test.describe("Venue Owner Tests", () => {
  test("Venue owner can access dashboard", async ({ ownerUser }) => {
    await expect(ownerUser.locator('h3:has-text("Venue Management")')).toBeVisible();
  });

  test("Venue owner can create a venue with images via modal form", async ({ ownerUser }) => {
    await ownerUser.goto("/owner/venues");

    // Open modal to add venue
    await ownerUser.click('button:has-text("Add Venue")');

    const modal = ownerUser.locator('h2:has-text("New Venue")').locator("..");
    await expect(modal).toBeVisible();

    // Fill form fields (using type to trigger Formik)
    await ownerUser.type('input[name="venueName"]', "Test Venue5");
    await ownerUser.type('input[name="capacity"]', "100");
    await ownerUser.type('input[name="pricePerHour"]', "2000");
    await ownerUser.type('input[name="city"]', "Kathmandu");
    await ownerUser.type('input[name="state"]', "Bagmati");
    await ownerUser.type('input[name="country"]', "Nepal");
    await ownerUser.type('input[name="address"]', "Some Street, KTM");
    await ownerUser.type('textarea[name="description"]', "A beautiful venue for events.");

    // Check amenities
    await ownerUser.check('input[type="checkbox"][value="WiFi"]');
    await ownerUser.check('input[type="checkbox"][value="Parking"]');

    // Upload image and wait for preview
    const fileInput = ownerUser.locator('input[type="file"]');
    await fileInput.setInputFiles(path.resolve(__dirname, "fixtures", "venueInterior.jpg"));
    await expect(ownerUser.locator('img[alt="Preview 1"]')).toBeVisible();

    // Submit the form
    const createButton = ownerUser.locator('button:has-text("Create")');
    await expect(createButton).toBeEnabled();
    await createButton.click();

    // Wait for modal to close
    await expect(modal).toBeHidden();

    // Check that new venue appears in the list
    await expect(ownerUser.getByRole("heading", { level: 3, name: "Test Venue5" })).toBeVisible();
  });

  test("Venue owner can update venue (with network debugging)", async ({ ownerUser }) => {
    // Track API requests for debugging (optional)
    const apiRequests = [];
    ownerUser.on("request", (request) => {
      if (request.url().includes("/api/") || request.url().includes("/venues")) {
        apiRequests.push({
          method: request.method(),
          url: request.url(),
          headers: request.headers(),
        });
      }
    });

    await ownerUser.goto("/owner/venues");
    await expect(ownerUser.getByRole("heading", { name: "My Venues" })).toBeVisible();

    const editButton = ownerUser.getByRole("button", { name: /Edit venue/i }).first();
    await editButton.click();

    const modal = ownerUser.getByTestId("modal-backdrop");
    await expect(modal).toBeVisible();

    // Give time for modal animation etc
    await ownerUser.waitForTimeout(1500);

    // Update venue fields
    await ownerUser.fill('input[name="venueName"]', "Updated Venue Name");
    await ownerUser.fill('input[name="capacity"]', "150");

    const updateButton = ownerUser.locator('button:has-text("Update")');
    await expect(updateButton).toBeEnabled();

    // Clear previous requests
    apiRequests.length = 0;

    const [response] = await Promise.all([
      ownerUser.waitForResponse(
        (resp) =>
          (resp.url().includes("/venues") || resp.url().includes("/api/")) &&
          resp.request().method() === "PUT"
      ),
      updateButton.click(),
    ]);

    // Log request details (optional)
    console.log("Update request details:");
    console.log("- Method:", response.request().method());
    console.log("- URL:", response.url());
    console.log("- Status:", response.status());

    // Validate venue ID in URL
    const urlParts = response.url().split("/");
    const venueId = urlParts[urlParts.length - 1];
    console.log("- Venue ID in URL:", venueId);
    console.log("- Is valid MongoDB ObjectId:", /^[0-9a-fA-F]{24}$/.test(venueId));

    if (response.status() === 403) {
      const responseBody = await response.text();
      console.log("403 Error response:", responseBody);
      const authHeader = response.request().headers()["authorization"];
      console.log("Auth header present:", !!authHeader);
      throw new Error("Update failed with 403. Check venue ownership and auth.");
    }

    if (response.status() >= 400) {
      const errorBody = await response.text();
      throw new Error(`Update failed with ${response.status()}: ${errorBody}`);
    }

    // Expect modal closed and updated venue name visible
    await expect(modal).toBeHidden({ timeout: 10000 });
    await expect(ownerUser.getByText("Updated Venue Name")).toBeVisible();
  });

  test("Venue owner can delete a venue", async ({ ownerUser }) => {
    await ownerUser.goto("/owner/venues");
    await expect(
      ownerUser.getByRole("heading", { name: "My Venues" })
    ).toBeVisible();

    // Locate the entire venue card by looking for a container with the venue name heading
    const venueCard = ownerUser
      .locator("div", {
        has: ownerUser.locator("h3", { hasText: "Updated Venue Name" }),
      })
      .first();

    // Now find the delete button inside that venue card by aria-label
    const deleteButton = venueCard.locator(
      'button[aria-label="Delete venue Updated Venue Name"]'
    );
    await expect(deleteButton).toBeVisible();

    // Click the delete button to show confirmation dialog
    await deleteButton.click();

    // Confirm deletion modal appears - locate the "Yes, Delete" button
    const confirmDeleteButton = ownerUser.locator(
      'button:has-text("Yes, Delete")'
    );
    await expect(confirmDeleteButton).toBeVisible();

    // Click the confirm deletion button
    await confirmDeleteButton.click();

    // Wait for venue to be removed from list (the venue card should disappear)
    await expect(
      ownerUser.locator('h3:has-text("Updated Venue Name")')
    ).toHaveCount(0);
  });
});
