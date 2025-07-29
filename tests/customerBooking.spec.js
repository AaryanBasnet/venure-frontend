import { test, expect } from "./authFixtures.js";
//1 test for customer booking a venue and paying via Stripe

// Helper to fill Stripe iframe inputs
async function fillCardElement(page) {
  // Try different iframe selectors
  const possibleSelectors = [
    'iframe[title="Secure card payment input frame"]',
    'iframe[title="Secure payment input frame"]',
    'iframe[src*="stripe"]',
    'iframe[name*="stripe"]'
  ];
  
  let workingIframe = null;
  
  for (const selector of possibleSelectors) {
    try {
      const iframe = page.frameLocator(selector).first();
      const cardInput = iframe.locator('input[name="cardnumber"], input[placeholder*="card"], input[data-elements-stable-field-name="cardNumber"]');
      
      if (await cardInput.count() > 0) {
        console.log(`Found card input using selector: ${selector}`);
        workingIframe = iframe;
        break;
      }
    } catch (error) {
      console.log(`Selector ${selector} failed:`, error.message);
    }
  }
  
  if (!workingIframe) {
    throw new Error("Could not find Stripe card input iframe");
  }
  
  // Fill card number
  const cardSelectors = [
    'input[name="cardnumber"]',
    'input[placeholder*="card"]',
    'input[data-elements-stable-field-name="cardNumber"]',
    'input[autocomplete="cc-number"]'
  ];
  
  let cardFilled = false;
  for (const selector of cardSelectors) {
    try {
      const cardInput = workingIframe.locator(selector);
      if (await cardInput.count() > 0) {
        await cardInput.fill("4242424242424242");
        console.log(`Card number filled using: ${selector}`);
        cardFilled = true;
        break;
      }
    } catch (error) {
      console.log(`Card selector ${selector} failed:`, error.message);
    }
  }
  
  if (!cardFilled) {
    throw new Error("Could not fill card number");
  }
  
  // Wait for auto-progression
  await page.waitForTimeout(500);
  
  // Fill expiry date
  const expirySelectors = [
    'input[name="exp-date"]',
    'input[placeholder*="MM"]',
    'input[data-elements-stable-field-name="expiryDate"]',
    'input[autocomplete="cc-exp"]'
  ];
  
  for (const selector of expirySelectors) {
    try {
      const expiryInput = workingIframe.locator(selector);
      if (await expiryInput.count() > 0) {
        await expiryInput.fill("1234");
        console.log(`Expiry filled using: ${selector}`);
        break;
      }
    } catch (error) {
      console.log(`Expiry selector ${selector} failed:`, error.message);
    }
  }
  
  // Fill CVC
  const cvcSelectors = [
    'input[name="cvc"]',
    'input[placeholder*="CVC"]',
    'input[data-elements-stable-field-name="cvc"]',
    'input[autocomplete="cc-csc"]'
  ];
  
  for (const selector of cvcSelectors) {
    try {
      const cvcInput = workingIframe.locator(selector);
      if (await cvcInput.count() > 0) {
        await cvcInput.fill("123");
        console.log(`CVC filled using: ${selector}`);
        break;
      }
    } catch (error) {
      console.log(`CVC selector ${selector} failed:`, error.message);
    }
  }
  
  // Fill postal code
  const postalSelectors = [
    'input[name="postal"]',
    'input[placeholder*="ZIP"]',
    'input[data-elements-stable-field-name="postalCode"]',
    'input[autocomplete="postal-code"]'
  ];
  
  for (const selector of postalSelectors) {
    try {
      const postalInput = workingIframe.locator(selector);
      if (await postalInput.count() > 0) {
        await postalInput.fill("10001");
        console.log(`Postal filled using: ${selector}`);
        break;
      }
    } catch (error) {
      console.log(`Postal selector ${selector} failed:`, error.message);
    }
  }
}

test("Customer can book a venue and pay via Stripe", async ({ customerUser }) => {
  await customerUser.goto("/checkout/68875f8906b00d8f50792065");
  await customerUser.getByText("29", { exact: true }).click();
  await customerUser.getByText("2:00 PM - 6:00 PM", { exact: true }).click();
  await customerUser.getByRole("button", { name: "Next", exact: true }).click();
  await customerUser.getByLabel("Number of Guests").fill("100");
  await customerUser.getByLabel("Event Type").selectOption("Wedding");
  await customerUser.getByLabel("Special Requirements").fill("Need vegetarian catering");
  await customerUser.getByLabel("Contact Name").fill("Aryan");
  await customerUser.getByLabel("Phone Number").fill("9812345678");
  await customerUser.getByRole("button", { name: "Next", exact: true }).click();
  await customerUser.getByRole("checkbox", {
    name: /catering cost calculated/i,
  }).check();
  await customerUser.getByRole("button", { name: "Next", exact: true }).click();
  
  // Wait for Stripe Elements to load
  await customerUser.waitForTimeout(3000);
  
  // Fill Stripe card details
  await fillCardElement(customerUser);
  
  // Click Complete Booking
  await customerUser.getByRole("button", { name: "Complete Booking", exact: true }).click();
  
  // Wait for redirect to my-bookings page (not booking/success)
  await customerUser.waitForURL(/\/my-bookings/);
  
  // Verify booking success by checking for the booking details on my-bookings page
  await expect(customerUser.getByText("My Premium Bookings")).toBeVisible();

});