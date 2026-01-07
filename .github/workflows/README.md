# BeBodywise Daily Reward Automation

Automatically claim your daily reward on BeBodywise every day using Playwright and GitHub Actions!

## Overview

This repository contains an automated workflow that:
- Runs daily at **03:00 UTC** (customizable)
- Logs into your BeBodywise account using saved session state
- Navigates to the rewards section
- Clicks the daily reward button
- All without you having to do anything!

## Repository Contents

- `claim-reward.js` - Main Playwright script that automates the reward claim
- `package.json` - Node.js dependencies (Playwright)
- `.github/workflows/claim-reward.yml` - GitHub Actions workflow configuration
- `auth.json` - Saved login session (you'll create this locally)

## Setup Instructions

### Step 1: Create auth.json (One-time setup)

You need to capture your logged-in session once locally:

```bash
# Clone this repo to your computer
git clone https://github.com/trishika777/bebodywise-daily-reward.git
cd bebodywise-daily-reward

# Install Playwright
npm install
npx playwright install

# Record your login session
npx playwright codegen https://bebodywise.com --save-storage=auth.json
```

In the browser that opens:
1. Log in with your BeBodywise credentials
2. Close the browser window
3. Check that `auth.json` was created in your project folder

### Step 2: Commit auth.json to GitHub

```bash
git add auth.json
git commit -m "Add saved authentication session"
git push
```

### Step 3: Update the selector (if needed)

Open `claim-reward.js` and look at the `rewardButtonSelectors` array. These are the CSS selectors that the script tries to find the reward button. If the script can't find your reward button, you may need to inspect the page and update these selectors:

1. On BeBodywise, open DevTools (F12)
2. Right-click the "Daily Reward" button → **Inspect**
3. Copy the selector or text content
4. Update the selectors in `claim-reward.js`

### Step 4: Enable GitHub Actions

By default, GitHub Actions should be enabled. To verify:
1. Go to your repo → **Actions** tab
2. You should see "Daily BeBodywise Reward" workflow
3. Click it to view runs

## Testing the Workflow

### Run manually

1. Go to **Actions** tab in your repo
2. Select **Daily BeBodywise Reward** workflow
3. Click **Run workflow** → **Run workflow**
4. Watch the execution in real-time

### Check logs

After a run completes:
1. Click the workflow run
2. Click **claim-reward** job
3. Expand **Claim daily reward** step to see console output

## Schedule Details

The workflow runs on a schedule defined in `.github/workflows/claim-reward.yml`:

```yaml
on:
  schedule:
    - cron: '0 3 * * *'   # Daily at 03:00 UTC
```

To change the time, edit the cron expression. Examples:
- `0 10 * * *` = 10:00 UTC daily
- `0 0 * * *` = 00:00 UTC daily
- `0 */6 * * *` = Every 6 hours

## Important Notes

⚠️ **Session expiration**: BeBodywise may expire your session after some days. If the automation stops working, you'll need to regenerate `auth.json` by running the codegen command locally again.

⚠️ **Terms of Service**: Make sure automated reward claiming complies with BeBodywise's terms of service. Some sites prohibit automation.

⚠️ **IP changes**: GitHub Actions runs from different IPs. If BeBodywise ties sessions to specific IPs, this automation may not work.

## Troubleshooting

### "auth.json not found" error

You need to generate `auth.json` locally first:
```bash
npx playwright codegen https://bebodywise.com --save-storage=auth.json
```

### "Could not find reward button"

The button selector doesn't match. Update `claim-reward.js` with the correct selector after inspecting the page.

### Workflow not running

Check that:
1. GitHub Actions is enabled (Actions tab is visible)
2. The `.github/workflows/claim-reward.yml` file exists
3. Your repo is public (private repos may have Actions limitations on free accounts)

## Support

If you run into issues:
1. Check the workflow run logs (Actions tab)
2. Test locally: `node claim-reward.js`
3. Regenerate `auth.json` if it's been a while

## License

Free to use and modify for personal use.

---

**Happy automating! 🎉**
