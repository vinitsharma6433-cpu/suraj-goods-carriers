# The Suraj Goods Carriers — TMS

Offline-first transport management app: GR booking, dashboard, WhatsApp sharing, Google login and automatic cloud backup. Everything used here is free (GitHub Pages + Firebase Spark plan).

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole app |
| `firebase-config.js` | Your Firebase keys + allowed Google emails (edit this one only) |
| `manifest.json`, `icon.svg` | Lets you install it like an app on laptop/mobile |
| `sw.js` | Offline support |
| `firestore.rules` | Security rules — only allowed emails can read/write |

---

## Offices (one software, separate work)

- Each office has its **own GRs, own dashboard and own GR number series**: `SGC-MRT-2026-000001`, `SGC-DEL-2026-000001`.
- Staff log in with Google and the app opens **only their office** — they cannot see the other office.
- **Admins** (owner) see an *All Offices* summary and can switch offices from the top bar.
- The **party list is shared**, so a party saved in one office auto-fills in the other.
- To add an office or a staff member: edit `branches` in `firebase-config.js` **and** the same emails in `firestore.rules` (then Publish rules in Firebase).

## Step 1 — Put it live on GitHub (free)

1. Go to <https://github.com/new>, repository name: `suraj-goods-carriers`, **Public**, click **Create repository**.
2. Click **uploading an existing file**, drag all files from this folder, click **Commit changes**.
3. Open **Settings → Pages**. Source: **Deploy from a branch**, Branch: **main**, folder **/ (root)**, **Save**.
4. After 1–2 minutes your app is live at:
   `https://<your-github-username>.github.io/suraj-goods-carriers/`

The app already works now (offline, data saved in that browser). Steps 2–4 turn on Google login and cloud backup.

## Step 2 — Create Firebase project (free)

1. Go to <https://console.firebase.google.com> → **Add project** → name `suraj-goods-carriers` → Google Analytics off → **Create**.
2. On the project home click the **Web `</>`** icon → app nickname `SGC TMS` → **Register app**.
3. Copy the values shown (`apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`) into `firebase-config.js`.
4. Fill `admins` (owner) and `branches` (each office with its staff emails).

## Step 3 — Turn on Google login

1. Firebase → **Build → Authentication → Get started → Sign-in method → Google → Enable** → choose your support email → **Save**.
2. **Authentication → Settings → Authorized domains → Add domain** → `<your-github-username>.github.io`.

## Step 4 — Turn on the cloud database + security

1. Firebase → **Build → Firestore Database → Create database** → location **asia-south1 (Mumbai)** → **Start in production mode**.
2. Open the **Rules** tab, replace everything with the contents of `firestore.rules` (same admin and office emails as in `firebase-config.js`), click **Publish**.
3. On GitHub, open `firebase-config.js` → pencil icon → paste your config → **Commit changes**.

Open the live link → **Login with Google**. Every GR now backs up to the cloud automatically. Log in with the same Google account on any laptop or phone to see the same data.

---

## Using the app

- **F2** — New GR, **Ctrl+S** — Save GR, **F3** — GR Register, **F4** — Customers, **F6** — Accounts, **Esc** — Dashboard, **Ctrl+F** — search box focus (Register/Customers).
- **Customers** — party master: save a customer once, it stays in a growing list (name, GSTIN, mobile, city, address) with GR count + total amount, searchable. Same list is shared across offices.
- **Goods / Items master** (bottom of Customers screen) — add item names once; they build a running chip-list and power the "Contents" autosuggest on the GR form.
- **Accounts** — customer-wise or city-wise hisaab (totals, pending count) for the current office, toggle from the dropdown.
- **Delivery / POD** — list of pending consignments; type receiver's name + date and click "Delivered mark karein" to close it out.
- **Autosuggest** — State/City names suggest while typing in From/To/Delivery At; GSTIN suggests from previously used GST numbers; party names suggest from Customers.
- **↺ Repeat last party** (on the New GR screen) — fills Consignor/Consignee/From/To from your last saved GR in this office.
- **Print Billty** — after saving, or from any row on the dashboard. Prints Party Copy + Driver Copy on one A4 page with your GSTIN, branch office boxes and GST calculation. This only works on the real live link opened in a browser (not inside a chat preview) — Chrome's print dialog then lets you print or "Save as PDF".
- After saving, use **WhatsApp Consignor / Consignee** to send GR details (needs a 10-digit mobile number). The same buttons are on every row of the dashboard.
- **Company letterhead** (GSTIN, branch office boxes, phone, email) and **Booking Code / address per office** are in `firebase-config.js` — edit and re-commit to update the Billty.
- **Backup & Login** screen:
  - Cloud backup status and **Sync now**.
  - **Download backup** — full data as a `.json` file (keep a copy in Google Drive / pen drive weekly).
  - **Restore file** — merges a backup file back in.
- Works without internet; changes sync when you are back online and logged in.
- **Install as app:** in Chrome open the live link → address bar install icon (laptop) or menu → *Add to Home screen* (mobile).

## Notes

- Firebase config keys are not secret; the security comes from `firestore.rules` + the email lists.
- Firebase free plan: 50,000 reads and 20,000 writes per day — far more than a booking counter needs.
- **Icon when the link is shared:** `icon.svg`/`icon.png`/`favicon-32.png`/`apple-touch-icon.png` set the browser-tab icon and the app icon. For WhatsApp/Telegram to show a preview card with this icon when the link itself is shared, open `firebase-config.js`'s neighbour `index.html` after going live and change `og:image` from `icon.png` to the full link, e.g. `https://<user>.github.io/suraj-goods-carriers/icon.png` (done — set to the live link).
