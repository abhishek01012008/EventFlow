# EventFlow — College Event Management & Participation System

**EventFlow** is a desktop application built with **Electron**, **React**, and **Vite** for college event browsing, student registrations, participation tracking, and certificate viewing.

---

## 🚀 What Is In This Project

- **Electron Desktop Shell**: Native desktop application running React with secure IPC boundaries (`contextIsolation: true`, `nodeIntegration: false`).
- **Student Dashboard**: Immediate access to registered events, participation count, upcoming college events, and recent activity stream.
- **Browse & Search Events**: Real-time search by title, category, and venue, with category filters (Technical, Cultural, Sports, Workshop) and status filters.
- **Event Registration & Cancellation**: One-click registration for upcoming events with capacity tracking, and cancellation with confirmation dialogs.
- **Client Persistence**: Registrations, cancellations, and student profile changes are saved in `localStorage` across app restarts.
- **Official Certificate Image Viewer**: View and download official participation credentials as high-resolution images (`.jpg`) with certificate ID and student details.
- **Participation History**: Historical transcript of completed events and participation records.
- **Student Profile Management**: View and edit student details (Name, Roll Number, Department, Year, Email, Phone).

---

## 🎨 UI & Design

- **Theme Palette**: Deep Navy (`#0B1F3A`), Royal Blue (`#2563EB`), Neutral Gray (`#F5F7FB`), and White (`#FFFFFF`).
- **Typography**: Clean modern sans-serif typography with system fallback.
- **Status Indicators**:
  - Registered / Active / Completed: Green
  - Upcoming / Ongoing: Amber
  - Cancelled / Past: Red
- **Components**: Modal overlays, confirmation dialogs, toast notifications, stat KPI cards, and event cards.

---

## 📑 Application Pages

1. **Student Dashboard** (`/student/dashboard`): Metric cards (Registrations, Completed, Upcoming, Certificates), upcoming events grid, and quick action buttons.
2. **Browse Events** (`/events`): Search bar, category filter chips, time status tabs, and event cards with registration buttons.
3. **Event Details** (`/events/:id`): Event banner, description, venue, date & time, registration deadline, eligibility, highlights, and registration / cancellation actions.
4. **My Registrations** (`/student/registrations`): List of registered events with tab filters (Upcoming, Past, Cancelled) and cancellation button.
5. **Participation History** (`/student/history`): Table of completed events with attendance status and "Show Certificate" button.
6. **My Certificates** (`/student/certificates`): Card grid of earned certificates with "Show Certificate" and "Download Certificate" buttons opening the certificate image modal.
7. **Student Profile** (`/student/profile`): Form to view and update student profile information with localStorage persistence.

---

## 📂 Project Structure

```
EventFlow/
├── electron/
│   ├── main.cjs             # Electron main process (BrowserWindow, lifecycle, secure config)
│   └── preload.cjs          # Context bridge exposing safe IPC APIs
├── public/
│   ├── certificate-sample.jpg # Official certificate image displayed in certificate viewer
│   ├── favicon.svg          # App icon
│   └── icons.svg            # SVG icon assets
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   │   ├── CertificatePreview.jsx  # Certificate image preview modal & download
│   │   │   ├── ConfirmDialog.jsx       # Confirmation dialog modal
│   │   │   ├── EmptyState.jsx          # Empty state placeholder
│   │   │   ├── EventCard.jsx           # Event card component
│   │   │   ├── Modal.jsx               # Base modal component
│   │   │   ├── PageHeader.jsx          # Header with title and breadcrumb/subtitle
│   │   │   ├── StatCard.jsx            # Metric summary card
│   │   │   ├── StatusBadge.jsx         # Status badge component
│   │   │   └── Toast.jsx               # Floating toast notifications
│   │   └── layout/
│   │       ├── AppLayout.jsx           # Main layout with Sidebar and Topbar
│   │       ├── Sidebar.jsx             # Left navigation menu
│   │       └── Topbar.jsx              # Header with search and profile summary
│   ├── context/
│   │   └── AppContext.jsx   # React Context for events, registrations, certificates, user profile
│   ├── data/
│   │   └── mockData.js      # Initial seed data for events, registrations, and certificates
│   ├── pages/
│   │   ├── BrowseEvents.jsx
│   │   ├── EventDetails.jsx
│   │   ├── MyCertificates.jsx
│   │   ├── MyRegistrations.jsx
│   │   ├── ParticipationHistory.jsx
│   │   ├── StudentDashboard.jsx
│   │   └── StudentProfile.jsx
│   ├── App.jsx              # HashRouter and student routes
│   ├── index.css            # CSS variables, utilities, and component styling
│   └── main.jsx             # Application entry point
├── package.json             # Scripts & dependencies
├── vite.config.js           # Vite build configuration
└── README.md
```

---

## 🛠️ How to Run

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the App

#### Run Electron Desktop App (Development Mode)
```bash
npm run electron:dev
```
*(Starts Vite dev server on port 5173 and launches Electron)*

#### Or Run Web Frontend Only
```bash
npm run dev
```
*(Available in your browser at `http://localhost:5173`)*

---

## 📦 Build Commands

- **Build Frontend Assets**:
  ```bash
  npm run build
  ```
- **Preview Desktop Build**:
  ```bash
  npm run electron:preview
  ```
- **Package Standalone Directory**:
  ```bash
  npm run electron:pack
  ```
- **Generate Lightweight macOS DMG (< 5 MB)**:
  ```bash
  npm run build:dmg
  ```
- **Generate Standard Electron Installers**:
  ```bash
  npm run electron:dist
  ```
