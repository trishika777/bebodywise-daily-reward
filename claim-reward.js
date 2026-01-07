const { chromium } = require('playwright');

(async () => {
  console.log('Starting BeBodywise reward claim automation...');
  
  const browser = await chromium.launch({ headless: true });
  
  // Check if auth.json exists - if not, user needs to login manually once
  let context;
  try {
    context = await browser.newContext({ storageState: 'auth.json' });
    console.log('Using saved authentication state');
  } catch (error) {
    console.log('auth.json not found. Run this locally first with codegen to capture login.');
    context = await browser.newContext();
  }
  
  const page = await context.newPage();
  
  try {
    // Navigate to BeBodywise
    console.log('Navigating to BeBodywise...');
    await page.goto('https://bebodywise.com', { waitUntil: 'networkidle', timeout: 30000 });
    
    // TODO: Update these selectors based on the actual page structure
    // Common patterns to look for:
    // - Daily reward button: might be text like "Daily reward", "Claim reward", "Get reward"
    // - Location: usually in a dashboard, account page, or rewards section
    
    console.log('Looking for daily reward button...');
    
    // Attempt to find and click reward button (adjust selectors as needed)
    const rewardButtonSelectors = [
      'text=Daily reward',
      'text=Claim reward',
      'text=Get reward',
      '[class*="reward"][class*="button"]',
      'button:has-text("Reward")'
    ];
    
    let clicked = false;
    for (const selector of rewardButtonSelectors) {
      try {
        if (await page.$(selector)) {
          console.log(`Found reward button with selector: ${selector}`);
          await page.click(selector);
          clicked = true;
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }
    
    if (!clicked) {
      console.log('Could not find reward button. Please verify selectors.');
    } else {
      console.log('Successfully clicked reward button!');
      await page.waitForTimeout(3000);
    }
    
  } catch (error) {
    console.error('Error during reward claim:', error.message);
  } finally {
    await browser.close();
    console.log('Browser closed. Task completed.');
  }
})();
