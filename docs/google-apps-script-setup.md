# Google Apps Script Setup — Lead Form Backend

This sets up a **free, unlimited** backend for the admissions lead form. Submissions land in a Google Sheet automatically and the admissions team gets an email notification for each lead.

## Why this vs Web3Forms?

- **Web3Forms** (the default in `enroll.html`) — free, 250 submissions/month, then $5/mo for unlimited.
- **Google Apps Script** (this doc) — free, truly unlimited, direct to Google Sheet.

At your current ad volume (~50 leads/day), you'll blow past Web3Forms' 250/mo free tier in a week. Use this instead.

---

## 15-minute setup

### 1. Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) → blank sheet.
2. Rename it: `London School — Admissions Leads`.
3. Add these column headers in row 1 (exact order matters):

   ```
   submitted_at | parent_name | phone | grade | area | utm_source | utm_medium | utm_campaign | utm_content | utm_term | fbclid | referrer | landing_page | user_agent
   ```

### 2. Add the Apps Script

1. In the sheet: **Extensions → Apps Script**.
2. Delete the default `myFunction` placeholder.
3. Paste this code:

   ```javascript
   /** London School — Admissions Lead Webhook
    *  Receives POST from enroll.html form, appends row to sheet,
    *  emails admissions team, returns JSON.
    */
   const NOTIFY_EMAIL = 'info@londoneducation.pk';
   const CC_EMAIL = '';  // optional second recipient

   function doPost(e) {
     try {
       // Honeypot — bots fill this, humans never do. Silently accept, skip processing.
       if (e.parameter.botcheck) {
         return jsonResponse({ success: true, skipped: 'bot' });
       }

       const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
       const row = [
         e.parameter.submitted_at || new Date().toISOString(),
         e.parameter.parent_name || '',
         e.parameter.phone || '',
         e.parameter.grade || '',
         e.parameter.area || '',
         e.parameter.utm_source || '',
         e.parameter.utm_medium || '',
         e.parameter.utm_campaign || '',
         e.parameter.utm_content || '',
         e.parameter.utm_term || '',
         e.parameter.fbclid || '',
         e.parameter.referrer || '',
         e.parameter.landing_page || '',
         e.parameter.user_agent || ''
       ];
       sheet.appendRow(row);

       // Email notification
       const subject = `New Lead: ${e.parameter.parent_name} (${e.parameter.grade})`;
       const body =
         `A new admissions lead came in:\n\n` +
         `Parent: ${e.parameter.parent_name}\n` +
         `Phone:  ${e.parameter.phone}\n` +
         `Grade:  ${e.parameter.grade}\n` +
         `Area:   ${e.parameter.area}\n\n` +
         `Source: ${e.parameter.utm_source || '(direct)'} / ${e.parameter.utm_campaign || 'n/a'}\n` +
         `Submitted: ${e.parameter.submitted_at}\n\n` +
         `WhatsApp them: https://wa.me/92${String(e.parameter.phone).replace(/\D/g,'').replace(/^0/,'')}\n\n` +
         `See all leads: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`;

       MailApp.sendEmail({
         to: NOTIFY_EMAIL,
         cc: CC_EMAIL,
         subject: subject,
         body: body
       });

       return jsonResponse({ success: true });
     } catch (err) {
       return jsonResponse({ success: false, error: err.toString() });
     }
   }

   function doGet() {
     return jsonResponse({ status: 'London School lead webhook is live' });
   }

   function jsonResponse(obj) {
     return ContentService
       .createTextOutput(JSON.stringify(obj))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

4. Edit line 6 (`NOTIFY_EMAIL`) if you want a different recipient than `info@londoneducation.pk`.
5. Click **Save** (💾 icon) — name the project `London School Lead Webhook`.

### 3. Deploy as a Web App

1. Top-right: **Deploy → New deployment**.
2. Click the gear icon ⚙️ next to "Select type" → choose **Web app**.
3. Fill in:
   - **Description:** `Lead webhook v1`
   - **Execute as:** `Me (your@gmail.com)`
   - **Who has access:** ⚠️ **Anyone** (required so the form can POST without login)
4. Click **Deploy**.
5. Google will prompt for permissions — authorize with the school's Google account.
6. Copy the **Web app URL** that's displayed. It looks like:

   ```
   https://script.google.com/macros/s/AKfycby...long-id.../exec
   ```

### 4. Plug the URL into enroll.html

Open `enroll.html` and find this line (near the top of the `<form>`):

```html
<form id="leadForm" class="lead-form" novalidate
      data-endpoint="https://api.web3forms.com/submit"
      data-redirect="thank-you.html">
```

**Replace** the `data-endpoint` URL with your Apps Script Web App URL:

```html
<form id="leadForm" class="lead-form" novalidate
      data-endpoint="https://script.google.com/macros/s/AKfycby.../exec"
      data-redirect="thank-you.html">
```

You can also **remove** the `access_key` hidden input — it's only needed for Web3Forms:

```html
<!-- DELETE THIS LINE when using Apps Script: -->
<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
```

That's it. Submissions will now land in your Google Sheet and email `info@londoneducation.pk`.

---

## Testing the webhook

1. Visit the Apps Script Web App URL directly in a browser — you should see:
   ```json
   {"status":"London School lead webhook is live"}
   ```
2. Open `enroll.html` locally (`python3 server.py`), fill the form, submit.
3. Check the Google Sheet — a new row should appear within 2 seconds.
4. Check `info@londoneducation.pk` inbox — an email notification should arrive.

## Updating the script

If you edit the code, you must **redeploy**:
- **Deploy → Manage deployments → pencil icon → New version → Deploy**
- The Web App URL stays the same — no need to update the site.

## Quotas (Google's free limits)

- Email sending: **100/day** with a consumer Gmail account, **1,500/day** with Google Workspace.
- Script runtime: 6 min per execution (we're at ~0.5 seconds — no issue).
- Concurrent execs: 30 (no issue at lead-form scale).

If you ever exceed 100 emails/day (very unlikely), switch `NOTIFY_EMAIL` to a team alias or use a Workspace account.

## Security notes

- The Web App URL is essentially public. That's fine — it only accepts writes to the sheet and can't read anything out.
- Spam protection: the honeypot (`botcheck` field) catches most bots. If spam slips through, you can add Cloudflare Turnstile in front of the form.
- To rotate the URL (e.g. if it gets spammed), create a new deployment (v2) and update `data-endpoint` on the form. The old URL can be revoked via **Manage deployments**.
