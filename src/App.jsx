import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppLayout from './components/layout/AppLayout';

import StudentDashboard from './pages/StudentDashboard';
import BrowseEvents from './pages/BrowseEvents';
import EventDetails from './pages/EventDetails';
import MyActivities from './pages/MyActivities';
import StudentProfile from './pages/StudentProfile';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/student/dashboard" replace />} />

            <Route path="student/dashboard" element={<StudentDashboard />} />
            <Route path="events" element={<BrowseEvents />} />
            <Route path="events/:id" element={<EventDetails />} />
            <Route path="student/activities" element={<MyActivities />} />
            <Route path="student/profile" element={<StudentProfile />} />

            {/* Backward-compatible redirects for existing bookmarks/links */}
            <Route path="student/registrations" element={<Navigate to="/student/activities?tab=upcoming" replace />} />
            <Route path="student/certificates" element={<Navigate to="/student/activities?tab=certificates" replace />} />
            <Route path="student/history" element={<Navigate to="/student/activities?tab=history" replace />} />

            <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}
