# Franchise Leads — Separate Google Sheet Setup

Franchise enquiries currently land in the **admissions** sheet, mixed in with parent
leads. This sets up a separate sheet and backend so the two never touch.

Takes about 10 minutes. Everything here is free.

> This file is excluded from the deployed site by `.vercelignore`, so it is not
> readable on londoneducation.pk. Do not move it outside `docs/`.

---

## Why separate

The admissions sheet is what the admissions team works from daily, and it feeds
CPL reporting. A franchise investor sitting in that list is not a parent lead:
it distorts the count, it is chased by the wrong person, and it needs completely
different follow-up. The forms already tag themselves (`enquiry_type=franchise`
and `enquiry_type=franchise_application`), so all that is missing is a
destination of their own.

---

## Step 1 — Create the sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a blank sheet.
2. Rename it **`London International School — Franchise Leads`**.
3. Rename the first tab (bottom left) to **`Leads`**.

Leave row 1 empty. The script writes the headers itself on the first submission,
so you cannot get the column order wrong.

---

## Step 2 — Add the script

In that sheet: **Extensions → Apps Script**. Delete the placeholder
`myFunction`, paste all of the following, and save.

```javascript
/** London International School — FRANCHISE lead webhook
 *
 *  Receives POSTs from /franchise (short enquiry form and full
 *  application) and appends them to this sheet. Deliberately separate
 *  from the admissions webhook: a franchise investor is a different
 *  funnel, chased by a different person, and must never inflate the
 *  admissions lead count.
 *
 *  Handles both form types by writing a union of their fields, so a
 *  short enquiry simply leaves the application-only columns blank.
 */

const NOTIFY_EMAIL = 'info@londoneducation.pk';
const CC_EMAIL     = '';          // optional second recipient
const TAB_NAME     = 'Leads';

/* Column order. Add to the END of this list if the form gains a field —
   never insert in the middle, or existing rows will misalign. */
const COLUMNS = [
  'submitted_at', 'enquiry_type', 'channel',
  'applicant_name', 'phone', 'email', 'qualification',
  'current_status', 'education_experience',
  'interest', 'campus_type', 'existing_school', 'existing_students',
  'city', 'area',
  'property_status', 'property_type', 'plot_area', 'covered_area', 'utilities',
  'planned_investment', 'financing', 'availability', 'notes',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'fbclid', 'referrer', 'landing_page', 'user_agent'
];

function doPost(e) {
  try {
    // Honeypot: bots fill this, humans never do. Accept silently, store nothing.
    if (e.parameter.botcheck) {
      return jsonResponse({ success: true, skipped: 'bot' });
    }

    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(TAB_NAME) || ss.insertSheet(TAB_NAME);

    // Write headers once, on the first submission.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS);
      sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const row = COLUMNS.map(function (key) {
      // "utilities" is a checkbox group: several inputs share the name, so
      // e.parameter gives only the first. e.parameters holds the full array.
      if (key === 'utilities') {
        const all = (e.parameters && e.parameters.utilities) || [];
        return all.join(', ');
      }
      if (key === 'submitted_at') {
        return e.parameter.submitted_at || new Date().toISOString();
      }
      return e.parameter[key] || '';
    });
    sheet.appendRow(row);

    notify(e);
    return jsonResponse({ success: true });

  } catch (err) {
    // Never fail loudly: the visitor has already been sent to WhatsApp or
    // the thank-you page, so a thrown error helps nobody.
    console.error(err);
    return jsonResponse({ success: false, error: String(err) });
  }
}

function notify(e) {
  const isFullApplication = e.parameter.enquiry_type === 'franchise_application';
  const label   = isFullApplication ? 'FRANCHISE APPLICATION' : 'Franchise enquiry';
  const name    = e.parameter.applicant_name || 'Unknown';
  const city    = e.parameter.city || 'not given';
  const phone   = String(e.parameter.phone || '');
  const waPhone = phone.replace(/\D/g, '').replace(/^0/, '92');

  const lines = [
    label + ' from the website',
    '',
    'Name:        ' + name,
    'Phone:       ' + phone,
    'Email:       ' + (e.parameter.email || 'not given'),
    'City:        ' + city,
    'Area:        ' + (e.parameter.area || 'not given'),
    'Interest:    ' + (e.parameter.interest || 'not given'),
    'Campus type: ' + (e.parameter.campus_type || 'not given'),
    'Property:    ' + (e.parameter.property_status || 'not given')
  ];

  if (isFullApplication) {
    lines.push(
      '',
      '--- Full application ---',
      'Currently:      ' + (e.parameter.current_status || '-'),
      'Education exp:  ' + (e.parameter.education_experience || '-'),
      'Existing school:' + (e.parameter.existing_school || '-'),
      'Students now:   ' + (e.parameter.existing_students || '-'),
      'Plot area:      ' + (e.parameter.plot_area || '-'),
      'Covered area:   ' + (e.parameter.covered_area || '-'),
      'Utilities:      ' + (((e.parameters && e.parameters.utilities) || []).join(', ') || '-'),
      'Investment:     ' + (e.parameter.planned_investment || '-'),
      'Financing:      ' + (e.parameter.financing || '-'),
      'Best time:      ' + (e.parameter.availability || '-'),
      'Notes:          ' + (e.parameter.notes || '-')
    );
  }

  lines.push(
    '',
    'Source: ' + (e.parameter.utm_source || '(direct)') +
      ' / ' + (e.parameter.utm_campaign || 'n/a'),
    'Page:   ' + (e.parameter.landing_page || '-'),
    '',
    waPhone ? 'WhatsApp them: https://wa.me/' + waPhone : '',
    'All franchise leads: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl()
  );

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    cc: CC_EMAIL,
    subject: '[FRANCHISE] ' + label + ' — ' + name + ' (' + city + ')',
    body: lines.join('\n')
  });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## Step 3 — Deploy it

1. Top right: **Deploy → New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Set:
   - **Description:** `Franchise leads`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`  ← must be "Anyone", not "Anyone with Google account"
4. **Deploy**, then **Authorize access** and approve the permissions prompt.
   Google will warn that the app is unverified: choose **Advanced → Go to
   (project name)** and continue. This is normal for your own scripts.
5. Copy the **Web app URL**. It ends in `/exec`.

---

## Step 4 — Point the site at it

Open `js/franchise-form.js` and replace the one constant near the top:

```javascript
var FRANCHISE_ENDPOINT = 'PASTE_YOUR_NEW_EXEC_URL_HERE';
```

Both the short enquiry form and the full application read that single constant,
so nothing else needs changing.

Then bump the cache-busting timestamp, as with any `js/` change:

```bash
NEW_TS=$(date +%s)
sed -i '' -E "s#(\.(css|js))\?v=[0-9]+#\1?v=${NEW_TS}#g" *.html blog/*.html
```

---

## Step 5 — Test it

1. Open `/franchise`, fill the short enquiry form, submit.
2. Check the new sheet: a row should appear with `enquiry_type = franchise`.
3. Fill the full application and press **Send Application on WhatsApp**.
   A second row should appear with `enquiry_type = franchise_application`
   and `channel = whatsapp`.
4. Confirm **nothing** new appeared in the admissions sheet.
5. Confirm the notification email arrived with a `[FRANCHISE]` subject prefix.

The application form posts via `navigator.sendBeacon` because the browser
navigates to WhatsApp immediately afterwards. Beacons are fire-and-forget, so if
a row is missing, check the Apps Script **Executions** log rather than the
browser console.

---

## Redeploying after a code change

Editing the script is not enough on its own. Go to **Deploy → Manage
deployments**, click the pencil icon, set **Version** to **New version**, and
click **Deploy**. The `/exec` URL stays the same.

---

## If you would rather use one sheet with two tabs

Keep the admissions endpoint in `FRANCHISE_ENDPOINT` and instead add this to the
top of the **admissions** `doPost`, before it touches the admissions tab:

```javascript
const type = e.parameter.enquiry_type || '';
if (type.indexOf('franchise') === 0) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const t  = ss.getSheetByName('Franchise') || ss.insertSheet('Franchise');
  t.appendRow([
    new Date().toISOString(), type,
    e.parameter.applicant_name || '', e.parameter.phone || '',
    e.parameter.email || '', e.parameter.city || '',
    e.parameter.interest || '', e.parameter.campus_type || ''
  ]);
  return jsonResponse({ success: true, routed: 'franchise' });
}
```

This is quicker but weaker: one spreadsheet, one permission set, and anyone with
access to franchise data can also see every parent lead. Prefer the separate
sheet above unless the same person handles both.
