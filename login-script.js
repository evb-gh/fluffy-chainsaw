const { chromium } = require("playwright");
require("dotenv").config(); // Load environment variables from .env file

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false }); // Set headless: true to run in headless mode
  const context = await browser.newContext({
    storageState: ".auth/storageState.json",
  });

  // Open new page
  const page = await context.newPage();

  // Navigate to the login page
  await page.goto(process.env.URL);

  const iframeLocator = page.frameLocator("#logonbox"); // Replace with your actual iframe selector
  // const frame = await iframeLocator.waitForElement();
  // const iframePage = await iframeLocator.contentFrame();

  await iframeLocator
    .getByLabel("Username")
    .pressSequentially(process.env.USERNAME, { delay: 100 });
  await iframeLocator.getByLabel("Password").fill(process.env.PASSWORD);
  // await iframeLocator.getByRole("button", { name: "Sign in" }).click();

  await iframeLocator.locator("#challengeIntroductionHeader").waitFor();

  await page
    .locator("#DDA_ACCOUNTS-topLeft > div > div > div")
    .waitFor({ timeout: 120000 });

  // //*[@id="DDA_ACCOUNTS-topLeft"]/div/div/div
  // /html/body/div[3]/div/div[1]/div[2]/main/div[3]/div/div[2]/div/div/div/div[2]/div[1]/div/div[1]/div[1]/div/div/div/div[1]/div[1]/div[1]/div/div/div
  // document.querySelector("#DDA_ACCOUNTS-topLeft > div > div > div")
  // #DDA_ACCOUNTS-topLeft > div > div > div
  await page.context().storageState({ path: ".auth/storageState.json" });

  // const visible = await iframeLocator
  //   .getByRole("heading", { name: "Confirm Your Identity" })
  //   .isVisible();
  // console.log(visible);
  // if (visible) {
  //   console.log("need two factor auth");
  //   await browser.close();
  // }

  //  // Click the login button
  //  //await page.click('button[id="signin-button"]');
  //
  //  // Wait for navigation to finish
  //  //await page.waitForURL("**/app/capricorn?para=index");
  //
  //  // Optional: Verify login by checking if a specific element exists
  //  //const loggedIn = await page.isVisible("#accountDetailSection");
  //
  //  //if (loggedIn) {
  //  //  console.log("Login successful!");
  //  //} else {
  //  //  console.log("Login failed!");
  //  //}
  //
  //  // Close the browser
  //  //await browser.close();
})();
