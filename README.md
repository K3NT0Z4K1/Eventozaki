# eventozaki 🎓

> A school event registration system with custom forms, QR codes, evaluation flows, and e-certificate generation.

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![HTML](https://img.shields.io/badge/built%20with-HTML%20%2F%20CSS%20%2F%20JS-orange)
![Firebase](https://img.shields.io/badge/backend-Firebase-orange?logo=firebase)

---

## What is this?

**eventozaki** is a lightweight school event registration system built with vanilla HTML, CSS, and JavaScript — powered by Firebase. It lets school admins create custom registration forms for events, share them via link or QR code, collect responses, and automatically release e-certificates to participants after they complete an event evaluation.

---

## Features

- 🛠 **Custom Form Builder** — drag and add fields (text, dropdown, multiple choice, etc.)
- 🔗 **Shareable Registration Link** — unique link per event
- 📷 **QR Code Generation** — auto-generated from the registration link, downloadable
- 📋 **Response Dashboard** — view all registrations per event in real time
- ⬇️ **CSV Export** — export responses for use in Google Sheets or Excel
- 📝 **Evaluation Gate** — participants must complete an evaluation before receiving their cert
- 🎓 **E-Certificate** — auto-generated and unlocked after evaluation, printable as PDF
- 🔒 **Admin Auth** — login-protected admin panel via Firebase Authentication
- 🔥 **Firebase Backend** — Firestore for real-time data, Firebase Auth for admin access

---

## Pages

| Page | Route | Who uses it |
|---|---|---|
| Admin Login | `index.html` | Admin |
| Dashboard | `dashboard.html` | Admin |
| Create Event | `create-event.html` | Admin |
| Manage Event | `event-manage.html?id=<eventId>` | Admin |
| Registration Form | `register.html?id=<eventId>` | Participant |
| Evaluation Form | `evaluate.html?event=<id>&reg=<id>` | Participant |
| E-Certificate | `cert.html?event=<id>&reg=<id>` | Participant |

---

## Tech Stack

- **Frontend** — HTML, CSS, JavaScript (no framework)
- **Backend** — Firebase (Firestore + Authentication)
- **QR Codes** — [qrcode.js](https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js) via CDN
- **Fonts** — Syne + DM Sans (Google Fonts)
- **Hosting** — Firebase Hosting *(planned)*

---

## Firebase Structure

```
events/
  {eventId}/
    title, desc, date, time, venue
    isOpen: true | false
    fields: [ { label, type, required, options } ]
    createdAt

registrations/
  {eventId}/
    responses/
      {registrationId}/
        name, email, ...customFields
        submittedAt
        evaluationDone: false
        certReleased: false
        certReleasedAt

evaluations/
  {eventId}/
    responses/
      {docId}/
        regId
        rating, likes, takeaway, recommend, suggestions
        submittedAt
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/eventozaki.git
cd eventozaki
```

### 2. Set up Firebase

- Create a project at [firebase.google.com](https://firebase.google.com)
- Enable **Firestore** (test mode to start)
- Enable **Authentication** → Email/Password
- Register a web app and copy your config into `firebase-config.js`

### 3. Create an admin account

Go to **Firebase Console → Authentication → Users → Add User** and manually add your email and password. This is your admin login.

### 4. Run locally

Just open `index.html` in your browser — no build step needed.

> ⚠️ Some features (like Firebase module imports) require a local server. Use VS Code Live Server or run `npx serve .` in the project folder.

### 5. Deploy (optional)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## Planned Updates

- [ ] Firebase Hosting deployment
- [ ] Google Sheets auto-sync via Cloud Functions
- [ ] Improved e-certificate design (custom templates per event)
- [ ] Admin ability to customize the evaluation form
- [ ] Email confirmation with cert link (via EmailJS or Cloud Functions)
- [ ] Max capacity / registration deadline per event
- [ ] Token-based cert access for security
- [ ] Multi-admin support with roles

---

## Project Structure

```
eventozaki/
├── index.html          # Admin login
├── dashboard.html      # Admin dashboard
├── create-event.html   # Form builder
├── event-manage.html   # Per-event manager (QR, responses, export)
├── register.html       # Participant registration form
├── evaluate.html       # Participant evaluation form
├── cert.html           # E-certificate display
└── firebase-config.js  # Firebase connection (shared)
```

---

## Author

**kentozaki** — built for school use 🎓

---

> This project is actively being developed. Expect breaking changes and major updates.