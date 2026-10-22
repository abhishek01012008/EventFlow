# EventFlow — College Event Management & Participation System

**EventFlow** is a modern desktop application built with **Electron**, **React**, and **Vite** for college event management, student registrations, participation tracking, and verified certificate generation.

---

## 🚀 Key Features

- **Desktop Shell**: Native Electron application configured with a 1440 × 900 window, secure IPC boundaries (`contextIsolation: true`, `nodeIntegration: false`), and desktop packaging scripts.
- **Direct Access**: Opens directly to the student dashboard with zero sign-in friction.
- **Client Persistence**: State mutations (registrations, cancellations, profile updates) are persisted in `localStorage` and persist across refreshes and restarts.
- **Usable PDF Downloads**: Download official participation certificates as styled A4 landscape vector PDFs via `jsPDF`.
- **Search & Filters**: Real-time event search, category filters, and status filtering.

---

## 🎨 Design System

- **Primary Color**: Royal Blue (`#2563EB`)
- **Sidebar**: Dark Navy (`#0B1F3A`)
- **Main Background**: Light Gray (`#F5F7FB`)
- **Card Background**: Clean White (`#FFFFFF`) with subtle border shadows
- **Typography**: Plus Jakarta Sans & Inter
- **Status Indicators**:
  - Success / Active / Registered / Completed: Emerald Green (`#10B981`)
  - Warning / Upcoming / Ongoing: Amber (`#F59E0B`)
  - Danger / Cancelled / Past: Rose Red (`#EF4444`)

---

## 📑 Student Portal Pages

1. **Student Dashboard** (`/student/dashboard`): Welcome banner, KPI cards (registered, completed events, upcoming, certificates), upcoming event cards, recent activity stream, quick action shortcuts.
2. **Browse Events** (`/events`): Search by title/venue, filter by category & time (Upcoming, Ongoing, Past), sort by date or popularity, responsive event cards, and quick registration.
3. **Event Details** (`/events/:id`): Full poster, description, venue, date/time, capacity meters, registration deadline, eligibility, highlights, register and cancellation with confirmation dialog.
4. **My Registrations** (`/student/registrations`): Tabbed view (Upcoming, Past, Cancelled), registration date, cancel registration with confirmation modal.
5. **Participation History** (`/student/history`): Historical records of completed events, verified participation status, and direct certificate launcher.
6. **My Certificates** (`/student/certificates`): Card grid of earned credentials, interactive preview modal with official institutional seal, and PDF download action.
7. **Student Profile** (`/student/profile`): View and edit name, roll number, department, year, email, and phone with validation and save feedback.

---

## 📂 Project Architecture

```
EventFlow/
├── electron/
│   ├── main.cjs             # Electron main process (BrowserWindow, secure defaults)
│   └── preload.cjs          # Context bridge exposing safe IPC APIs
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   │   ├── CertificatePreview.jsx  # Official certificate modal & PDF download
│   │   │   ├── ConfirmDialog.jsx       # Standard confirmation dialog
│   │   │   ├── EmptyState.jsx          # Illustrated empty states
│   │   │   ├── EventCard.jsx           # Interactive event cards
│   │   │   ├── Modal.jsx               # Accessible modal overlay
│   │   │   ├── PageHeader.jsx          # Uniform page header & action bar
│   │   │   ├── StatCard.jsx            # Metric KPI card
│   │   │   ├── StatusBadge.jsx         # Color-coded status badge
│   │   │   └── Toast.jsx               # Floating toast notifications
│   │   └── layout/
│   │       ├── AppLayout.jsx           # Primary app container
│   │       ├── Sidebar.jsx             # Student navigation sidebar
│   │       └── Topbar.jsx              # Search, notifications, and student profile
│   ├── context/
│   │   └── AppContext.jsx   # Shared state, registration handlers, and localStorage sync
│   ├── data/
│   │   └── mockData.js      # Student and college events mock data
│   ├── pages/
│   │   ├── BrowseEvents.jsx
│   │   ├── EventDetails.jsx
│   │   ├── MyCertificates.jsx
│   │   ├── MyRegistrations.jsx
│   │   ├── ParticipationHistory.jsx
│   │   ├── StudentDashboard.jsx
│   │   └── StudentProfile.jsx
│   ├── utils/
│   │   └── generatePdf.js   # High-resolution jsPDF certificate generator
│   ├── App.jsx              # HashRouter and student route definitions
│   ├── index.css            # Complete design system tokens, themes, & utility classes
│   └── main.jsx             # React root mount
├── package.json             # Scripts & dependencies
├── vite.config.js           # Vite config with relative base for Electron
└── README.md
```

---

## 🛠️ Installation & Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Application

#### Option A: Run Electron Desktop App (Recommended)
This starts the Vite local server and opens the Electron desktop window automatically:
```bash
npm run electron:dev
```

#### Option B: Run in Web Browser
If you want to preview the React frontend in your web browser:
```bash
npm run dev
```
Then navigate to `http://localhost:5173`.

---

## 📦 Building and Packaging the Desktop App

### Test Production Build
Builds the Vite static assets and runs Electron against the compiled production bundle:
```bash
npm run electron:preview
```

### Package Desktop App (Unpacked Directory)
Generates the unpacked standalone desktop application:
```bash
npm run electron:pack
```

### Package Installers (macOS .dmg / Windows .exe / Linux)
```bash
npm run electron:dist
```
Installers and binaries will be written to the `release/` directory.
