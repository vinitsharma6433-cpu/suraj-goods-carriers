// Edit this file only. After changing it, also update firestore.rules (same emails).
window.SGC_CONFIG = {
  companyId: "suraj-goods-carriers",

  // Admins see ALL offices and can switch between them (owner + you).
  admins: [
    "aasumalik890@gmail.com",
    "vinitsharma6433@gmail.com"
  ],

  // Each office has its own GRs and its own GR number series (SGC-BC10-2026-000001).
  // Staff of an office see only that office. Party list is shared by all offices.
  // id: short code, capital letters/numbers only. Never change an id after data is saved.
  // bookingCode / address print on the Billty. name shows in the app.
  branches: [
    { id: "BC10", name: "S.K. Road, Meerut",  bookingCode: "10", address: "S.K. Road, Meerut", users: ["aasumalik890@gmail.com"] },
    { id: "BC38", name: "TP Nagar, Meerut",   bookingCode: "38", address: "TP Nagar, Meerut",  users: ["aasumalik890@gmail.com"] }
  ],

  // Printed on every Billty (GR receipt) — the company letterhead.
  // branchOffices: the reference boxes on the Billty (address + mobile), separate from the
  // login offices above. Edit freely; this does not affect login or data.
  company: {
    gstin: "09AMDPD3360P1ZU",
    tagline: "A Unique Transport System",
    hoAddress: "H.O.: 234, Transport Nagar, Meerut - 250002",
    phone: "0121-4332736",
    email: "transportsgc@gmail.com",
    branchOffices: [
      { title: "BRANCH OFFICE", lines: ["S.K. Road,", "Meerut-2"], mobile: "09319233334" },
      { title: "BRANCH OFFICE", lines: ["3376, Singhara", "Sadar Bazar", "Delhi-110006"], mobile: "8595683195" },
      { title: "BRANCH OFFICE", lines: ["644, Pul Mithai", "Lajpat Nagar", "Delhi, Market More"], mobile: "9312592724" }
    ]
  },

  // Paste your Firebase web config here (README step 2). Empty apiKey = offline only.
  firebase: {
    apiKey: "AIzaSyA-w7giyyfPGlTVB04MMK0WAGDyMrGh_rA",
    authDomain: "suraj-goods-carriers.firebaseapp.com",
    projectId: "suraj-goods-carriers",
    storageBucket: "suraj-goods-carriers.firebasestorage.app",
    messagingSenderId: "240497710886",
    appId: "1:240497710886:web:e9c6fdb2ad65cec938d3e7"
  }
};
